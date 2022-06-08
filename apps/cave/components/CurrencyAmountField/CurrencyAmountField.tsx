import { Currency, CurrencyAmount } from '@concave/core'
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

  const [internalValue, setInternalValue] = useState<number | string>('')

  const isFocused = useRef(false)

  useDebounce(
    () =>
      isFocused.current &&
      currencyAmount &&
      onChangeAmount(toAmount(internalValue, currencyAmount.currency)),
    debounce,
    [internalValue],
  )

  const handleChange = useCallback(
    ({ value }, { source }) => {
      if (source === 'prop') return // if the value changed from props, ignore it, only update on user typing
      isFocused.current = true
      if (value === '' && currencyAmount?.currency)
        onChangeAmount(toAmount('0', currencyAmount.currency))
      setInternalValue(value)
    },
    [currencyAmount?.currency, onChangeAmount],
  )

  /* inputValue:
    if the input is focused use it's internal value, as the currencyAmount value is being debounced
    if the amount is 0 and it's not focused, instead of showing a zero, show the input placeholder 
    (whitch is zero but in another color lol)
  */
  const inputValue = isFocused.current
    ? internalValue
    : currencyAmount.greaterThan(0)
    ? currencyAmount?.toSignificant(8)
    : ''

  const onSelectCurrency = useCallback(
    (newCurrency: Currency) => onChangeAmount(toAmount(inputValue, newCurrency)),
    [inputValue, onChangeAmount],
  )

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          fontSize={{ base: 'lg', md: '2xl' }}
          disabled={disabled}
          w="100%"
          onBlur={() => {
            /* isFocused is only set to true when user actually type in the field (probably deserves a rename)
               if so, don't wait for debounce, sync values on blur */
            // if (isFocused.current) onChangeAmount(toAmount(inputValue, currencyAmount?.currency))
            isFocused.current = false
          }}
          value={inputValue}
          onValueChange={handleChange}
        />
        <CurrencySelector onSelect={onSelectCurrency} selected={currencyAmount?.currency} />
      </HStack>
      <Stack onClick={() => (isFocused.current = false)}>{children}</Stack>
    </Stack>
  )
}
