import { Card, Flex, Link, Text, TextProps } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import {
  Get_Accrualbondv1_Last10_SoldQuery,
  useGet_Accrualbondv1_Last10_SoldQuery,
} from 'graphql/generated/graphql'
import { getTxExplorer } from 'lib/getTransactionExplorer'
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
  data: { timestamp: string; output: string; inputAmount: string; txHash: string }[]
}

function TableRows({ data }: TableRowProps) {
  return (
    <Flex direction={'column'} textColor="text.bright" fontSize={{ base: '12px', md: '14px' }}>
      {data?.map((val, index) => (
        <Link
          href={getTxExplorer(val.txHash, 1)}
          _hover={{ bg: '#0005' }}
          rounded="md"
          key={index}
          isExternal
        >
          <Flex rounded="5px" w="full">
            <Text {...columnProps}>{val.timestamp}</Text>
            <Text {...columnProps} color="white">
              {val.inputAmount}
            </Text>
            <Text {...columnProps} color="white">
              {val.output}
            </Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  )
}

function prepareData(data: Get_Accrualbondv1_Last10_SoldQuery) {
  const newData = data?.logAccrualBondsV1_BondSold
  if (!newData) return []
  return newData.map((val) => ({
    timestamp: formatDistanceStrict(val.timestamp * 1000, new Date().getTime()) + ' ago',
    inputAmount: `${numberMask(+val.inputAmount)} DAI`,
    output: `${numberMask(+val.output)} CNV`,
    txHash: val.txHash,
  }))
}

const columnProps: TextProps = {
  fontSize: { base: 'sm', md: 'md' },
  justifyContent: 'center',
  display: 'flex',
  flex: 1,
}
