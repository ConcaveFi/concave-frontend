import { ExpandArrowIcon, SpinnerIcon } from '@concave/icons'
import { Box, Card, Collapse, Flex, keyframes, Spinner, Text, useDisclosure } from '@concave/ui'
// import { GlassPanel } from 'components/Treasury/TreasuryManagementCard'
import { formatDistanceStrict } from 'date-fns'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useGet_Stakingv1_Last100_LockQuery } from 'graphql/generated/graphql'
import { useEffect, useState } from 'react'
import { POOL_ID_TO_DAYS } from 'utils/contants'
import { formatFixed } from 'utils/formatFixed'

const LiquidLocksCards = () => {
  const [stakingLocks, setStakingLocks] = useState([])
  const { isOpen, onToggle } = useDisclosure()

  const stakingData = useGet_Stakingv1_Last100_LockQuery()
  const { isLoading } = stakingData
  useEffect(() => {
    if (stakingData?.data?.logStakingV1_Lock) {
      setStakingLocks(
        stakingData?.data?.logStakingV1_Lock.sort((current, before) => {
          if (current.timestamp > before.timestamp) return 1
        }),
      )
    }
  }, [stakingData])

  stakingData.isLoading
  const amounts = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {formatFixed(value.amount) + ' CNV'}
      </Text>
    ))
    .splice(0, 9)

  const poolIds = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {POOL_ID_TO_DAYS[value.poolID]}
      </Text>
    ))
    .splice(0, 9)

  const relativeTime = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {`${formatDistanceStrict(value.timestamp * 1000, Date.now())}  ago`}
      </Text>
    ))
    .splice(0, 9)

  return (
    <Card
      mt={4}
      mx={'auto'}
      width={{ base: '330px', md: '430px', xl: '900px' }}
      variant="secondary"
      direction={'column'}
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    >
      <Collapse startingHeight={isLoading ? '60px' : '100px'} in={isOpen}>
        <Flex fontWeight="700" width={'full'} flex={1} height="full">
          <Flex direction={'column'} flex={1} height="full" align={'center'}>
            <Text mt={2} fontSize={{ base: 'sm', md: 'md' }}>
              When
            </Text>
            <Flex
              direction={'column'}
              textColor="text.accent"
              fontSize={{ base: '12px', md: '14px' }}
              align="center"
            >
              {relativeTime}
            </Flex>
          </Flex>

          <Box w="1px" bg="stroke.primary" />
          <Flex direction={'column'} flex={1} align={'center'} height="full">
            <Text mt={2} fontSize={{ base: 'sm', md: 'md' }}>
              Amount Staked
            </Text>
            <Flex
              direction={'column'}
              textColor="text.accent"
              fontSize={{ base: '12px', md: '14px' }}
              align="center"
            >
              {amounts}
            </Flex>
          </Flex>
          <Box w="1px" bg="stroke.primary" />
          <Flex direction={'column'} flex={1} align={'center'} height="full">
            <Text mt={2} fontSize={{ base: 'sm', md: 'md' }}>
              Stake Pool
            </Text>
            <Flex direction={'column'} textColor="text.low" fontSize={{ base: '12px', md: '14px' }}>
              {poolIds}
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
        {isLoading ? (
          <Flex align={'center'} gap={2}>
            <Text fontSize={'18px'} fontWeight="700">
              Loading tracks
            </Text>
            <SpinnerIcon animation={`${spinAnimation} 2s linear infinite`} />
          </Flex>
        ) : (
          <ExpandArrowIcon
            width={12}
            height={12}
            cursor="pointer"
            transition={'all 0.3s'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            onClick={onToggle}
          />
        )}
      </Card>
    </Card>
  )
}
export default LiquidLocksCards

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
