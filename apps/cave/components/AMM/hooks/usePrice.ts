import { Currency } from '@concave/core'
import { Price, TradeType } from '@concave/gemswap-sdk'
import { useMemo } from 'react'
import { toAmount } from 'utils/toAmount'
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
    currencyIn && toAmount(50000, currencyIn),
    currencyOut,
    { maxHops: 3, tradeType: TradeType.EXACT_INPUT },
    { select: (trade) => trade.route.midPrice },
  )

  return useMemo(() => {
    if (currencyOut && currencyIn?.wrapped.equals(currencyOut.wrapped))
      return {
        price: new Price(currencyIn, currencyIn, 1, 1),
        isLoading: false,
        isError: false,
        isFetching: false,
        isSuccess: true,
        error,
      }

    return { price, error, isLoading, isError, isFetching, isSuccess }
  }, [currencyIn, currencyOut, isError, error, isFetching, isLoading, isSuccess, price])
}
