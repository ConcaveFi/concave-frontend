import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import React, { ReactNode } from 'react'
import { SelectCurrency } from './SelectCurrency'

export function TokenInput<T extends Currency>({
  children,
  currency,
  currencyAmount,
  disabled = false,
  onChangeValue,
  onSelectCurrency,
}: {
  children: ReactNode
  currency: T
  currencyAmount: CurrencyAmount<T>
  disabled?: boolean
  onChangeValue: (value: string) => void
  onSelectCurrency: (token: T) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          decimalScale={5}
          disabled={disabled}
          w="100%"
          value={currencyAmount?.toSignificant(6) || ''}
          onValueChange={({ value }, { source }) => source === 'event' && onChangeValue(value)}
        />
        <SelectCurrency onSelect={onSelectCurrency} selected={currency} />
      </HStack>
      {children}
    </Stack>
  )
}
