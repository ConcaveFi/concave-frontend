import { Container, Flex, Heading, HStack, Stack, Text } from '@concave/ui'
import DashboardMobile from 'components/Dashboard/Mobile/DashboardMobile'

import UserDashboardCard from 'components/Dashboard/UserDashboardCard'
export default function Dashboard() {
  return (
    // <DashboardMobile />
    <Flex
      align={'center'}
      justify="start"
      border="solid 2px white"
      direction={'column'}
      width={'full'}
      maxW="container.lg"
      textAlign="center"
    >
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        My Dashboard
      </Heading>
      <Flex my={8} flex=" 1" justify={'center'} maxHeight="20px">
        <Text textAlign="center">
          This is the user dashboard to claim divdends and manage your liquid NFT positions.
        </Text>
      </Flex>

      <Flex justify={' center'} gap={8} position="relative" mt={6}>
        <UserDashboardCard />
      </Flex>
    </Flex>
  )
}
