import { ExpandArrowIcon, SpinnerIcon } from '@concave/icons'
import { stakingPools } from '@concave/marketplace'
import { Box, Card, Collapse, Flex, keyframes, Text, useDisclosure } from '@concave/ui'
import { formatDistanceStrict } from 'date-fns'
import {
  Get_Stakingv1_Last100_LockQuery,
  useGet_Stakingv1_Last100_LockQuery,
} from 'graphql/generated/graphql'
import { useEffect, useState } from 'react'
import { formatFixed } from 'utils/bigNumberMask'

export const LiquidLocksCards = () => {
  const [stakingLocks, setStakingLocks] = useState<
    Get_Stakingv1_Last100_LockQuery['logStakingV1_Lock']
  >([])
  const { isOpen, onToggle } = useDisclosure()

  const stakingData = useGet_Stakingv1_Last100_LockQuery()
  const { isLoading, status } = stakingData
  useEffect(() => {
    if (stakingData?.data?.logStakingV1_Lock) {
      setStakingLocks(
        stakingData?.data?.logStakingV1_Lock.sort(
          (current, before) => before.timestamp - current.timestamp,
        ),
      )
    }
  }, [stakingData])

  const amountStaked = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {formatFixed(value.amount) + ' CNV'}
      </Text>
    ))
    .splice(0, 9)

  const stakePools = stakingLocks
    .map((value, index) => (
      <Text opacity={1 - (index / 10) * (isOpen ? 1 : 3)} key={index}>
        {stakingPools[+value.poolID].days}
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
      mx={'auto'}
      width={'full'}
      variant="secondary"
      direction={'column'}
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    >
      <Collapse startingHeight={status === 'success' ? '100px' : '55px'} in={isOpen}>
        <Flex fontWeight="700" width={'full'} flex={1} height="full">
          <LocksColumn title="When" values={relativeTime} />
          <Box w="1px" bg="stroke.primary" />
          <LocksColumn title="Amount staked" values={amountStaked} />
          <Box w="1px" bg="stroke.primary" />
          <LocksColumn title="Stake pool" values={stakePools} />
        </Flex>
      </Collapse>

      <Card
        height={'35px'}
        width="full"
        rounded={'0px 0px 16px 16px'}
        justify="center"
        align={'center'}
      >
        {
          {
            loading: (
              <Flex align={'center'} gap={2}>
                <Text fontSize={'18px'} fontWeight="700">
                  Loading data
                </Text>
                <SpinnerIcon animation={`${spinAnimation} 2s linear infinite`} />
              </Flex>
            ),
            success: (
              <ExpandArrowIcon
                width={12}
                height={12}
                cursor="pointer"
                transition={'all 0.3s'}
                transform={isOpen ? 'rotate(180deg)' : ''}
                onClick={onToggle}
              />
            ),
            error: (
              <Text m="auto" fontSize={'18px'} fontWeight="700">
                Error loading data
              </Text>
            ),
          }[status]
        }
      </Card>
    </Card>
  )
}

type LocksColumnProps = { title: string; values: JSX.Element[] }
const LocksColumn: React.FC<LocksColumnProps> = ({ title, values }) => (
  <Flex direction={'column'} flex={1} height="full" align={'center'}>
    <Text mt={2} fontSize={{ base: 'sm', md: 'md' }}>
      {title}
    </Text>
    <Flex
      direction={'column'}
      textColor="text.accent"
      fontSize={{ base: '12px', md: '14px' }}
      align="center"
    >
      {values}
    </Flex>
  </Flex>
)

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
