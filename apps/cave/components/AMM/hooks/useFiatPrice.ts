import { DAI, CurrencyAmount, Currency } from 'gemswap-sdk'
import { useMemo } from 'react'
import { usePrice } from './usePrice'

export const useFiatPrice = (currency?: Currency) => {
  // using dai for now, but we can change based on user preferences later
  // e.g. use some stable pegged to EUR
  const stablecoin = DAI[currency?.chainId]

  return usePrice(currency, stablecoin)
}

export const useFiatValue = (currencyAmount?: CurrencyAmount<Currency>) => {
  const fiatPrice = useFiatPrice(currencyAmount?.currency.wrapped)
  return useMemo(() => {
    if (!fiatPrice.price) return { value: undefined, ...fiatPrice }
    return { value: fiatPrice.price.quote(currencyAmount.wrapped), ...fiatPrice }
  }, [currencyAmount, fiatPrice])
}
