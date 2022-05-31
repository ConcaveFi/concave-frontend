import { Flex, Heading, Text } from '@concave/ui'
import DashboardMobile from 'components/Dashboard/Mobile/DashboardMobile'
import UserStacksPositionsBox from 'components/Dashboard/UserDashboardCard'
import { withPageTransition } from 'components/PageTransition'
import { useStackPositions } from 'contracts/DashBoard/DashBoardState'
import React from 'react'

export function LiquidStakePositions() {
  const data = useStackPositions()

  // commit

  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      <Heading as="h1" mt={8} mb={3} fontSize="5xl">
        Liquid Stake Positions
      </Heading>
      <Flex my={3} justify={'center'} maxWidth={{ sm: '358px', lg: '1000px' }}>
        <Text textAlign="center">
          This is the user dashboard to claim dividends and manage your liquid NFT positions.
        </Text>
      </Flex>

      <Flex justify={'center'} position="relative">
        <UserStacksPositionsBox data={data} />
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
