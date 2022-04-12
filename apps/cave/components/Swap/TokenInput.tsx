import {
  Button,
  FlexProps,
  HStack,
  NumericInput,
  Stack,
  Text,
  useMultiStyleConfig,
} from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import React, { ReactNode } from 'react'
import { SelectCurrency } from './SelectCurrency'

export function TokenInput({
  children,
  currency,
  currencyAmount,
  disabled = false,
  onChangeValue,
  onSelectCurrency,
}: {
  children: ReactNode
  currency: Currency
  currencyAmount: CurrencyAmount<Currency>
  disabled?: boolean
  onChangeValue: (value: string) => void
  onSelectCurrency: (token: Currency) => void
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
