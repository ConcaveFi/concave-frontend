import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { Currency } from '@uniswap/sdk-core'
import React from 'react'
import { TokenSelect } from './TokenSelect'

export function TokenInput({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
}: {
  children: React.ReactNode
  value: string
  currency?: Currency
  onChangeValue: (value: string) => void
  onChangeCurrency: (token: Currency) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} align="start" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          decimalScale={5}
          w="100%"
          value={value}
          onValueChange={({ value }, eventSrc) =>
            eventSrc.source === 'event' && onChangeValue(value)
          }
        />
        <TokenSelect onSelect={onChangeCurrency} selected={currency} />
      </HStack>
      {children}
    </Stack>
  )
}
