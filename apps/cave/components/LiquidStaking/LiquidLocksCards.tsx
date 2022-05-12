import { Box, Card, Flex, Text } from '@concave/ui'
import { format } from 'date-fns'
import { formatEther } from 'ethers/lib/utils'
import { useGet_Stakingv1_Last100_LockQuery } from 'graphql/generated/graphql'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const LiquidLocksCards = () => {
  const [stakingLocks, setStakingLocks] = useState([])

  const stakingData = useGet_Stakingv1_Last100_LockQuery()
  useEffect(() => {
    if (stakingData?.data?.logStakingV1_Lock) {
      setStakingLocks(stakingData?.data?.logStakingV1_Lock)
    }
  }, [stakingData])

  const amounts = stakingLocks
    .filter((value, index) => {
      if (index < 3) return 1
    })
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * 3} key={index}>
        {formatEther(BigInt(value.amount)) + ' CNV'}
      </Text>
    ))

  const poolIds = stakingLocks
    .filter((value, index) => {
      if (index < 3) return 1
    })
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * 3} key={index}>
        {value.poolID}
      </Text>
    ))

  const relativeTime = stakingLocks
    .filter((value, index) => {
      if (index < 3) return 1
    })
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * 3} key={index}>
        {format(value.timestamp * 1000, new Date().getTime().toString())}
      </Text>
    ))
  return (
    <Card
      my={4}
      mx={'auto'}
      height={'140px'}
      maxHeight={'160px'}
      maxWidth={400}
      variant="secondary"
      direction={'column'}
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    >
      <Flex fontWeight="700" width={'full'} flex={1}>
        <Flex direction={'column'} flex={0.4} justify="start" mt={2}>
          <Text>Pool id</Text>
          <Flex direction={'column'} textColor="text.low" fontSize={'14px'}>
            {poolIds}
          </Flex>
        </Flex>
        <Box w="1px" bg="stroke.primary" />
        <Flex direction={'column'} flex={0.5} justify="start" mt={2}>
          <Text>Amount locked</Text>
          <Flex direction={'column'} textColor="text.accent" fontSize={'14px'}>
            {amounts}
          </Flex>
        </Flex>
        <Box w="1px" bg="stroke.primary" />
        <Flex direction={'column'} flex={0.5} justify="start" mt={2}>
          <Text>Timeline</Text>
          <Flex direction={'column'} textColor="text.accent" fontSize={'14px'}>
            {relativeTime}
          </Flex>
        </Flex>
      </Flex>
      <Card height={'35px'} width="full" rounded={'0px 0px 16px 16px'} justify="center">
        <Text fontWeight={700} cursor="pointer">
          Show more
        </Text>
      </Card>
    </Card>
  )
}

interface ViewOnExplorerProps {
  txHash: string
}

export default LiquidLocksCards
