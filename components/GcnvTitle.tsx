import { Box, Heading, Text } from '@chakra-ui/react'

function GcnvTitle({ title, description }) {
  return (
    <Box mt={12}>
      <Heading as="h1">{title}</Heading>
      <Text maxW={520}>{description}</Text>
    </Box>
  )
}

export default GcnvTitle
