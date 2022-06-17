import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useTransactionStatusToast } from 'components/TransactionStatusToast/ToastCard'
import { concaveProvider } from 'lib/providers'
import { useCallback } from 'react'
import { useQueries } from 'react-query'
import { UnionToIntersection } from 'types/utils'
import { useAccount, useNetwork } from 'wagmi'
import { useLocalStorage } from './useLocalStorage'

type TransactionMeta =
  | { type: 'approve'; tokenSymbol: string }
  | { type: 'swap'; amountIn: string; amountOut: string }
  | { type: 'add liquidity'; amount0: string; amount1: string; pairSymbol: string }
  | { type: 'bond'; amountIn: string; amountOut: string }
  | { type: 'stake'; amount: string; pool: string }

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

export const getTransactionStatusLabel = ({ status, meta }: Partial<TrackedTransaction>) =>
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
  })[meta.type](meta as UnionToIntersection<TransactionMeta>)[status]

const hrs2 = 2 * 60 * 1000
export const useTransactionRegistry = () => {
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const renderTxStatusToast = useTransactionStatusToast()

  const { data: transactions, mutateAsync: setTransactions } = useLocalStorage<
    TrackedTransaction[]
  >(account?.address && `transactions ${account.address} ${activeChain}`, [])

  const pushTransaction = useCallback(
    (tx: TrackedTransaction) => {
      // keep last 10 txs in localstorage, filter by hash to avoid duplicates
      return setTransactions(
        [tx, ...transactions.filter((_tx) => _tx.hash !== tx.hash).slice(0, 9)],
        {
          onSuccess: () => {
            // onSuccess means on transaction included to localstorage
            // if tx happened less then 2hrs ago, show toast
            // if (tx.timestamp < +Date.now() - hrs2)
            console.log(tx.timestamp, tx.timestamp < +Date.now() - hrs2)
            renderTxStatusToast(tx)
          },
        },
      )
    },
    [transactions, setTransactions, renderTxStatusToast],
  )

  /* await resolution of pending transactions saved to localstorage
   (ex user closed the app while pending, when he connects again, 
    will load localstorage, and await resolution of his pending transactions)
  */
  useQueries(
    transactions
      ?.filter((tx) => tx.status === 'pending')
      .map((tx) => ({
        queryKey: tx.hash,
        queryFn: async () => {
          const receipt = await concaveProvider(tx.chainId).waitForTransaction(tx.hash)
          if (receipt.status === 0) return { ...tx, status: 'error' }
          return { ...tx, status: 'success' }
        },
        onSuccess: (data) => {
          console.log(data)
          pushTransaction(data)
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      })) || [],
  )

  return {
    registerTransaction: (
      { hash, from, chainId }: TransactionResponse,
      meta: TrackedTransaction['meta'],
    ) => {
      const newTrackedTransaction = {
        hash,
        from,
        chainId,
        timestamp: Date.now(),
        status: <const>'pending',
        meta,
      }
      pushTransaction(newTrackedTransaction)
    },
    lastTransactions: transactions,
  }
}
