/**
 * Helper to get data for SupplyLiquidityModal.
 * Amounts also used in AddLiquidity confirmed modal
 */

import { Currency, CurrencyAmount } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { LiquidityPool } from '../AddLiquidity'

export type UseLiquidityData = ReturnType<typeof useLiquidityData>

export function useLiquidityData(lp: LiquidityPool) {
  const [amount0, amount1] =
    lp.pair?.token0?.address === lp.amount0?.currency?.wrapped.address
      ? [lp.amount0, lp.amount1]
      : [lp.amount1, lp.amount0]
  const token0 = amount0?.currency
  const token1 = amount1?.currency
  const pair = handlePair(amount0, amount1, lp?.pair)
  const poolShare = pair?.calculatePoolShare(amount0, amount1)
  return {
    pair,
    token0,
    token1,
    poolShare,
    amount0,
    amount1,
  }
}

/**
 * Create a virtual pair if the first and second currency don't have a pair
 * @param firstAmount
 * @param secondAmount
 * @param pair
 * @returns
 */
const handlePair = (
  firstAmount: CurrencyAmount<Currency>,
  secondAmount: CurrencyAmount<Currency>,
  pair?: Pair,
) => {
  if (pair) return pair
  if (!firstAmount?.currency) return pair
  if (!secondAmount?.currency) return pair
  if (firstAmount.currency.wrapped.address === secondAmount.currency.wrapped.address)
    return undefined
  return Pair.createVirtualPair(firstAmount, secondAmount)
}
