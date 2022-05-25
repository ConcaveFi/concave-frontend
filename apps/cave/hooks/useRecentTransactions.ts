import { Transaction } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { useEffect, useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import { text } from 'stream/consumers'
import { useWaitForTransaction } from 'wagmi'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'
import { useIsMounted } from './useIsMounted'

const clearRecentTransactions = () => localStorage.clear()

export function useRecentTransactions() {
  const data = getRecentTransactions()
  const netWorkdID = useCurrentSupportedNetworkId()
  const provider = concaveProvider(netWorkdID)
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending')

  const addRecentTransaction = (recentTx: RecentTransaction) => {
    data[recentTx.transaction.hash] = recentTx
    console.log(data)

    localStorage.setItem('recentTransactions', JSON.stringify(data))
    setStatus('pending')
  }

  const isLoading = Object.values(data).filter((v) => v.loading).length > 0
  useQuery(
    ['transactions'],
    async () => {
      const promises = Object.values(getRecentTransactions())
        .filter((v) => v.loading)
        .map((v) => provider.waitForTransaction(v.transaction.hash, 1, 1000))

      if (promises.length === 0) return getRecentTransactions()

      const newData = await Promise.all(promises)
        .then((txs) => {
          txs.forEach((tx) => {
            data[tx.transactionHash].loading = false
            data[tx.transactionHash].status = txStatus[tx.status]
          })
          return data
        })
        .catch((error) => {
          return getRecentTransactions()
        })

      localStorage.setItem('recentTransactions', JSON.stringify(newData))
    },
    { refetchInterval: 2500 },
  )

  return {
    isLoading,
    status,
    data,
    clearRecentTransactions,
    addRecentTransaction,
  }
}

export const getRecentTransactions = () =>
  (JSON.parse(localStorage.getItem('recentTransactions')) || {}) as RecentTxList

type RecentTxList = { [key: string]: RecentTransaction }

export type RecentTransaction = {
  type: 'Swap' | 'Bond' | 'Stake'
  loading: boolean
  amount: number
  amountTokenName: string
  purchase?: number
  purchaseTokenName?: string
  stakePool?: string
  transaction: Transaction
  status?: 'success' | 'error'
}

const txStatus = {
  0: 'error',
  1: 'success',
}
