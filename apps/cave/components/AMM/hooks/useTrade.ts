import { Trade, Currency, CurrencyAmount, TradeType, Pair, BestTradeOptions } from 'gemswap-sdk'
import { UseQueryResult } from 'react-query'
import { parseAmount } from '../utils/parseAmount'

import { usePairs } from './usePair'

const MAX_HOPS = 3

export const getBestTrade = (
  pairs: Pair[],
  tradeType: TradeType,
  exactAmount: CurrencyAmount<Currency>,
  otherCurrency: Currency,
  options: BestTradeOptions,
) => {
  if (!pairs || pairs.length === 0 || !exactAmount?.currency || !otherCurrency) return

  // if the exact amount is 0, we search for the best route with some arbitrary amount
  const searchableTradeAmount = exactAmount.equalTo(0)
    ? parseAmount('50000', exactAmount.currency)
    : exactAmount

  const bestTrade =
    tradeType === TradeType.EXACT_INPUT
      ? Trade.bestTradeExactIn(pairs, searchableTradeAmount, otherCurrency, options)[0]
      : Trade.bestTradeExactOut(pairs, otherCurrency, searchableTradeAmount, options)[0]

  // may happen when there is not enough liquidity
  if (!bestTrade) throw new Error('Invalid Trade')

  // when exactAmount is 0 return the same best trade route found but the with the correct amount
  if (exactAmount.equalTo(0)) return new Trade(bestTrade.route, exactAmount, bestTrade.tradeType)

  return bestTrade
}

export const useTrade = <T = Trade<Currency, Currency, TradeType>>(
  exactCurrencyAmount?: CurrencyAmount<Currency>,
  otherCurrency?: Currency,
  { tradeType = TradeType.EXACT_INPUT, maxHops = MAX_HOPS } = {},
  { select }: { select?: (data: Trade<Currency, Currency, typeof tradeType>) => T } = {
    select: (d) => d as any,
  },
): UseQueryResult<T> => {
  const trade = usePairs<T>(
    exactCurrencyAmount?.currency.wrapped,
    otherCurrency?.wrapped,
    maxHops,
    {
      select: (pairs) =>
        select(getBestTrade(pairs, tradeType, exactCurrencyAmount, otherCurrency, { maxHops })),
    },
  )

  return trade
}

export type UseTradeResult<T = Trade<Currency, Currency, TradeType>> = UseQueryResult<T>
