import { ROUTER_ADDRESS } from '@concave/gemswap-sdk'
import { useApproval } from 'hooks/useAllowance'
import { LiquidityPool } from './AddLiquidity'

/**
 * Helper to get data for SupplyLiquidityModal.
 * Amounts also used in AddLiquidity confirmed modal
 */

export default function useLiquidityData(lp: LiquidityPool) {
  const [amount0, amount1] =
    lp.pair.token0.address === lp.amount0.currency.wrapped.address
      ? [lp.amount0, lp.amount1]
      : [lp.amount1, lp.amount0]
  const approval0 = useApproval(amount0.wrapped, ROUTER_ADDRESS[amount0.currency.chainId])
  const approval1 = useApproval(amount1.wrapped, ROUTER_ADDRESS[amount1.currency.chainId])
  const [needsApprove0] = approval0
  const [needsApprove1] = approval1
  const token0 = amount0.currency
  const token1 = amount1.currency
  const pair = lp.pair
  const poolShare = pair.calculatePoolShare(amount0, amount1)
  return {
    pair,
    token0,
    token1,
    poolShare,
    amount0,
    amount1,
    needsApprove0,
    needsApprove1,
    approval0,
    approval1,
  }
}
