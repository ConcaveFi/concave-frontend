import { Container, Flex } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import StakeCard from 'components/LiquidStaking/StakeCard'

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
    <Container maxW="container.lg" borderRadius={0} border="">
      <GcnvTitle
        title="Liquid Staking"
        description="Liquid Staking allows you to access your funds even when you're staking them. The funds remain in escrow, but aren't totally inaccessible. In this scenario, you are able to trade the locked-staking positions in the form of NFTs in the secondary marketplace."
      />
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
