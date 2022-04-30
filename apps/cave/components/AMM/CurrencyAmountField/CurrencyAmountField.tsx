import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import React, { ReactNode, useRef, useState } from 'react'
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

  const [internalAmount, setInternalAmount] = useState<CurrencyAmount<Currency>>(currencyAmount)

  const isFocused = useRef(false)

  if (!isFocused.current && currencyAmount?.serialize() !== internalAmount?.serialize())
    setInternalAmount(currencyAmount)

  useDebounce(() => isFocused.current && onChangeAmount(internalAmount), 300, [
    internalAmount?.serialize(),
  ])

  const handleChange = ({ value: _value }, { source }) => {
    if (source === 'prop') return // if the value changed from props, ignore it, only update on user typing
    if (!_value) onChangeAmount(parseAmount('0', internalAmount.currency)) // clear all inputs instantly on empty input (don't wait for debounce)
    setInternalAmount(parseAmount(_value, internalAmount.currency))
  }

  const onSelectCurrency = (newCurrency: Currency) => {
    onChangeAmount(parseAmount(internalAmount?.quotient.toString() || '0', newCurrency))
  }

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          decimalScale={5}
          disabled={disabled}
          w="100%"
          onFocus={() => (isFocused.current = true)}
          onBlur={() => (isFocused.current = false)}
          value={!internalAmount?.equalTo(0) ? internalAmount?.toSignificant(12) : ''}
          onValueChange={handleChange}
        />
        <SelectCurrency onSelect={onSelectCurrency} selected={internalAmount?.currency} />
      </HStack>
      {children}
    </Stack>
  )
}
