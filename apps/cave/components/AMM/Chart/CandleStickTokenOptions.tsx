import { Currency } from '@concave/gemswap-sdk'
import { HStack, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import React from 'react'

export const CandleStickTokenOptions = ({ from, to }: { from: Currency; to: Currency }) => {
  return (
    <HStack p={2} borderRadius="2xl" shadow="Down Big">
      <CurrencyIcon size="sm" currency={from} />
      <Text>{from?.symbol.toUpperCase()} /</Text>
      <CurrencyIcon size="sm" currency={to} />
      <Text paddingRight={1}>{to?.symbol?.toUpperCase()}</Text>
    </HStack>
  )
}
