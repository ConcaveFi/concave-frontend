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


const InfoItem = ({ value, label, fontWeight = 'bold', ...props }) => (
  <Stack spacing={0} fontWeight={fontWeight} textAlign="center" px={8} {...props}>
    <Text fontSize="lg" fontFamily="heading">
      {value}
    </Text>
    <Text fontSize="sm" color="text.low">
      {label}
    </Text>
  </Stack>
)



function LiquidStaking() {
  return (
    <Container maxW="container.lg" borderRadius={0} border="">
      <GcnvTitle
        title="Liquid Staking"
        description="Lock CNV in a staking term and recieve a tradeable NFT representing the position. Stakers receive a share of profits from all Concave products and services: bonding revenue, investment returns and protocol fees."
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
