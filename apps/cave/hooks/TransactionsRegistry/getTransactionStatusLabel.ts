import { UnionToIntersection } from 'types/utils'

export type TransactionMeta =
  | { type: 'approve'; tokenSymbol: string }
  | { type: 'swap'; amountIn: string; amountOut: string }
  | { type: 'add liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'remove liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'bond'; amountIn: string; amountOut: string }
  | { type: 'stake'; amount: string; pool: number }
  | { type: 'redeem'; amount: string }
  | { type: 'offer marketplace'; tokenId: number }
  | { type: 'list position'; tokenId: number; action: 'auction' | 'sale' }
  | { type: 'unlist position'; tokenId: number }
  | { type: 'airdrop'; amount: string | number }

export type TrackedTransaction = {
  from: string
  hash: string
  chainId: number
  timestamp: number
  status: 'pending' | 'success' | 'error'
  meta: TransactionMeta
}

type TransactionMetaToStatusLabel = {
  [Meta in TransactionMeta as Meta['type']]: (
    meta: Omit<Meta, 'type'>,
  ) => Record<TrackedTransaction['status'], string>
}

const fallback = () => ({
  pending: `Unknown Transaction pending`,
  success: `Unknown Transaction successfully`,
  error: `Unknown Transaction failed`,
})

export const getTransactionStatusLabel = ({ status, meta }: Partial<TrackedTransaction>) => {
  return (
    (<TransactionMetaToStatusLabel>{
      approve: ({ tokenSymbol }) => ({
        pending: `Approving ${tokenSymbol}`,
        success: `Approved ${tokenSymbol}`,
        error: `Failed to approve ${tokenSymbol}`,
      }),
      swap: ({ amountIn, amountOut }) => ({
        pending: `Swapping ${amountIn} for ${amountOut}`,
        success: `Swapped ${amountIn} for ${amountOut}`,
        error: `Failed to swap ${amountIn} for ${amountOut}`,
      }),
      'remove liquidity': ({ amount0, amount1, pairSymbol }) => ({
        pending: `Removing liquidity from ${pairSymbol} pair`,
        success: `Removed ${amount0} and ${amount1} from liquidity pair`,
        error: `Failed to remove ${pairSymbol} liquidity`,
      }),
      'add liquidity': ({ amount0, amount1, pairSymbol }) => ({
        pending: `Adding liquidity to ${pairSymbol} pair`,
        success: `Added ${amount0} and ${amount1} to the liquidity pair`,
        error: `Failed to add ${pairSymbol} liquidity`,
      }),
      stake: ({ amount, pool }) => ({
        pending: `Staking ${amount} for ${pool} days`,
        success: `${amount} Staked for ${pool} days`,
        error: `Failed to stake ${amount} for ${pool} days`,
      }),
      bond: ({ amountIn, amountOut }) => ({
        pending: `Bonding ${amountIn} for ${amountOut}`,
        success: `Bonded ${amountIn} for ${amountOut}`,
        error: `Failed to bond ${amountIn} for ${amountOut}`,
      }),
      redeem: ({ amount }) => ({
        pending: `Redeeming ${amount}`,
        success: `Successfully redeemed ${amount}`,
        error: `Failed to redeem ${amount}`,
      }),
      'list position': ({ tokenId, action }) => ({
        pending: `Listing position #${tokenId} in the marketplace for ${action}`,
        success: `Successfully listed #${tokenId}`,
        error: `Failed to list #${tokenId}`,
      }),
      'unlist position': ({ tokenId }) => ({
        pending: `Unlisting position #${tokenId} from the marketplace`,
        success: `Successfully listed #${tokenId}`,
        error: `Failed to list #${tokenId}`,
      }),
      'offer marketplace': ({ tokenId }) => ({
        pending: `Purchasing position #${tokenId}`,
        success: `Successfully purchased position #${tokenId}`,
        error: `Failed to purchased position #${tokenId}`,
      }),
      airdrop: ({ amount }) => ({
        pending: `Claming  ${amount} USDC`,
        success: `Successfully claimed ${amount} USDC`,
        error: `Failed to claim ${amount} USDC`,
      }),
      fallback,
    })[meta?.type] || fallback
  )(meta as UnionToIntersection<TransactionMeta>)[status]
}
