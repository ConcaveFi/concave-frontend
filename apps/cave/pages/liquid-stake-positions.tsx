import { Flex } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { UserDashboardCard } from 'components/StakingPositions/DashboardBody/UserDashboardCard'
import { LiquidDashboardHeader } from 'components/StakingPositions/LiquidDashboardHeader'

export function LiquidStakePositions() {
  const stakePosition = useStakePositions()
  const test = ''
  return (
    <Flex
      mx="auto"
      maxW={{ lg: '760px', md: '580px', base: '358px' }}
      align={'center'}
      justify="start"
      direction={'column'}
      position="relative"
      textAlign="center"
    >
      <LiquidDashboardHeader />
      <Flex
        maxW={{ lg: '760px', md: '580px', base: '358px' }}
        justify={'center'}
        position="relative"
      >
        <UserDashboardCard stakePosition={stakePosition} />
        {/* <DashboardMobile data={data} /> */}
      </Flex>
    </Flex>
  )
}

LiquidStakePositions.Meta = {
  title: 'Concave | Liquid Stake Positions',
  description: `You can use the Dashboard to claim dividends and manage your Liquid NFT positions.`,
}

export default withPageTransition(LiquidStakePositions)
