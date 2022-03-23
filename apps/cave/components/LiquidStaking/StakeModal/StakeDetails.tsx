import { Box, HStack, Stack, Text } from '@concave/ui'
import React from 'react'

function StakeDetails(props) {
  return (
    <Box
      shadow="down"
      px={10}
      py={5}
      borderRadius="3xl"
      filter="drop-shadow(0px 0px 27px #81b3ff4f)"
      w="350px"
    >
      <HStack justify="space-between">
        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            CNV Price:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            $ 1,000
          </Text>
        </Box>
        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            Redeem Date:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            23-09-2023
          </Text>
        </Box>
      </HStack>
      <HStack mt={5} justify="space-between">
        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            CNV Price:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            $ 1,000
          </Text>
        </Box>
        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            Redeem Date:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            23-09-2023
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default StakeDetails
