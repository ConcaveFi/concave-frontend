import { Card, Flex, Heading, Text } from '@concave/ui'

// TODO: Find way of notificating devs lol
const ErrorPage = () => {
  return (
    <Flex justify="center" align="center" w="100%">
      <Card variant="secondary" p={6} gap={2} textAlign="center">
        <Heading fontSize="xl">Something went wrong</Heading>
        <Text fontWeight="semibold" color="text.low">
          Devs already got notified
        </Text>
      </Card>
    </Flex>
  )
}

export default ErrorPage
