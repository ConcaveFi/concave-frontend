
/**
 * Helper to get data for SupplyLiquidityModal.
 * Amounts also used in AddLiquidity confirmed modal
 */

import { LiquidityPool } from "../AddLiquidity"

export type UseLiquidityData = ReturnType<typeof useLiquidityData>

export default function useLiquidityData(lp: LiquidityPool) {
  const [amount0, amount1] =
    lp.pair?.token0?.address === lp.amount0?.currency?.wrapped.address
      ? [lp.amount0, lp.amount1]
      : [lp.amount1, lp.amount0]
  const token0 = amount0?.currency
  const token1 = amount1?.currency
  const pair = lp?.pair
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
