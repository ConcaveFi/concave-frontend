import { Price, DAI, CurrencyAmount, Currency, TradeType } from 'gemswap-sdk'
import { useMemo } from 'react'
import { useTrade } from './useTrade'

export const useFiatPrice = (currency?: Currency) => {
  // using dai for now, but we can change based on user preferences later
  // e.g. use some stable pegged to EUR
  const stablecoin = DAI[currency?.chainId || 1]

  // The amount is large enough to filter low liquidity pairs.
  const amountOut = CurrencyAmount.fromRawAmount(stablecoin, 50_000) // +`50000e${stablecoin.decimals}`

  const { trade, isLoading, isError, isSuccess, isRefetching } = useTrade(amountOut, currency, {
    maxHops: 2,
    tradeType: TradeType.EXACT_OUTPUT,
  })

  return useMemo(() => {
    const status = { isLoading, isError, isSuccess, isRefetching }
    if (!currency) return { ...status, price: undefined }

    if (stablecoin.equals(currency))
      return { price: new Price(stablecoin, stablecoin, '1', '1'), ...status }

    if (!trade) return { ...status, price: undefined }

    const { numerator, denominator } = trade.route.midPrice
    return { price: new Price(currency, stablecoin, denominator, numerator), ...status }
  }, [currency, isError, isLoading, isRefetching, isSuccess, stablecoin, trade])
}

export const useFiatValue = (currencyAmount?: CurrencyAmount<Currency>) => {
  const fiatPrice = useFiatPrice(currencyAmount?.currency)
  return useMemo(() => {
    if (!fiatPrice.isSuccess) return { value: undefined, ...fiatPrice }
    return { value: fiatPrice.price.quote(currencyAmount), ...fiatPrice }
  }, [currencyAmount, fiatPrice])
}
