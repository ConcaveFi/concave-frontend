import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { CurrencySelectorComponent } from 'components/CurrencySelector/CurrencySelector'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import React, { ReactNode, useEffect, useRef, useState, FC } from 'react'
import { useDebounce } from 'react-use'
import { toAmount } from '../../utils/toAmount'

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
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  const [internalValue, setInternalValue] = useState('')

  const isFocused = useRef(false)
  useEffect(() => {
    if (!isFocused.current) setInternalValue(currencyAmount?.toExact())
  }, [currencyAmount])

  useDebounce(
    () => isFocused.current && onChangeAmount(toAmount(internalValue, currencyAmount.currency)),
    debounce,
    [internalValue],
  )

  const handleChange = ({ value }, { source }) => {
    if (source === 'prop') return // if the value changed from props, ignore it, only update on user typing
    setInternalValue(value)
    onChangeAmount(toAmount(value, currencyAmount.currency))
  }

  const onSelectCurrency = (newCurrency: Currency) => {
    onChangeAmount(toAmount(internalValue, newCurrency))
  }

  const inputValue = isFocused.current
    ? internalValue || ''
    : currencyAmount?.greaterThan(0)
    ? currencyAmount.toExact()
    : ''

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          decimalScale={5}
          disabled={disabled}
          w="100%"
          onFocus={() => (isFocused.current = true)}
          onBlur={() => (isFocused.current = false)}
          value={inputValue}
          onValueChange={handleChange}
        />
        <CurrencySelector onSelect={onSelectCurrency} selected={currencyAmount?.currency} />
      </HStack>
      {children}
    </Stack>
  )
}
