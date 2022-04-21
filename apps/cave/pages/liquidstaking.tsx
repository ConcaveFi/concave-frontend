import { Container, Flex, Heading, HStack, Text } from '@concave/ui'
import StakeCard from 'components/LiquidStaking/StakeCard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import { useState } from 'react'

interface StakingGroupProps {
  icon: string
  period: string
  vapr: string
  stakedCNV: string
  CNVCap: string
  stakingLink: string
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '360d',
    period: '360 days',
    vapr: '6,342',
    stakedCNV: '89999',
    CNVCap: '90000',
    stakingLink: '',
  },
  {
    icon: '180d',
    period: '180 days',
    vapr: '1,002',
    stakedCNV: '42690',
    CNVCap: '60000',
    stakingLink: '',
  },
  {
    icon: '90d',
    period: '90 days',
    vapr: '266',
    stakedCNV: '13333',
    CNVCap: '80000',
    stakingLink: '',
  },
  {
    icon: '45d',
    period: '45 days',
    vapr: '17',
    stakedCNV: '69420',
    CNVCap: '90000',
    stakingLink: '',
  },
]

function LiquidStaking() {
  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        Liquid Staking
      </Heading>
      <HStack mt={8} spacing={14}>
        <Text maxW={520} textAlign="right">
          Liquid Staking allows you to access your funds even when you&apos;re staking them. The
          funds remain in escrow, but aren&apos;t totally inaccessible. In this scenario, you are
          able to trade the locked-staking positions in the form of NFTs in the secondary
          marketplace.
        </Text>
        <GraphicGuide />
      </HStack>

      <Flex direction="row" gap={8} position="relative" mt={16}>
        {StakingGroup.map((s) => (
          <StakeCard
            icon={s.icon}
            period={s.period}
            vapr={s.vapr}
            stakedCNV={s.stakedCNV}
            CNVCap={s.CNVCap}
            stakingLink={s.stakingLink}
            key={s.period}
          />
        ))}
      </Flex>
    </Container>
  )
}

export default LiquidStaking
