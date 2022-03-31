import { FlexProps, NumericInput, HStack, Stack, useMultiStyleConfig, Text } from '@concave/ui'
import { Currency, Token } from '@uniswap/sdk-core'
import React from 'react'
import { MaxAmount } from './MaxAmount'
import { twoDecimals } from './SwapCard'
import { TokenSelect } from './TokenSelect'

export function TokenInput({
  value,
  currency,
  stableValue,
  balance,
  onChangeValue,
  onChangeCurrency,
}: {
  value: string
  currency?: Currency
  stableValue: string | number
  balance: string
  onChangeValue: (value: string) => void
  onChangeCurrency: (token: Currency) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  return (
    <HStack sx={{ ...styles.field, bg: 'none' }} align="start" spacing={1}>
      <Stack h="100%" justify="space-between" align="start" spacing={0}>
        <NumericInput
          decimalScale={5}
          w="100%"
          value={value}
          onValueChange={({ value }, eventSrc) =>
            eventSrc.source === 'event' && onChangeValue(value)
          }
        />
        <Text isTruncated maxW="100px" fontWeight="bold" color="text.low" fontSize="sm">
          {!!-stableValue && `$${twoDecimals(stableValue.toString())}`}
        </Text>
      </Stack>
      <Stack spacing={0} justify="space-between" h="100%">
        <TokenSelect onSelect={onChangeCurrency} selected={currency} />
        {balance && <MaxAmount label="Balance:" max={balance} onClick={() => null} />}
      </Stack>
    </HStack>
  )
}
