import { Box, Button, SimpleGrid, Text } from '@concave/ui'
import React from 'react'

function StakeDetails(props: any) {
  return (
    <Box
      shadow="down"
      py={5}
      borderRadius="3xl"
      filter="drop-shadow(0px 0px 27px #81b3ff4f)"
      w="350px"
    >
      <SimpleGrid px={6} columns={2} spacingX={6} spacingY={5}>
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

        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            Deposited CNV:
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            0.9 CVN
          </Text>
        </Box>
        <Box>
          <Text color="text.low" fontSize="md" fontWeight="bold">
            {props.vaprText}
          </Text>
          <Text textAlign="left" fontSize="lg" fontWeight="bold">
            {props.vapr}%
          </Text>
        </Box>
      </SimpleGrid>

      <Box px={3}>
        <Button
          mt={5}
          //   onClick={}
          fontWeight="bold"
          fontSize="md"
          variant="primary.outline"
          bgGradient="linear(90deg, #72639B 0%, #44B9DE 100%)"
          w="100%"
          h="40px"
          size="large"
          mx="auto"
        >
          Stake CNV
        </Button>
      </Box>
    </Box>
  )
}

export default StakeDetails
