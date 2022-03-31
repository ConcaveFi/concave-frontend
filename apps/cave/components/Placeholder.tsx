import { Box, Center, Flex, Image, Stack, Text } from '@concave/ui'
import React from 'react'

function Placeholder({ text }) {
  return (
    <Box
      mt={16}
      borderStyle="dashed"
      borderWidth={2}
      borderColor="#84E2FF"
      px={20}
      py={16}
      w="max-content"
    >
      <Box textAlign="center">
        <Text color="text.low" fontSize="4xl" fontWeight="bold">
          {text} <br />
          Coming Soon
        </Text>
        <Flex justifyContent="center">
          <Image src="/assets/concave/concaveLogo.gif" h={28} w={28} />
        </Flex>
      </Box>
    </Box>
  )
}

export default Placeholder
