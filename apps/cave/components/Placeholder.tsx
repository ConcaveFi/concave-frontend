import { Box, Flex, Text } from '@concave/ui'
import Lottie from 'react-lottie'


function Placeholder({ text, description }) {
  return (
    <Box
      mt={16}
      borderStyle="dashed"
      borderWidth={2}
      borderColor="#84E2FF"
      borderRadius="3xl"
      py={16}
      w="100%"
      maxW="500px"
    >
      <Box textAlign="center">
        <Text color="text.low" fontSize="4xl" fontWeight="bold">
          {text} <br />
          {description}
        </Text>
        <Flex justifyContent="center">
          <Box borderRadius="30px" overflow="hidden">
          </Box>
          {/* <Image src="/assets/concave/concaveLogo.gif" alt="concave-logo" h={28} w={28} /> */}
        </Flex>
      </Box>
    </Box>
  )
}

export default Placeholder
