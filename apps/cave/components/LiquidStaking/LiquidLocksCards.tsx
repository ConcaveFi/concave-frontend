import { stakingPools } from '@concave/marketplace'
import { Card, Flex, Text } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import {
  Get_Stakingv1_Last100_LockQuery,
  useGet_Stakingv1_Last100_LockQuery,
} from 'graphql/generated/graphql'
import { useMemo } from 'react'
import { UseQueryResult } from 'react-query'
import { formatFixed } from 'utils/bigNumberMask'

export const LiquidLocksCards = () => {
  const stakeData = useGet_Stakingv1_Last100_LockQuery()
  const stakingLocks = useMemo(() => prepareStakingData(stakeData), [stakeData])

  return (
    <Card
      mx={'auto'}
      width={'full'}
      variant="secondary"
      direction={'column'}
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    >
      <Flex fontWeight="700" width={'full'} flex={1} height="full" p={4}>
        <LocksColumn title="When" values={stakingLocks?.map(mapTimestamp)} />
        <LocksColumn title="Amount staked" values={stakingLocks?.map(mapAmount)} />
        <LocksColumn title="Stake pool" values={stakingLocks?.map(mapPoolId)} />
      </Flex>
    </Card>
  )
}

type LocksColumnProps = { title: string; values: string[] | number[] }
const LocksColumn: React.FC<LocksColumnProps> = ({ title, values = [] }) => (
  <Flex direction={'column'} flex={1} height="full" align={'center'}>
    <Text mt={2} textColor="text.low" fontSize={{ base: 'sm', md: 'md' }}>
      {title}
    </Text>
    <Flex
      direction={'column'}
      textColor="text.bright"
      fontSize={{ base: '12px', md: '14px' }}
      align="center"
    >
      {values.map((value, index) => (
        <Text key={value + index} opacity={title === 'When' && '0.7'}>
          {value}
        </Text>
      ))}
    </Flex>
  </Flex>
)

function prepareStakingData(stakeData: UseQueryResult<Get_Stakingv1_Last100_LockQuery, unknown>) {
  return stakeData?.data?.logStakingV1_Lock
    .sort((current, before) => before.timestamp - current.timestamp)
    .splice(0, 15)
}

function mapTimestamp(value: { timestamp: any }) {
  return `${formatDistanceStrict(value.timestamp * 1000, Date.now())} ago`
}

function mapAmount(value: { amount: any }) {
  return `${formatFixed(value.amount || 0)} CNV`
}

function mapPoolId(value: { poolID: any }) {
  return stakingPools[+value.poolID].days
}
