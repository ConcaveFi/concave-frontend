import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import React, { ReactNode, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import { SelectCurrency } from './SelectCurrency'
import { parseInputAmount } from './utils/parseInputAmount'

export function TokenInput<T extends Currency>({
  children,
  currency,
  currencyAmount,
  disabled = false,
  onChangeAmount,
  onSelectCurrency,
}: {
  children: ReactNode
  currency: T
  currencyAmount: CurrencyAmount<T>
  disabled?: boolean
  onChangeAmount: (value: CurrencyAmount<T>) => void
  onSelectCurrency: (token: T) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  const isInputFocused = useRef(false)

  const [internalAmount, setInternalAmount] = useState<CurrencyAmount<T>>()

  useDebounce(() => isInputFocused.current && onChangeAmount(internalAmount), 300, [internalAmount])

  const handleChange = ({ value }, { source }) => {
    if (source === 'prop') return // if the value changed from props, ignore it, only update on user typing
    if (!value) onChangeAmount(null) // clear all inputs instantly on empty input (don't wait for debounce)
    setInternalAmount(parseInputAmount(value, currency) || null)
  }

  const value = isInputFocused.current
    ? internalAmount === null
      ? ''
      : internalAmount?.toSignificant(6) || ''
    : currencyAmount?.toSignificant(6) || ''

  const onFocus = () => {
    isInputFocused.current = true
    if (currencyAmount) setInternalAmount(currencyAmount)
  }

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          decimalScale={5}
          disabled={disabled}
          w="100%"
          onFocus={onFocus}
          onBlur={() => (isInputFocused.current = false)}
          value={value}
          onValueChange={handleChange}
        />
        <SelectCurrency onSelect={onSelectCurrency} selected={currency} />
      </HStack>
      {children}
    </Stack>
  )
}
