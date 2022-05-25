import { Card, Flex, Heading } from '@concave/ui'

const NotFoundPage = () => {
  return (
    <Flex justify="center" align="center" w="100%">
      <Card variant="secondary" p={6} gap={4} textAlign="center">
        <Heading fontSize="2xl">Page not found</Heading>
      </Card>
    </Flex>
  )
}

export default NotFoundPage
