import { Flex, Link, Table, Tbody, Td, Th, Thead, Tr } from '@concave/ui'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { dashItem } from 'components/UserDashboard/dashItem.type'
import { DataTable } from 'components/UserDashboard/DataTable'
import { useUserTxHistoryState } from 'components/UserDashboard/hooks/useUserTxHistoryState'
import { useState } from 'react'
import { DataTableCard } from '../../DataTableCard'

export const TxHistory = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const { data, isLoading, isSuccess } = useUserTxHistoryState()

  const reactTable = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
      <DataTableCard dataTableLabel={'Transaction History'} isExpanded hasPositions>
        <DataTable h={'100%'}>
          {!isLoading && isSuccess ? (
            <>
              <Table style={{ height: '100%', width: '100%' }}>
                <Thead>
                  {reactTable.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <Th key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder ? null : (
                              <div
                                style={{
                                  cursor: header.column.getCanSort() ? 'pointer' : 'default',
                                }}
                                {...{
                                  onClick: header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                  asc: ' 🔼',
                                  desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                              </div>
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
                      {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          ) : (
            <></>
          )}
        </DataTable>
      </DataTableCard>
    </Flex>
  )
}

const columnHelper = createColumnHelper<dashItem>()
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
    header: () => 'Type',
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
    header: () => 'Currency In',
    cell: (info) => info.getValue().substring(0, 7),
    enableSorting: false,
  }),
  columnHelper.accessor('amountOut', {
    id: 'amountOut',
    header: () => 'Amount Out',
    cell: (info) => (+info.getValue()).toFixed(2),
    enableMultiSort: true,
  }),
  columnHelper.accessor('currencyOut', {
    id: 'currencyOut',
    header: () => 'Currency Out',
    cell: (info) => info.getValue().substring(0, 7),
    enableSorting: false,
  }),
]
