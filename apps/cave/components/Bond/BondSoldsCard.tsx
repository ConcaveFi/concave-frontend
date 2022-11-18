import { Card, Flex, Text } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import { useGet_Accrualbondv1_Last10_SoldQuery } from 'graphql/generated/graphql'
import { useMemo } from 'react'
import { numberMask } from 'utils/numberMask'

interface BoldSoldsCardProps {}

export const BondSoldsCard = (props: BoldSoldsCardProps) => {
  const { data, isLoading, error, status } = useGet_Accrualbondv1_Last10_SoldQuery()
  const solds = useMemo(() => data?.logAccrualBondsV1_BondSold || [], [data])

  const purchases = solds.map((value, index) => (
    <Text fontSize={{ base: '12px', md: 'sm' }} key={index}>
      {numberMask(+value.output) + ' CNV'}
    </Text>
  ))
  const inputAmounts = solds.map((value, index) => (
    <Text fontSize={{ base: '12px', md: 'sm' }} key={index}>
      {`${numberMask(+value.inputAmount)} DAI`}
    </Text>
  ))

  return (
    <Card variant="secondary">
      <Flex
        width={'full'}
        height="full"
        flex={1}
        textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
        textColor="text.accent"
        fontWeight={500}
        my={2}
      >
        <Column title="When" values={solds.map(mapDistanceStrict)} />
        <Column title="Amount" values={solds.map(mapInput)} />
        <Column title="Bonded" values={solds.map(mapOutput)} />
      </Flex>
    </Card>
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

function mapDistanceStrict(val: { timestamp: any }) {
  return formatDistanceStrict(val.timestamp * 1000, new Date().getTime()) + ' ago'
}
function mapOutput(val: { output: any }) {
  return `${numberMask(+val.output)} CNV`
}
function mapInput(val: { inputAmount: any }) {
  return `${numberMask(+val.inputAmount)} DAI`
}
