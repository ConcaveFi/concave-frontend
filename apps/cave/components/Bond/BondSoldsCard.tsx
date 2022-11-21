import { Card, Flex, Text, TextProps } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import {
  Get_Accrualbondv1_Last10_SoldQuery,
  useGet_Accrualbondv1_Last10_SoldQuery,
} from 'graphql/generated/graphql'
import { useMemo } from 'react'
import { numberMask } from 'utils/numberMask'

interface BoldSoldsCardProps {}

export const BondSoldsCard = (props: BoldSoldsCardProps) => {
  const { data, isLoading, error, status } = useGet_Accrualbondv1_Last10_SoldQuery()
  const activity = useMemo(() => prepareData(data), [data])

  return (
    <Card variant="secondary" borderGradient={'secondary'} p={4} overflow="hidden">
      <Flex
        direction={'column'}
        fontWeight={500}
        maxH="200px"
        overflowY={'auto'}
        apply="scrollbar.big"
        width={'full'}
      >
        <TableHeader />
        <TableRows data={activity} />
      </Flex>
    </Card>
  )
}

function TableHeader() {
  return (
    <Flex w="full" color="text.low">
      <Text {...columnProps}>When</Text>
      <Text {...columnProps}>Amount</Text>
      <Text {...columnProps}>Bonded</Text>
    </Flex>
  )
}
interface TableRowProps {
  data: { timestamp: string; output: string; inputAmount: string }[]
}

function TableRows({ data }: TableRowProps) {
  return (
    <Flex direction={'column'} textColor="text.bright" fontSize={{ base: '12px', md: '14px' }}>
      {data?.map((val, index) => (
        <Flex rounded="5px" key={index} w="full">
          <Text {...columnProps}>{val.timestamp}</Text>
          <Text {...columnProps} color="white">
            {val.inputAmount}
          </Text>
          <Text {...columnProps} color="white">
            {val.output}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}

interface ColumnProps {
  title: string
  values: string[] | number[]
}
function Column({ title, values }: ColumnProps) {
  return (
    <Flex flex={1} direction="column" align={'center'} fontSize="14px">
      <Text fontSize="16px" textColor={'text.low'} fontWeight="700">
        {title}
      </Text>
      {values.map((val, index) => (
        <Text
          opacity={title.toLowerCase() === 'when' && 0.7}
          fontSize={{ base: '12px', md: 'sm' }}
          key={index}
          textColor="text.bright"
        >
          {val}
        </Text>
      ))}
    </Flex>
  )
}

function prepareData(data: Get_Accrualbondv1_Last10_SoldQuery) {
  const newData = data?.logAccrualBondsV1_BondSold
  if (!newData) return []
  return newData.map((val) => ({
    timestamp: formatDistanceStrict(val.timestamp * 1000, new Date().getTime()) + ' ago',
    output: `${numberMask(+val.output)} CNV`,
    inputAmount: `${numberMask(+val.inputAmount)} DAI`,
  }))
}

const columnProps: TextProps = {
  fontSize: { base: 'sm', md: 'md' },
  justifyContent: 'center',
  display: 'flex',
  flex: 1,
}
