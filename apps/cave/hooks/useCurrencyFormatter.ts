import { useMemo } from 'react'

const makeCurrencyFormat = (language, currency) =>
  new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export function useCurrencyFormatter() {
  // grab language and prefered currency based on user preferences
  return useMemo(() => makeCurrencyFormat('en-US', 'USD'), [])
}
