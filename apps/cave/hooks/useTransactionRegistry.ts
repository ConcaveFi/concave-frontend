import { TransactionResponse } from '@ethersproject/abstract-provider'
import { concaveProvider } from 'lib/providers'
import { useQueries } from 'react-query'
import { useLocalStorage } from 'react-use'
import { UnionToIntersection } from 'types/utils'
import { useAccount } from 'wagmi'

type TransactionMeta =
  | { type: 'approve'; tokenSymbol: string }
  | { type: 'swap'; amountIn: string; amountOut: string }
  | { type: 'add liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'bond'; amountIn: string; amountOut: string }
  | { type: 'stake'; amount: string; pool: string }

type TrackedTransaction = {
  from: string
  hash: string
  chainId: number
  status: 'pending' | 'success' | 'error'
  meta: TransactionMeta
}
type TransactionMetaToStatusLabel = {
  [Meta in TransactionMeta as Meta['type']]: (meta: Meta) => {
    [status in TrackedTransaction['status']]: string
  }
}

export const getTransactionStatusLabel = (meta: TransactionMeta) =>
  (<TransactionMetaToStatusLabel>{
    approve: ({ tokenSymbol }) => ({
      pending: `Approving ${tokenSymbol}`,
      success: `Approved ${tokenSymbol}`,
    }),
    swap: ({ amountIn, amountOut }) => ({
      pending: `Swapping ${amountIn} for ${amountOut}`,
      success: `Swapped ${amountIn} for ${amountOut}`,
      error: `Failed to swap ${amountIn} for ${amountOut}`,
    }),
    'add liquidity': ({ amount0, amount1, pairSymbol }) => ({
      pending: `Adding liquidity to ${pairSymbol} pair`,
      success: `Added ${amount0} and ${amount1} to the liquidity pair`,
      error: `Failed to add ${pairSymbol} liquidity`,
    }),
    stake: ({ amount, pool }) => ({
      pending: `Staking ${amount} in ${pool}`,
      success: `${amount} Staked  in ${pool}`,
      error: `Failed to stake ${amount} in ${pool}`,
    }),
    bond: ({ amountIn, amountOut }) => ({
      pending: `Bonding ${amountIn} for ${amountOut}`,
      success: `Bonded ${amountIn} for ${amountOut}`,
      error: `Failed to bond ${amountIn} for ${amountOut}`,
    }),
  })[meta.type](meta as UnionToIntersection<typeof meta>)

const waitTransaction = async (tx: TrackedTransaction): Promise<TrackedTransaction> => {
  const receipt = await concaveProvider(tx.chainId).waitForTransaction(tx.hash)
  if (receipt.status === 0) return { ...tx, status: 'error' }
  return { ...tx, status: 'success' }
}

export const useTransactionRegistry = () => {
  const { data: account } = useAccount()
  const [transactions, setTransactions] = useLocalStorage<TrackedTransaction[]>(
    `transactions ${account.address}`,
  )

  const transactionsQueries = useQueries(
    transactions.map((tx) => ({
      queryKey: tx.hash,
      queryFn: () => (tx.status === 'pending' ? waitTransaction(tx) : tx),
      placeholderData: tx, // use tx as placeholder data since it will have a status: pending flag inside
      onSuccess(data) {
        console.log('TOGGLE TOAST', data)
        setTransactions((prev) => prev.map((t) => (t.hash === tx.hash ? data : t)))
      },
    })),
  )

  return {
    registerTransaction: (
      { hash, from, chainId }: TransactionResponse,
      meta: TrackedTransaction['meta'],
    ) => {
      const newTrackedTransaction = { hash, from, chainId, status: <const>'pending', meta }
      console.log('TOGGLE TOAST', newTrackedTransaction, getTransactionStatusLabel(meta))
      // keep last 10 txs in localstorage, filter by hash to avoid duplicates
      setTransactions((lastTransactions) => [
        newTrackedTransaction,
        ...lastTransactions.filter((tx) => tx.hash !== hash).slice(0, 9),
      ])
    },
    lastTransactions: transactionsQueries.map((q) => q.data),
  }
}
