import { StoredTransaction } from '@pcnv/txs-react'

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

type TransactionMetaToStatusLabel = {
  [Meta in TransactionMeta as Meta['type']]: (
    meta: Meta,
  ) => Record<StoredTransaction['status'], string>
}

const fallback = () => ({
  pending: `Unknown Transaction pending`,
  confirmed: `Unknown Transaction successfully`,
  failed: `Unknown Transaction failed`,
})

const typeToStatusDescription = {
  approve: ({ tokenSymbol }) => ({
    pending: `Approving ${tokenSymbol}`,
    confirmed: `Approved ${tokenSymbol}`,
    failed: `Failed to approve ${tokenSymbol}`,
  }),
  swap: ({ amountIn, amountOut }) => ({
    pending: `Swapping ${amountIn} for ${amountOut}`,
    confirmed: `Swapped ${amountIn} for ${amountOut}`,
    failed: `Failed to swap ${amountIn} for ${amountOut}`,
  }),
  'remove liquidity': ({ amount0, amount1, pairSymbol }) => ({
    pending: `Removing liquidity from ${pairSymbol} pair`,
    confirmed: `Removed ${amount0} and ${amount1} from liquidity pair`,
    failed: `Failed to remove ${pairSymbol} liquidity`,
  }),
  'add liquidity': ({ amount0, amount1, pairSymbol }) => ({
    pending: `Adding liquidity to ${pairSymbol} pair`,
    confirmed: `Added ${amount0} and ${amount1} to the liquidity pair`,
    failed: `Failed to add ${pairSymbol} liquidity`,
  }),
  stake: ({ amount, pool }) => ({
    pending: `Staking ${amount} for ${pool} days`,
    confirmed: `${amount} Staked for ${pool} days`,
    failed: `Failed to stake ${amount} for ${pool} days`,
  }),
  bond: ({ amountIn, amountOut }) => ({
    pending: `Bonding ${amountIn} for ${amountOut}`,
    confirmed: `Bonded ${amountIn} for ${amountOut}`,
    failed: `Failed to bond ${amountIn} for ${amountOut}`,
  }),
  redeem: ({ amount }) => ({
    pending: `Redeeming ${amount}`,
    confirmed: `Successfully redeemed ${amount}`,
    failed: `Failed to redeem ${amount}`,
  }),
  'list position': ({ tokenId, action }) => ({
    pending: `Listing position #${tokenId} in the marketplace for ${action}`,
    confirmed: `Successfully listed #${tokenId}`,
    failed: `Failed to list #${tokenId}`,
  }),
  'unlist position': ({ tokenId }) => ({
    pending: `Unlisting position #${tokenId} from the marketplace`,
    confirmed: `Successfully listed #${tokenId}`,
    failed: `Failed to list #${tokenId}`,
  }),
  'offer marketplace': ({ tokenId }) => ({
    pending: `Purchasing position #${tokenId}`,
    confirmed: `Successfully purchased position #${tokenId}`,
    failed: `Failed to purchased position #${tokenId}`,
  }),
  airdrop: ({ amount }) => ({
    pending: `Claming  ${amount} USDC`,
    confirmed: `Successfully claimed ${amount} USDC`,
    failed: `Failed to claim ${amount} USDC`,
  }),
} satisfies TransactionMetaToStatusLabel

export const getTransactionStatusLabel = ({
  status,
  meta,
}: Partial<StoredTransaction<TransactionMeta>>) =>
  (typeToStatusDescription[meta?.type] || fallback)(meta as any)[status]
