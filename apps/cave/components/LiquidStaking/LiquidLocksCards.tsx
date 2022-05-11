import { Box, Card, Flex, Text } from '@concave/ui'
import { formatEther } from 'ethers/lib/utils'
import { useGet_Stakingv1_Last100_LockQuery } from 'graphql/generated/graphql'
import { useEffect, useState } from 'react'

const LiquidLocksCards = () => {
  const [stakingLocks, setStakingLocks] = useState([])

  const stakingData = useGet_Stakingv1_Last100_LockQuery()
  useEffect(() => {
    if (stakingData?.data?.logStakingV1_Lock) {
      setStakingLocks(stakingData?.data?.logStakingV1_Lock)
    }
  }, [stakingData])

  //   const amounts = stakingLocks
  //     .filter((value, index) => {
  //       if (index < 3) return 1
  //     })
  //     .map((value, index) => <Text key={index}>{formatEther(BigInt(value.amount)) + ' CNV'}</Text>)

  //   const poolIds = stakingLocks
  //     .filter((value, index) => {
  //       if (index < 3) return 1
  //     })
  //     .map((value, index) => <Text key={index}>{value.poolID}</Text>)

  return (
    <Card
      my={4}
      mx={'auto'}
      height={'100px'}
      maxHeight={'100px'}
      maxWidth={600}
      variant="secondary"
      direction={'row'}
    >
      <Flex fontWeight="700" width={'full'}>
        <Flex direction={'column'} flex={0.4} justify="start" mt={2}>
          <Text>Pool id</Text>
          <Flex direction={'column'} textColor="text.low" fontSize={'14px'} lineHeight="12px">
            {/* {poolIds} */}
            <Text>{1}</Text>
            <Text>{3}</Text>
            <Text>{0}</Text>
          </Flex>
        </Flex>
        <Box w="1px" bg="stroke.primary" />
        <Flex direction={'column'} flex={0.5} justify="start" mt={2}>
          <Text>Amount</Text>
          <Flex direction={'column'} textColor="text.low" fontSize={'14px'} lineHeight="12px">
            {/* {amounts} */}
            <Text>{100 + ' CNV'}</Text>
            <Text>{100 + ' CNV'}</Text>
            <Text>{100 + ' CNV'}</Text>
          </Flex>
        </Flex>
        <Box w="1px" bg="stroke.primary" />
        <Flex flex={1} justify="center" mt={2}>
          <Text>Transacation</Text>
        </Flex>
      </Flex>
    </Card>
  )
}

export default LiquidLocksCards
