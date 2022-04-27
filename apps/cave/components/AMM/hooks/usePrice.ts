import { Price, Currency, TradeType, CurrencyAmount } from 'gemswap-sdk'
import { useMemo } from 'react'
import { useTrade } from './useTrade'

// return price of currencyIn relative to currencyOut
export const usePrice = (currencyIn?: Currency, currencyOut?: Currency) => {
  const {
    data: price,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    error,
  } = useTrade(
    // amount large enough to filter low liquidity pairs.
    currencyOut && CurrencyAmount.fromRawAmount(currencyOut, 50_000),
    currencyIn,
    { maxHops: 3, tradeType: TradeType.EXACT_OUTPUT },
    { select: (trade) => trade.route.midPrice },
  )

  return useMemo(() => {
    if (currencyIn?.equals(currencyOut))
      return {
        price: new Price(currencyIn, currencyIn, '1', '1'),
        isLoading: false,
        isError: false,
        isFetching: false,
        isSuccess: true,
      }

    return { price, error, isLoading, isError, isFetching, isSuccess }
  }, [currencyIn, currencyOut, isError, error, isFetching, isLoading, isSuccess, price])
}
