import React from 'react'
import { Container, Flex, Heading, HStack, Stack, Text } from '@concave/ui'

import MarketplaceSearchCard from 'components/Marketplace/MarketplaceSearchCard'
import UserDashboardCard from 'components/Dashboard/UserDashboardCard'

const dashboard = () => {
  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        My Dashboard
      </Heading>
      
        <Text maxW={520} textAlign="center">
          This is the user dashboard to claim divdends and manage your liquid NFT positions.
        </Text>
    
      <Flex mr="6" gap={8} position="relative" mt={16}>
        <UserDashboardCard />
      </Flex>
    </Container>
  )
}

export default dashboard
