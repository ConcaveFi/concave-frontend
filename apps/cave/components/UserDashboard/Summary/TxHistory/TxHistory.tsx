import { Flex, Input, Link, Table, Tbody, Td, Th, Thead, Tr } from '@concave/ui'
import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  Table as TableTp,
  useReactTable,
} from '@tanstack/react-table'
import { DataTable } from 'components/UserDashboard/DataTable'
import { useUserTxHistoryState } from 'components/UserDashboard/hooks/useUserTxHistoryState'
import React, { useState } from 'react'
import { DataTableCard } from '../../DataTableCard'
import { DashItem } from './DashItem.type'

export const TxHistory = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const { data, isLoading, isSuccess } = useUserTxHistoryState()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const reactTable = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
      <DataTableCard dataTableLabel={'Transaction History'} isExpanded hasPositions>
        <DataTable h={'100%'}>
          {!isLoading && isSuccess ? <TxTable reactTable={reactTable} /> : <></>}
        </DataTable>
      </DataTableCard>
    </Flex>
  )
}

const TxTable = ({ reactTable }) => (
  <Table style={{ height: '100%', width: '100%' }}>
    <Thead>
      {reactTable.getHeaderGroups().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <Th px={'0px'} key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <Flex direction={'column'} align={'center'} gap={1}>
                    <Flex
                      textAlign={'center'}
                      textColor={header.column.getIsSorted() ? 'text.accent' : ''}
                      cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                      onClick={header.column.getToggleSortingHandler()}
                      direction="column"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: '  🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                    {header.column.getCanFilter() && (
                      <Filter column={header.column} table={reactTable} />
                    )}
                  </Flex>
                )}
              </Th>
            )
          })}
        </Tr>
      ))}
    </Thead>
    <Tbody>
      {reactTable.getRowModel().rows.map((row) => (
        <Tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            const teste = cell.column.columnDef.cell
            // console.log(cell.getContext())

            return (
              <Td key={cell.id} px={'16px'}>
                {/* {cell.column.columnDef.cell?.includes('TokenID:') &&} */}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            )
          })}
        </Tr>
      ))}
    </Tbody>
  </Table>
)

const columnHelper = createColumnHelper<DashItem>()
const columns = [
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: () => 'Timestamp',
    cell: (info) => {
      const date = new Date(info.getValue())
      return <div title={date.toString()}>{date.toLocaleDateString()}</div>
    },
    enableMultiSort: true,
  }),
  columnHelper.accessor('txHash', {
    id: 'txHash',
    header: () => 'Tx Hash',
    cell: (info) => {
      const value = info.getValue()
      return (
        <Link title={value} target="_blank" href={'https://etherscan.io/tx/' + value}>
          {value.substring(0, 7) + '...'}
        </Link>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor('category', {
    id: 'category',
    header: () => 'Category',
    cell: (info) => info.getValue(),
    enableMultiSort: true,
  }),
  columnHelper.accessor('eventType', {
    id: 'eventType',
    header: () => 'Action',
    cell: (info) => info.getValue(),
    enableMultiSort: true,
  }),
  columnHelper.accessor('amountIn', {
    id: 'amountIn',
    header: () => 'Amount In',
    cell: (info) => (+info.getValue()).toFixed(2),
    enableMultiSort: true,
  }),
  columnHelper.accessor('currencyIn', {
    id: 'currencyIn',
    header: () => 'Token In',
    cell: (info) => info.getValue().substring(0, 7),
    enableSorting: false,
  }),
  columnHelper.accessor('amountOut', {
    id: 'amountOut',
    header: () => 'Amount Out',
    cell: (info) => +info.getValue(),
    enableMultiSort: true,
  }),
  columnHelper.accessor('currencyOut', {
    id: 'currencyOut',
    header: () => 'Token Out',
    cell: (info) => info.getValue().substring(0, 7),
    enableSorting: false,
  }),
]

function Filter({ column, table }: { column: Column<any, unknown>; table: TableTp<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
  const columnFilterValue = column.getFilterValue()
  console.log(firstValue)

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  )

  return typeof firstValue === 'number' ? (
    <Flex minW={'100px'} gap={2}>
      <Input
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={({ target: { value } }) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
        }`}
        flex={1}
        p="8px"
        h="30px"
        rounded={'md'}
      />
      <Input
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={({ target: { value } }) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
        }`}
        flex={1}
        p="8px"
        h="30px"
        rounded={'md'}
      />
    </Flex>
  ) : (
    <Input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={({ target: { value } }) => column.setFilterValue(value)}
      placeholder={`Search `}
      list={column.id + 'list'}
      maxW="80px"
      rounded={'md'}
      h="30px"
    />
  )
}
