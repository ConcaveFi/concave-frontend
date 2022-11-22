import { stakingPools } from '@concave/marketplace'
import { Card, Flex, Link, Text, TextProps } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import {
  Get_Stakingv1_Last100_LockQuery,
  useGet_Stakingv1_Last100_LockQuery,
} from 'graphql/generated/graphql'
import { getTxExplorer } from 'lib/getTransactionExplorer'
import { useMemo } from 'react'
import { UseQueryResult } from 'react-query'
import { formatFixed } from 'utils/bigNumberMask'

export const LiquidLocksCards = () => {
  const stakeData = useGet_Stakingv1_Last100_LockQuery()
  const stakingLocks = useMemo(() => prepareStakingData(stakeData), [stakeData])

  return (
    <Card
      maxW={['380px', '450px', '500px', '500px', '1100px', '1100px']}
      borderGradient="secondary"
      direction={'column'}
      variant="secondary"
      overflow="hidden"
      width={'full'}
      mx={'auto'}
      p="4"
    >
      <Flex
        apply="scrollbar.big"
        direction={'column'}
        overflowY={'auto'}
        fontWeight="700"
        width={'full'}
        height="full"
        maxH="200px"
        flex={1}
      >
        <TableHeader />
        <TableRows data={stakingLocks} />
      </Flex>
    </Card>
  )
}

function TableHeader() {
  return (
    <Flex w="full" align={'center'} color="text.low">
      <Text {...columnProps}>When</Text>
      <Text {...columnProps}>Amount staked</Text>
      <Text {...columnProps}>Stake pool</Text>
    </Flex>
  )
}

interface TableRowsProps {
  data: { txHash?: string; poolID?: 360 | 180 | 90 | 45; timestamp?: string; amount?: string }[]
}
function TableRows({ data }: TableRowsProps) {
  return (
    <Flex direction={'column'} textColor="text.bright" fontSize={{ base: '12px', md: '14px' }}>
      {data?.map((val) => (
        <Link _hover={{}} key={val.txHash} href={getTxExplorer(val.txHash, 1)} isExternal>
          <Flex _hover={{ bg: '#0004' }} rounded="5px" cursor="pointer" key={val.txHash} w="full">
            <Text {...columnProps}>{val.timestamp}</Text>
            <Text {...columnProps} color="white">
              {val.amount}
            </Text>
            <Text {...columnProps} color="white">
              {val.poolID}
            </Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  )
}

const columnProps: TextProps = {
  fontSize: { base: 'sm', md: 'md' },
  justifyContent: 'center',
  display: 'flex',
  flex: 1,
}

function prepareStakingData(stakeData: UseQueryResult<Get_Stakingv1_Last100_LockQuery, unknown>) {
  return stakeData?.data?.logStakingV1_Lock
    .sort((current, before) => before.timestamp - current.timestamp)
    .map((val) => {
      return {
        timestamp: `${formatDistanceStrict(val.timestamp * 1000, Date.now())} ago`,
        amount: `${formatFixed(val.amount || 0)} CNV`,
        poolID: stakingPools[+val.poolID].days,
        txHash: val.txHash,
      }
    })
    .splice(0, 30)
}
