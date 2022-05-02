import React from 'react'
import { Container, Flex, Heading, HStack, Stack, Text } from '@concave/ui'
import Placeholder from 'components/Placeholder'


const comingsoon = () => {
  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
      </Heading>
      <HStack mt={8} spacing={14}>
        <Text maxW={520} textAlign="center">
        </Text>
      </HStack>

      <Flex mr="6" gap={8} position="relative" mt={16}>
        <Placeholder text="Coming" description="Soon"/>
      </Flex>
    </Container>
  )
}

export default comingsoon
