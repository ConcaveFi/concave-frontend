import { Stack, StackProps, Text } from '@concave/ui'

export const WhatConnectWalletMeans = (props: StackProps) => (
  <Stack textAlign="center" alignSelf="center" fontSize="sm" {...props}>
    <Text color="text.low" fontWeight="medium" w="320px">
      Connecting your wallet means the app can see your address and ask for signatures
    </Text>
    <Text color="text.low" opacity={0.6} fontWeight="medium" w="320px">
      {`Don't`} worry no funds can be transfered without your explicit concent
    </Text>
  </Stack>
)
