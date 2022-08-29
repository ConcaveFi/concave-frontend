/**
 * Helper to get data for SupplyLiquidityModal.
 * Amounts also used in AddLiquidity confirmed modal
 */

import { Percent } from '@concave/core'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { useMemo } from 'react'
import type { LiquidityPool } from '../LiquidityPool'

export type UseLiquidityData = ReturnType<typeof useLiquidityData>

export function useLiquidityData(lp: LiquidityPool) {
  const [amount0, amount1] =
    lp.pair?.token0?.address === lp.amount0?.currency?.wrapped.address
      ? [lp.amount0, lp.amount1]
      : [lp.amount1, lp.amount0]
  const token0 = amount0?.currency
  const token1 = amount1?.currency
  const pair = lp?.pair

  const { data: totalSupply } = useTotalSupply(pair.liquidityToken)

  const poolShareAmount = pair.getLiquidityMinted(totalSupply, amount0.wrapped, amount1.wrapped)
  const mewTotalSuppy = totalSupply.add(poolShareAmount)

  return useMemo(
    () => ({
      pair,
      token0,
      token1,
      poolShare: {
        amount: poolShareAmount,
        percent: new Percent(poolShareAmount.numerator, mewTotalSuppy.numerator),
      },
      amount0,
      amount1,
    }),
    [amount0, amount1, mewTotalSuppy.numerator, pair, poolShareAmount, token0, token1],
  )
}
