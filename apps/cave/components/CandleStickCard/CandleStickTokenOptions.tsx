import { TokenIcon } from '@concave/icons'
import { HStack, Text } from '@concave/ui'
import { TokenType } from 'lib/tokens'
import React from 'react'

export const CandleStickTokenOptions = ({ from, to }: { from: TokenType; to: TokenType }) => {
  return (
    <HStack p={2} borderRadius="2xl" shadow="Down Big">
      <TokenIcon size="30px" {...from} />
      <Text>{from.symbol.toUpperCase()} /</Text>
      <TokenIcon size="30px" {...to} />
      <Text paddingRight={1}>{from.symbol.toUpperCase()}</Text>
    </HStack>
  )
}
