import { Trade, Currency, CurrencyAmount, TradeType, Pair, BestTradeOptions } from 'gemswap-sdk'

import { usePairs } from './usePair'

const MAX_HOPS = 3

export const getBestTrade = (
  pairs: Pair[],
  tradeType: TradeType,
  exactAmount: CurrencyAmount<Currency>,
  otherCurrency: Currency,
  options: BestTradeOptions,
) => {
  if (!pairs || !exactAmount?.currency || !otherCurrency) return

  const bestTrade =
    tradeType === TradeType.EXACT_INPUT
      ? Trade.bestTradeExactIn(pairs, exactAmount, otherCurrency, options)
      : Trade.bestTradeExactOut(pairs, otherCurrency, exactAmount, options)

  // happens when there is not enough liquidity
  if (!bestTrade[0]) throw new Error('Invalid Trade')

  return bestTrade[0]
}

export const useTrade = <T = Trade<Currency, Currency, TradeType>>(
  exactCurrencyAmount?: CurrencyAmount<Currency>,
  otherCurrency?: Currency,
  { tradeType = TradeType.EXACT_INPUT, maxHops = MAX_HOPS } = {},
  { select }: { select?: (data: Trade<Currency, Currency, typeof tradeType>) => T } = {
    select: (d) => d as any,
  },
) => {
  return usePairs<T>(exactCurrencyAmount?.currency.wrapped, otherCurrency?.wrapped, maxHops, {
    select: (pairs) =>
      select(getBestTrade(pairs, tradeType, exactCurrencyAmount, otherCurrency, { maxHops })),
  })
}
