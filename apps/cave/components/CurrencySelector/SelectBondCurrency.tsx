import { Currency } from '@concave/gemswap-sdk'
import React from 'react'
import { CurrencySelector } from './CurrencySelector'

export const SelectBondCurrency = ({
  selected,
  onSelect,
}: {
  selected?: Currency
  onSelect: (token: Currency) => void
}) => {
  return <CurrencySelector selected={selected} onSelect={onSelect} />
}
