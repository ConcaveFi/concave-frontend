import { PoolRewards } from '@concave/marketplace'
import { Flex, Stack, Text } from '@concave/ui'
import React from 'react'

function addDays(date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

type StakeInfoProps = {
  poolId: number
  poolRewards: PoolRewards
  currentlyStaked: string
  stakingCap: string
  percent: number
}
function StakeInfo({ currentlyStaked, poolId, poolRewards, stakingCap, percent }: StakeInfoProps) {
  return (
    <Flex w={{ base: '300px', md: '350px' }} rounded="3xl" shadow={'up'} p={4} direction="column">
      <Flex justify={'space-between'} w="full">
        <HeaderInfo title={poolRewards.rewardsBoost} info="Rewards boost" />
        <HeaderInfo title={poolRewards.bondRevenue} info="Share of bond growth" />
      </Flex>
      <Paragraph poolId={poolId} staking={poolRewards} />
      <Flex mt={{ base: 3, md: 5 }} align="center" gap={1} fontWeight="semibold">
        <Text color="text.low" fontSize="md">
          Redeem date:
        </Text>
        <Text fontSize="md">{addDays(Date(), poolRewards.days).toISOString().slice(0, 10)}</Text>
      </Flex>
      <LoadBar currentlyStaked={currentlyStaked} percent={percent} stakingCap={stakingCap} />
    </Flex>
  )
}

export default StakeInfo

type ParagraphProps = { poolId: number; staking: PoolRewards }
const Paragraph = ({ poolId, staking }: ParagraphProps) => (
  <Text
    mt={{ base: 3, md: 6 }}
    color="text.low"
    fontSize={{ base: '12px', md: 'sm' }}
    align="justify"
  >
    The {poolId} staking term will accrue CNV from bond emissions by capturing{` `}
    {staking.bondRevenue} of the growth generated from purchased bonds every 8 hours. Additionally,
    the {poolId} term receives a{` `}
    {staking.rewardsBoost} boost on base CNV emissions and a {staking.quaterlyBoost} the quarterly
    dividend derived from protocol profits in non CNV assets.
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

type LoadBarProps = { percent: number; currentlyStaked: string; stakingCap: string }
const LoadBar: React.FC<LoadBarProps> = ({ currentlyStaked, percent, stakingCap }) => (
  <>
    {' '}
    <Stack px={4} color="text.low" fontSize={12} isInline justify="space-between" mt={6}>
      <Text fontSize="sm">Currently staked</Text>
      <Text fontSize="sm">Staking cap</Text>
    </Stack>
    <Flex w="full" h="30px" shadow={'down'} rounded="2xl" mt={3} p={1}>
      <Flex
        h={'full'}
        width={`${percent}%`}
        apply="background.metalBrighter"
        rounded={'2xl'}
        shadow="up"
      />
    </Flex>
    <Flex justify={'space-between'} px={4} mt={'-27px'}>
      <Text>{currentlyStaked}</Text>
      <Text>{stakingCap}</Text>
    </Flex>
  </>
)
