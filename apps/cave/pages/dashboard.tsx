import { Container, Flex, Heading, HStack, Stack, Text, useMediaQuery } from '@concave/ui'
import UserPositionCardMobile from 'components/Dashboard/Mobile/Components/UserPositionCard'
import DashboardMobile from 'components/Dashboard/Mobile/DashboardMobile'

import UserDashboardCard from 'components/Dashboard/UserDashboardCard'
import { useDashBoardState } from 'contracts/DashBoard/DashBoardState'
import React from 'react'
import { useEffect, useState } from 'react'
export default function Dashboard() {
  const [isLargerThan350] = useMediaQuery('(min-width: 350px)')
  const [isLargerThan850] = useMediaQuery('(min-width: 850px)')
  const [scale, setScale] = useState('scale(1)')
  const [defaultDisplay, setDefaultDisplay] = useState('none')
  const [mobileDisplay, setMobileDisplay] = useState('none')
  const [mobileScale, setMobileScale] = useState('')

  useEffect(() => {
    setDefaultDisplay(isLargerThan850 ? 'flex' : 'none')
    setMobileDisplay(isLargerThan850 ? 'none' : 'flex')
  }, [isLargerThan850])

  useEffect(() => {
    setMobileScale(isLargerThan350 ? '' : 'scale(0.8) translateY(-90px)')
  }, [isLargerThan350])

  const { userContracts, totalLocked, statusData } = useDashBoardState()
  return (
    <Flex
      transform={mobileScale}
      align={'center'}
      justify="start"
      direction={'column'}
      width={'full'}
      textAlign="center"
    >
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
          statusdata={statusData}
          totallocked={totalLocked}
          usercontract={userContracts}
          display={defaultDisplay}
        />
        <DashboardMobile
          statusdata={statusData}
          totallocked={totalLocked}
          usercontract={userContracts}
          display={mobileDisplay}
        />
      </Flex>
    </Flex>
  )
}
