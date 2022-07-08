export type TransactionMeta =
  | { type: 'approve'; tokenSymbol: string }
  | { type: 'swap'; amountIn: string; amountOut: string }
  | { type: 'add liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'remove liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'bond'; amountIn: string; amountOut: string }
  | { type: 'stake'; amount: string; pool: string }
  | { type: 'redeem'; amount: string }
  | { type: 'offer marketplace'; tokenId: number }
  | { type: 'list position'; tokenId: number; action: 'auction' | 'sale' }
  | { type: 'unlist position'; tokenId: number }

export type TrackedTransaction = {
  from: string
  hash: string
  chainId: number
  timestamp: number
  status: 'pending' | 'success' | 'error'
  meta: TransactionMeta
}
