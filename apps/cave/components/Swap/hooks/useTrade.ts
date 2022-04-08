import { Trade, Currency, CurrencyAmount, TradeType } from 'gemswap-sdk'

import { useMemo } from 'react'
import { usePairs } from './usePair'

const MAX_HOPS = 3

export const useTrade = (
  exactCurrencyAmount?: CurrencyAmount<Currency>,
  otherCurrency?: Currency,
  { tradeType = TradeType.EXACT_INPUT, maxHops = MAX_HOPS } = {},
) => {
  const pairs = usePairs(exactCurrencyAmount?.currency.wrapped, otherCurrency?.wrapped, maxHops)

  return useMemo(() => {
    if (!pairs.isSuccess || exactCurrencyAmount.toExact() === '0')
      return { trade: undefined, ...pairs }

    const bestTrade =
      tradeType === TradeType.EXACT_INPUT
        ? Trade.bestTradeExactIn(pairs.data, exactCurrencyAmount, otherCurrency, { maxHops })
        : Trade.bestTradeExactOut(pairs.data, otherCurrency, exactCurrencyAmount, { maxHops })

    return {
      trade: bestTrade[0],
      ...pairs,
    }
  }, [pairs, tradeType, exactCurrencyAmount, otherCurrency, maxHops])
}
