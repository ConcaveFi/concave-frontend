import { ROUTER_ADDRESS } from '@concave/gemswap-sdk'
import { useState } from 'react'
import { LiquidityPool } from './AddLiquidity'

/**
 * Helper to get data for SupplyLiquidityModal.
 * Amounts also used in AddLiquidity confirmed modal
 */

export type UseLiquidityData = ReturnType<typeof useLiquidityData>

export default function useLiquidityData(lp: LiquidityPool) {
  const [amount0, amount1] =
    lp.pair?.token0?.address === lp.amount0?.currency?.wrapped.address
      ? [lp.amount0, lp.amount1]
      : [lp.amount1, lp.amount0]
  const [approve0, setApprove0] = useState(false)
  const [approve1, setApprove1] = useState(false)
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
    setApprove0,
    setApprove1,
    approve0,
    approve1,
  }
}
