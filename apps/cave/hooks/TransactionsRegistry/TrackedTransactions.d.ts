export type TransactionMeta =
  | { type: 'approve'; tokenSymbol: string }
  | { type: 'swap'; amountIn: string; amountOut: string }
  | { type: 'add liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'remove liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'bond'; amountIn: string; amountOut: string }
  | { type: 'stake'; amount: string; days: number }
  | { type: 'redeem'; amount: string }

export type TrackedTransaction = {
  from: string
  hash: string
  chainId: number
  timestamp: number
  status: 'pending' | 'success' | 'error'
  meta: TransactionMeta
}
