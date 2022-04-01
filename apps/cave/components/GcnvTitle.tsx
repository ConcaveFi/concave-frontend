import { Box, Heading, Text } from '@concave/ui'

function GcnvTitle({ title, description }) {
  return (
    <Box mt={24}>
      <Heading as="h1" mb={3} fontSize="5xl">
        {title}
      </Heading>
      <Text maxW={520}>{description}</Text>
    </Box>
  )
}

export default GcnvTitle
