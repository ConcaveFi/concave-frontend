import { Box, Flex, HStack, Text } from '@concave/ui'

export const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack justifyContent={'center'} width={'full'}>
      <Text textColor={'text.low'} textAlign={'right'} fontWeight="bold" width={'full'}>
        {label}
      </Text>

      <Box width={'full'}>
        <Flex width={'full'} borderRadius={'full'} p={1} pl={4} align="center" fontWeight="bold">
          {value}
        </Flex>
      </Box>
    </HStack>
  )
}
