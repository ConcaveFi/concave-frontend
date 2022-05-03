import { Container, Flex, Heading, HStack, Stack, Text } from '@concave/ui'

import UserDashboardCard from 'components/Dashboard/UserDashboardCard'
export default function Dashboard() {
  return (
    <Container maxW="container.lg" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        My Dashboard
      </Heading>
      <HStack mt={8} spacing={14} flex=" 1" justify={'center'}>
        <Text textAlign="center">
          This is the user dashboard to claim divdends and manage your liquid NFT positions.
        </Text>
      </HStack>

      <Flex mr="6" justify={' center'} gap={8} position="relative" mt={6}>
        <UserDashboardCard />
      </Flex>
    </Container>
  )
}
