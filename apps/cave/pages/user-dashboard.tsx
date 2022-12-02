import { Container, Flex, Heading, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { UserDashboardContainer } from 'components/UserDashboard/UserDashboardContainer'

const UserDashboard = () => (
  <Container maxW={{ base: '60ch', sm: 'container.sm', lg: '100%' }} centerContent>
    <Flex align={'center'} w={'100%'} h={'100%'} gap={4} textAlign="center" direction="column">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        Management Dashboard
      </Heading>
      <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
        <Text maxW={620} textAlign={'center'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin, est id
          euismod aliquet, erat magna aliquet turpis, sed blandit purus dolor nec velit. Integer
          iaculis justo fringilla sem gravida dignissim sed sed dui.
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
