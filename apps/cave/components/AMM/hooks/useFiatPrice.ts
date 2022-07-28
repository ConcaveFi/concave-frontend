import { Currency, CurrencyAmount, DAI } from '@concave/core'
import { useMemo } from 'react'
import { usePrice } from './usePrice'

export const useFiatPrice = (currency?: Currency) => {
  // using dai for now, but we can change based on user preferences later
  // e.g. use some stable pegged to EUR
  const stablecoin = DAI[currency?.chainId]

  const price = usePrice(currency, stablecoin)
  return { ...price, stablecoin }
}

export const useFiatValue = (currencyAmount?: CurrencyAmount<Currency>) => {
  const fiatPrice = useFiatPrice(currencyAmount?.currency.wrapped)
  return useMemo(() => {
    if (!fiatPrice.price || !fiatPrice.price.baseCurrency.equals(currencyAmount.currency.wrapped))
      return { value: undefined, ...fiatPrice }

    if (fiatPrice) return { value: fiatPrice.price.quote(currencyAmount.wrapped), ...fiatPrice }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyAmount?.serialize(), fiatPrice.price])
}
