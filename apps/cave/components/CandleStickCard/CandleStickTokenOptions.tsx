import { HStack, Text } from '@chakra-ui/react'
import { TokenIcon } from '@concave/icons'
import React from 'react'

export const CandleStickTokenOptions = ({ from, to }: { from: string; to: string }) => {
  return (
    <HStack p={1} pr={2} pl={2} height={'40px'} borderRadius="3xl" shadow={'low'}>
      <TokenIcon size="30px" tokenName={from} />
      <Text>{from} /</Text>
      <TokenIcon size="30px" tokenName={to} />
      <Text paddingRight={1}>{to}</Text>
    </HStack>
  )
}
