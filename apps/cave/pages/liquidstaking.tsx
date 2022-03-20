import { Container, Flex, Heading, HStack, Stack, Text } from '@concave/ui'
import React from 'react'
import StakeCard from 'components/LiquidStaking/StakeCard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'

interface StakingGroupProps {
  icon: string
  period: string
  vapr: string
  stakedCNV: string
  stakingLink: string
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '',
    period: '12 months',
    vapr: '6,342',
    stakedCNV: '83,431',
    stakingLink: '',
  },
  {
    icon: '',
    period: '6 months',
    vapr: '1,002',
    stakedCNV: '83,431',
    stakingLink: '',
  },
  {
    icon: '',
    period: '3 months',
    vapr: '266',
    stakedCNV: '83,431',
    stakingLink: '',
  },
  {
    icon: '',
    period: '1 month',
    vapr: '17',
    stakedCNV: '83,431',
    stakingLink: '',
  },
]

function LiquidStaking() {
  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={24} mb={3} fontSize="5xl">
        Liquid Staking
      </Heading>
      <HStack mt={8} spacing={40}>
        <Text maxW={520} textAlign="right">
          Liquid Staking allows you to access your funds
          <br />
          even when you&apos;re staking them. The funds
          <br />
          remain in escrow, but aren&apos;t totally inaccessible.
          <br />
          In this scenario, you are able to trade the
          <br />
          locked-staking positions in the form of NFTs in
          <br />
          the secondary marketplace.
        </Text>
        <GraphicGuide />
      </HStack>

      <Flex direction="row" gap={3} position="relative" mt={16}>
        {StakingGroup.map((s) => (
          <StakeCard
            icon={s.icon}
            period={s.period}
            vapr={s.vapr}
            stakedCNV={s.stakedCNV}
            stakingLink={s.stakingLink}
            key={s.period}
          />
        ))}
      </Flex>
    </Container>
  )
}

export default LiquidStaking
