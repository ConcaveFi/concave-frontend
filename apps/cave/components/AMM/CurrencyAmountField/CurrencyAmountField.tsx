import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import { SelectCurrency } from '../SelectCurrency'
import { parseAmount } from '../utils/parseAmount'

export function CurrencyAmountField({
  children,
  currencyAmount,
  disabled = false,
  onChangeAmount,
}: {
  children?: ReactNode
  currencyAmount: CurrencyAmount<Currency>
  disabled?: boolean
  onChangeAmount: (value: CurrencyAmount<Currency>) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  const [internalValue, setInternalValue] = useState('')

  const isFocused = useRef(false)
  useEffect(() => {
    if (!isFocused.current) setInternalValue(currencyAmount.toSignificant(6))
  }, [currencyAmount])

  // useDebounce(() => isFocused.current && onChangeAmount(internalAmount), 300, [
  //   internalAmount?.serialize(),
  // ])

  const handleChange = ({ value }, { source }) => {
    if (source === 'prop') return // if the value changed from props, ignore it, only update on user typing
    setInternalValue(value)
    onChangeAmount(parseAmount(value, currencyAmount.currency))
  }

  const onSelectCurrency = (newCurrency: Currency) => {
    onChangeAmount(parseAmount(internalValue, newCurrency))
  }

  const inputValue = isFocused.current
    ? internalValue || ''
    : currencyAmount.equalTo(0)
    ? ''
    : currencyAmount?.toSignificant(6)

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
        <SelectCurrency onSelect={onSelectCurrency} selected={currencyAmount?.currency} />
      </HStack>
      {children}
    </Stack>
  )
}
