import { Flex } from '@concave/ui'
import { UserDashboardCard } from 'components/Dashboard/DashboardBody/UserDashboardCard'
import { DashboardHeader } from 'components/Dashboard/DashboardHeader'
import { withPageTransition } from 'components/PageTransition'
import { useDashBoardState } from 'contracts/DashBoard/DashBoardState'
import React from 'react'
export function LiquidStakePositions() {
  const stakePositions = useDashBoardState()
  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      <DashboardHeader />
      <Flex justify={'center'} position="relative">
        <UserDashboardCard stakePositions={stakePositions} />
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
