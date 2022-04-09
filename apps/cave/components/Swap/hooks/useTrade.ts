import { Trade, Currency, CurrencyAmount, TradeType, Pair } from 'gemswap-sdk'

import { usePairs } from './usePair'

const MAX_HOPS = 3

const getBestTrade = (
  pairs: Pair[],
  tradeType: TradeType,
  exactAmount: CurrencyAmount<Currency>,
  otherCurrency: Currency,
) => {
  if (!pairs || !exactAmount?.currency || !otherCurrency) return

  const bestTrade =
    tradeType === TradeType.EXACT_INPUT
      ? Trade.bestTradeExactIn(pairs, exactAmount, otherCurrency, { maxHops: 1 })
      : Trade.bestTradeExactOut(pairs, otherCurrency, exactAmount, { maxHops: 1 })

  return bestTrade[0]
}

export const useTrade = (
  exactCurrencyAmount?: CurrencyAmount<Currency>,
  otherCurrency?: Currency,
  { tradeType = TradeType.EXACT_INPUT, maxHops = MAX_HOPS } = {},
) => {
  const pairs = usePairs(exactCurrencyAmount?.currency.wrapped, otherCurrency?.wrapped)

  return {
    trade: getBestTrade(pairs?.data, tradeType, exactCurrencyAmount, otherCurrency),
    ...pairs,
  }
  // }, [pairs, tradeType, exactCurrencyAmount, otherCurrency, maxHops])
}
