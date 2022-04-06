import { HStack, Text, CurrencyIcon } from '@concave/ui'
import { TokenType } from 'lib/tokens'
import React from 'react'

export const CandleStickTokenOptions = ({ from, to }: { from: TokenType; to: TokenType }) => {
  console.log(from, to)
  return (
    <HStack p={2} borderRadius="2xl" shadow="Down Big">
      <CurrencyIcon size="sm" {...(from || {})} />
      <Text>{from?.symbol.toUpperCase()} /</Text>
      <CurrencyIcon size="sm" {...(to || {})} />
      <Text paddingRight={1}>{to?.symbol?.toUpperCase()}</Text>
    </HStack>
  )
}
