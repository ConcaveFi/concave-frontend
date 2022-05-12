import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { CurrencySelectorComponent } from 'components/CurrencySelector/CurrencySelector'
import React, { ReactNode, useCallback, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import { toAmount } from 'utils/toAmount'

export function CurrencyAmountField({
  children,
  currencyAmount,
  disabled = false,
  onChangeAmount,
  debounce = 150,
  CurrencySelector,
}: {
  children?: ReactNode
  currencyAmount: CurrencyAmount<Currency>
  disabled?: boolean
  onChangeAmount: (value: CurrencyAmount<Currency>) => void
  debounce?: number
  CurrencySelector: CurrencySelectorComponent
  disableCurrencySelector?: boolean
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  const [internalValue, setInternalValue] = useState('')

  const isFocused = useRef(false)

  useDebounce(
    () => isFocused.current && onChangeAmount(toAmount(internalValue, currencyAmount.currency)),
    debounce,
    [internalValue],
  )

  const handleChange = useCallback(
    ({ value }, { source }) => {
      if (source === 'prop') return // if the value changed from props, ignore it, only update on user typing
      if (value === '') onChangeAmount(toAmount('0', currencyAmount.currency))
      setInternalValue(value)
    },
    [currencyAmount?.currency, onChangeAmount],
  )

  const onSelectCurrency = useCallback(
    (newCurrency: Currency) => onChangeAmount(toAmount(internalValue, newCurrency)),
    [internalValue, onChangeAmount],
  )

  const inputValue = isFocused.current ? internalValue : +currencyAmount?.toSignificant(8) || ''

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          disabled={disabled}
          w="100%"
          onFocus={() => (isFocused.current = true)}
          onBlur={() => (isFocused.current = false)}
          value={inputValue}
          onValueChange={handleChange}
        />
        <CurrencySelector onSelect={onSelectCurrency} selected={currencyAmount?.currency} />
      </HStack>
      <Stack onClick={() => (isFocused.current = false)}>{children}</Stack>
    </Stack>
  )
}
