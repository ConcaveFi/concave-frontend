import { Container, Flex, Heading, HStack, Stack, Text, useMediaQuery } from '@concave/ui'
import UserPositionCardMobile from 'components/Dashboard/Mobile/Components/UserPositionCard'
import DashboardMobile from 'components/Dashboard/Mobile/DashboardMobile'

import UserDashboardCard from 'components/Dashboard/UserDashboardCard'
import { useDashBoardState } from 'contracts/DashBoard/DashBoardState'
import React from 'react'
import { useEffect, useState } from 'react'
export default function Dashboard() {
  const [isLargerThan380] = useMediaQuery('(min-width: 380px)')
  const [isLargerThan850] = useMediaQuery('(min-width: 850px)')
  const [scale, setScale] = useState('scale(1)')
  const [defaultDisplay, setDefaultDisplay] = useState('flex')
  const [mobileDisplay, setMobileDisplay] = useState('none')

  useEffect(() => {
    setScale(isLargerThan380 ? 'scale(1)' : `scale(${window.innerWidth / 380})`)
  }, [isLargerThan380])

  useEffect(() => {
    function handleResize() {
      setScale(isLargerThan380 ? 'scale(1)' : `scale(${window.innerWidth / 380})`)
    }
    window.addEventListener('resize', handleResize)
  })

  useEffect(() => {
    setDefaultDisplay(isLargerThan850 ? 'flex' : 'none')
    setMobileDisplay(isLargerThan850 ? 'none' : 'flex')
  }, [isLargerThan850])
  const { userContracts, totalLocked, statusData } = useDashBoardState()

  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      {/* <DashboardMobile transform={scale} /> */}
      <Heading as="h1" mt={8} mb={3} fontSize="5xl">
        My Dashboard
      </Heading>
      <Flex my={3} justify={'center'} maxWidth={{ sm: '358px', lg: '1000px' }}>
        <Text textAlign="center">
          This is the user dashboard to claim divdends and manage your liquid NFT positions.
        </Text>
      </Flex>

      <Flex justify={'center'} position="relative">
        <UserDashboardCard
          statusData={statusData}
          totalLocked={totalLocked}
          userContracts={userContracts}
          display={defaultDisplay}
        />
        <DashboardMobile display={mobileDisplay} />
      </Flex>
    </Flex>
  )
}
