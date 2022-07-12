import { UnionToIntersection } from 'types/utils'
import { TrackedTransaction, TransactionMeta } from './TrackedTransactions'

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
        pending: `Staking ${amount} for ${pool}`,
        success: `${amount} Staked for ${pool}`,
        error: `Failed to stake ${amount} for ${pool}`,
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
      fallback,
    })[meta.type] || fallback
  )(meta as UnionToIntersection<TransactionMeta>)[status]
}
