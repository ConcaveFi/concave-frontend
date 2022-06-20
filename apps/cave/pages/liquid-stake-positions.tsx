import { Flex } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { UserDashboardCard } from 'components/StakingPositions/DashboardBody/UserDashboardCard'
import { DashboardHeader } from 'components/StakingPositions/DashboardHeader'

export function LiquidStakePositions() {
  const stakePosition = useStakePositions()
  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      <DashboardHeader />
      <Flex justify={'center'} position="relative">
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
