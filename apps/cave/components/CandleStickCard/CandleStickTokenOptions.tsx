import { HStack, Text } from '@concave/ui'
import { TokenIcon } from '@concave/icons'
import React from 'react'

export const CandleStickTokenOptions = ({ from, to }: { from: string; to: string }) => {
  return (
    <HStack p={2} borderRadius="3xl" shadow="Down Big">
      <TokenIcon size="30px" tokenName={from} />
      <Text>{from} /</Text>
      <TokenIcon size="30px" tokenName={to} />
      <Text paddingRight={1}>{to}</Text>
    </HStack>
  )
}
