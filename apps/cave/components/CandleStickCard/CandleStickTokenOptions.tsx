import { HStack, Text, TokenIcon } from '@concave/ui'
import { Currency } from 'gemswap-sdk'
import React from 'react'

export const CandleStickTokenOptions = ({ from, to }: { from: Currency; to: Currency }) => {
  console.log(from, to)
  return (
    <HStack p={2} borderRadius="2xl" shadow="Down Big">
      <TokenIcon size="sm" {...(from || {})} />
      <Text>{from?.symbol.toUpperCase()} /</Text>
      <TokenIcon size="sm" {...(to || {})} />
      <Text paddingRight={1}>{to?.symbol?.toUpperCase()}</Text>
    </HStack>
  )
}
