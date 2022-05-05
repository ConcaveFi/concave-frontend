import {
  Trade,
  Currency,
  CurrencyAmount,
  TradeType,
  Pair,
  BestTradeOptions,
} from '@concave/gemswap-sdk'
import { UseQueryResult } from 'react-query'
import { toAmount } from 'utils/toAmount'

import { usePairs } from './usePair'

const MAX_HOPS = 3

export const InsufficientLiquidityError = 'Insufficient liquidity'
export const InvalidTradeError = 'Invalid trade'

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
    ? toAmount(50000, exactAmount.currency)
    : exactAmount

  const bestTrade =
    tradeType === TradeType.EXACT_INPUT
      ? Trade.bestTradeExactIn(pairs, searchableTradeAmount, otherCurrency, options)[0]
      : Trade.bestTradeExactOut(pairs, otherCurrency, searchableTradeAmount, options)[0]

  if (!bestTrade) {
    // TODO: Handle input too low
    if (exactAmount.greaterThan(0)) throw InsufficientLiquidityError
    throw InvalidTradeError
  }

  // when exactAmount is 0 return the same best trade route found but with the correct 0 amount
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
