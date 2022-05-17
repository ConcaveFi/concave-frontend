import { ExpandArrowIcon } from '@concave/icons'
import { Box, Card, Collapse, Flex, Text, useDisclosure } from '@concave/ui'
// import { GlassPanel } from 'components/Treasury/TreasuryManagementCard'
import { formatDistanceStrict } from 'date-fns'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useGet_Stakingv1_Last100_LockQuery } from 'graphql/generated/graphql'
import { useEffect, useState } from 'react'
import { PARAMETER_TO_POOL_PERIOD, PERIOD_TO_POOL_PARAMETER } from './StakeCard'

const LiquidLocksCards = () => {
  const [stakingLocks, setStakingLocks] = useState([])
  const { isOpen, onToggle } = useDisclosure()

  const stakingData = useGet_Stakingv1_Last100_LockQuery()
  useEffect(() => {
    if (stakingData?.data?.logStakingV1_Lock) {
      setStakingLocks(
        stakingData?.data?.logStakingV1_Lock.sort((current, before) => {
          if (current.timestamp > before.timestamp) return 1
        }),
      )
    }
  }, [stakingData])

  const amounts = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {formatEther(BigNumber.from(value.amount)) + ' CNV'}
      </Text>
    ))
    .splice(0, 9)

  const poolIds = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {PARAMETER_TO_POOL_PERIOD[value.poolID]}
      </Text>
    ))
    .splice(0, 9)

  const relativeTime = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {`${formatDistanceStrict(value.timestamp * 1000, Date.now())} ago`}
      </Text>
    ))
    .splice(0, 9)
  return (
    <Card
      mt={4}
      mx={'auto'}
      width={{ base: '520px', xl: '900px' }}
      variant="secondary"
      direction={'column'}
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    >
      <Collapse startingHeight={'100px'} in={isOpen}>
        <Flex fontWeight="700" width={'full'} flex={1}>
          <Flex direction={'column'} flex={0.4} justify="center" align={'center'} mt={2}>
            <Text>Stake period</Text>
            <Flex direction={'column'} textColor="text.low" fontSize={'14px'} alignItems={'center'}>
              {poolIds}
            </Flex>
          </Flex>
          <Box w="1px" bg="stroke.primary" />
          <Flex direction={'column'} flex={0.5} justify="center" align={'center'} mt={2}>
            <Text>Amount locked</Text>
            <Flex
              direction={'column'}
              textColor="text.accent"
              fontSize={'14px'}
              alignItems={'center'}
            >
              {amounts}
            </Flex>
          </Flex>
          <Box w="1px" bg="stroke.primary" />
          <Flex direction={'column'} flex={0.5} justify="center" align={'center'} mt={2}>
            <Text>Timeline</Text>
            <Flex
              direction={'column'}
              textColor="text.accent"
              fontSize={'14px'}
              alignItems={'center'}
            >
              {relativeTime}
            </Flex>
          </Flex>
        </Flex>
      </Collapse>
      <Card
        height={'35px'}
        width="full"
        rounded={'0px 0px 16px 16px'}
        justify="center"
        align={'center'}
      >
        <ExpandArrowIcon
          width={12}
          height={12}
          cursor="pointer"
          transition={'all 0.3s'}
          transform={isOpen ? 'rotate(180deg)' : ''}
          onClick={onToggle}
        />
      </Card>
    </Card>
  )
}
export default LiquidLocksCards
