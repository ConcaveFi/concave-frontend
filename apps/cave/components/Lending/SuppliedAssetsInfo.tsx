import { Flex, Stack, Text } from '@concave/ui'

const YourSuppAssets = ({ balance }) => (
  <Flex
    align="center"
    borderRadius="full"
    py={1}
    px={3}
    bgColor="whiteAlpha.50"
    gap={1}
    fontSize={24}
    textColor="white.700"
    whiteSpace="nowrap"
  >
    {balance}
    <Text textColor={'text.highlight'}></Text>
  </Flex>
)

export function FromInput() {
  return (
    <Flex direction="column" gap={1} px={5}>
      <Text textColor="white.3" fontWeight={700}>
        Your Supplied Assets
      </Text>
      <Stack align="left">
        <YourSuppAssets balance="$2.402.83" />
      </Stack>
    </Flex>
  )
}

export function ToInput() {
  return (
    <Flex direction="column" gap={1} px={5}>
      <Text textColor={'white.500'} fontWeight={600}>
        Asset APY Reward APY Balance Collateral
      </Text>
      <Stack align="left" fontWeight={600}>
        <Text fontSize={14}>Dola --- 7.98% --- 28.92% --- 4.01</Text>
      </Stack>
    </Flex>
  )
}
