import { Flex } from '@concave/ui'
import { UserDashboardCard } from 'components/Dashboard/DashboardBody/UserDashboardCard'
import { DashboardHeader } from 'components/Dashboard/DashboardHeader'
import DashboardMobile from 'components/Dashboard/Mobile/DashboardMobile'
import { withPageTransition } from 'components/PageTransition'
import { useStackPositions } from 'contracts/DashBoard/DashBoardState'
import React from 'react'

export function LiquidStakePositions() {
  const data = useStackPositions()
  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      <DashboardHeader />
      <Flex justify={'center'} position="relative">
        <UserDashboardCard data={data} />
        <DashboardMobile data={data} />
      </Flex>
    </Flex>
  )
}

LiquidStakePositions.Meta = {
  title: 'Concave | Liquid Stake Positions',
  description: `You can use the Dashboard to claim dividends and manage your Liquid NFT positions.`,
}

export default withPageTransition(LiquidStakePositions)
