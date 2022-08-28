import { StakingPool, stakingPools } from '@concave/marketplace'
import { Flex, Stack, Text } from '@concave/ui'
import React from 'react'

function getRedeemDateString(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().slice(0, 10)
}

type StakeInfoProps = {
  stakingPool: StakingPool
  status: 'loading' | 'error' | 'idle' | 'success'
  poolId: number
  loadBar: JSX.Element
}
export function StakeInfo({ stakingPool, loadBar, status, poolId }: StakeInfoProps) {
  const statusLab = { loading: 'loading', error: '---' }[status]
  return (
    <Flex w={{ base: '300px', md: '350px' }} rounded="3xl" shadow={'up'} p={4} direction="column">
      <Flex justify={'space-between'} w="full">
        <HeaderInfo title={statusLab || stakingPool?.rewardsBoost} info="Rewards boost" />
        <HeaderInfo title={statusLab || stakingPool?.bondRevenue} info="Share of bond growth" />
      </Flex>
      <Paragraph poolId={poolId} staking={stakingPool} />
      <Flex mt={{ base: 3, md: 5 }} align="center" gap={1} fontWeight="semibold">
        <Text color="text.low" fontSize="md">
          Redeem date:
        </Text>
        <Text fontSize="md">{getRedeemDateString(Date(), stakingPools[poolId].days)}</Text>
      </Flex>
      {loadBar}
    </Flex>
  )
}

type ParagraphProps = { poolId: number; staking: StakingPool }
const Paragraph = ({ poolId, staking }: ParagraphProps) => (
  <Text
    mt={{ base: 3, md: 6 }}
    color="text.low"
    fontSize={{ base: 'xs', md: 'sm' }}
    align="justify"
  >
    The {stakingPools[poolId].days} days staking term will accrue CNV from bond emissions by
    capturing{` `}
    {staking?.bondRevenue} of the growth generated from purchased bonds every 8 hours. Additionally,
    the {poolId} term receives a{` `}
    {staking?.rewardsBoost} boost on base CNV emissions and a {staking?.quarterlyBoost} boost on the
    quarterly dividend derived from protocol profits in non CNV assets.
  </Text>
)

type HeaderInfoProps = { title: string; info: string }
const HeaderInfo: React.FC<HeaderInfoProps> = ({ info, title }) => (
  <Stack spacing="1px">
    <Text textAlign="left" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
      {title}
    </Text>
    <Text color="text.low" fontSize="sm">
      {info}
    </Text>
  </Stack>
)
