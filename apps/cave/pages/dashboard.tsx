import { Container, Flex, Heading, HStack, Stack, Text, useMediaQuery } from '@concave/ui'
import DashboardMobile from 'components/Dashboard/Mobile/DashboardMobile'

import UserDashboardCard from 'components/Dashboard/UserDashboardCard'
import React from 'react'
import { useEffect, useState } from 'react'
import { setCommentRange } from 'typescript'
export default function Dashboard() {
  const [isLargerThan380] = useMediaQuery('(min-width: 380px)')
  const [isLargerThan980] = useMediaQuery('(min-width: 980px)')
  const [scale, setScale] = useState('scale(1)')

  const [userDashLayout, setUserDashLayout] = useState(<UserDashboardCard />)

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
    setUserDashLayout(isLargerThan980 ? <UserDashboardCard /> : <DashboardMobile />)
  }, [isLargerThan980])

  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        My Dashboard
      </Heading>
      <Flex my={3} justify={'center'} maxWidth={{ sm: '358px', lg: '1000px' }}>
        <Text textAlign="center">
          This is the user dashboard to claim divdends and manage your liquid NFT positions.
        </Text>
      </Flex>
      {/* <DashboardMobile transform={scale} /> */}

      <Flex justify={' center'} gap={8} position="relative" mt={6}>
        {userDashLayout}
      </Flex>
    </Flex>
  )
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}
