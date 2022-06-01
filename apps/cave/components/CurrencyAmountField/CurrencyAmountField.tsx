import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { CurrencySelectorComponent } from 'components/CurrencySelector/CurrencySelector'
import React, { ReactNode, useCallback } from 'react'
import { toAmount } from 'utils/toAmount'

export function CurrencyAmountField({
  children,
  currencyAmount,
  disabled = false,
  onChangeAmount,
  CurrencySelector,
}: {
  children?: ReactNode
  currencyAmount: CurrencyAmount<Currency>
  disabled?: boolean
  onChangeAmount: (value: CurrencyAmount<Currency>) => void
  CurrencySelector: CurrencySelectorComponent
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  const handleChange = useCallback(
    ({ value }, { source }) => {
      if (source === 'prop') return // if the value changed from props, ignore it, only update on user typing
      onChangeAmount(toAmount(value, currencyAmount.currency))
    },
    [currencyAmount?.currency, onChangeAmount],
  )

  const onSelectCurrency = useCallback(
    (newCurrency: Currency) => onChangeAmount(toAmount(currencyAmount?.toExact(), newCurrency)),
    [currencyAmount, onChangeAmount],
  )

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          fontSize={{ base: 'lg', md: '2xl' }}
          disabled={disabled}
          w="100%"
          value={+currencyAmount?.toSignificant(8) || ''}
          onValueChange={handleChange}
        />
        <CurrencySelector onSelect={onSelectCurrency} selected={currencyAmount?.currency} />
      </HStack>
      <Stack>{children}</Stack>
    </Stack>
  )
}
