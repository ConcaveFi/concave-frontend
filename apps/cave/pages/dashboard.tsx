import { Container, Flex, Heading, HStack, Stack, Text, useMediaQuery } from '@concave/ui'
import UserPositionCardMobile from 'components/Dashboard/Mobile/Components/UserPositionCard'
import DashboardMobile from 'components/Dashboard/Mobile/DashboardMobile'

import UserDashboardCard from 'components/Dashboard/UserDashboardCard'
import { useDashBoardState } from 'contracts/DashBoard/DashBoardState'
import React from 'react'
import { useEffect, useState } from 'react'
export default function Dashboard() {
  const data = useDashBoardState()

  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      <Heading as="h1" mt={8} mb={3} fontSize="5xl">
        My Dashboard
      </Heading>
      <Flex my={3} justify={'center'} maxWidth={{ sm: '358px', lg: '1000px' }}>
        <Text textAlign="center">
          This is the user dashboard to claim divdends and manage your liquid NFT positions.
        </Text>
      </Flex>

      <Flex justify={'center'} position="relative">
        <UserDashboardCard data={data} />
        <DashboardMobile data={data} />
      </Flex>
    </Flex>
  )
}
