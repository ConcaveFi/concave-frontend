import { Container, Flex, Heading, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { UserDashboardContainer } from 'components/UserDashboard/UserDashboardContainer'
const UserDashboard = () => (
  <Container maxW={{ base: '60ch', sm: 'container.sm', lg: 'container.lg' }} p={0} centerContent>
    <Flex align={'center'} w={'100%'} h={'100%'} gap={4} textAlign="center" direction="column">
      <Heading
        mt={16}
        mb={3}
        fontSize="5xl"
        apply={'background.text-brightBlue'}
        fontWeight="semibold"
      >
        Management Dashboard
      </Heading>
      <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
        <Text apply="background.text-brightBlue" maxW={620} textAlign={'center'}>
          The User Dashboard is all of your currently connected wallet positions in one place to be
          managed and claimed.
        </Text>
      </Flex>
      <UserDashboardContainer />
    </Flex>
  </Container>
)

UserDashboard.Meta = {
  title: 'Concave | Management Dashboard',
  description: ``,
}

export default withPageTransition(UserDashboard)
