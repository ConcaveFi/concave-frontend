import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useTransactionStatusToast } from 'components/TransactionStatusToast'
import { concaveProvider } from 'lib/providers'
import { useCallback, useEffect } from 'react'
import { QueriesObserver, useQueryClient } from 'react-query'
import { useAccount, useNetwork } from 'wagmi'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { TrackedTransaction } from './TrackedTransactions'

const hrs2 = 2 * 60 * 1000 // 2 hours
const useTrackedTransactions = () => {
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
            if (tx.timestamp > +Date.now() - hrs2) renderTxStatusToast(tx)
          },
        },
      )
    },
    [transactions, setTransactions, renderTxStatusToast],
  )

  return { transactions, pushTransaction }
}

/**
  @returns registerTransaction: Register a new transaction to be tracked by the app, (handles status toasts, and user last transactions screen)
  @returns lastTransactions: last 10 transactions 
 */
export const useTransactionRegistry = () => {
  const { transactions, pushTransaction } = useTrackedTransactions()

  const registerTransaction = useCallback(
    ({ hash, from, chainId }: TransactionResponse, meta: TrackedTransaction['meta']) => {
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
    [pushTransaction],
  )

  return {
    registerTransaction,
    lastTransactions: transactions,
  }
}

/**
  CAUTION: this hook should be called only once in the app, 
  each time it's called it spawns a new tracked transactions listener
  
  await resolution of pending transactions saved to localstorage
  (ex user closed the app while pending, when he connects again, 
  will load localstorage, and await resolution of his pending transactions)
*/
export const useTransactionsObserver = () => {
  const { transactions, pushTransaction } = useTrackedTransactions()

  const queryClient = useQueryClient()

  useEffect(() => {
    // Create an observer to watch the query and update its result into state
    const observer = new QueriesObserver(
      queryClient,
      transactions
        ?.filter((tx) => tx.status === 'pending')
        .map((tx) => ({
          queryKey: tx.hash,
          queryFn: async () => {
            const receipt = await concaveProvider(tx.chainId).waitForTransaction(tx.hash)
            if (receipt.status === 0) return { ...tx, status: 'error' }
            return { ...tx, status: 'success' }
          },
          onSuccess(data: TrackedTransaction) {
            pushTransaction(data)
          },
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        })) || [],
    )

    const unsubscribe = observer.subscribe()

    // Clean up subscription on unmount
    return () => unsubscribe()
  }, [pushTransaction, queryClient, transactions])
}
