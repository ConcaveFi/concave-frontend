import { Transaction } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { useEffect, useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import { text } from 'stream/consumers'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'
import { useIsMounted } from './useIsMounted'

const clearRecentTransactions = () => localStorage.clear()

export function useRecentTransactions() {
  const [{ data: account }] = useAccount()
  const networkdID = useCurrentSupportedNetworkId()
  const provider = concaveProvider(networkdID)
  const data = getRecentTransactions(account?.address, networkdID)
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending')

  const addRecentTransaction = (recentTx: RecentTransaction) => {
    data[recentTx.transaction.hash] = recentTx
    localStorage.setItem('recentTransactions', JSON.stringify(data))
    setStatus('pending')
    console.log('Entered here.')
  }

  const isLoading = Object.values(data).filter((v) => v?.loading).length > 0
  useQuery(
    ['transactions'],
    async () => {
      const fromStorage = getRecentTransactions(account?.address, networkdID)
      const promises = Object.values(fromStorage)
        .filter((v) => v?.loading)
        .map((v) => provider.waitForTransaction(v?.transaction?.hash, 1, 1000))

      if (promises.length === 0) return fromStorage

      const newData = await Promise.all(promises)
        .then((txs) => {
          txs.forEach((tx) => {
            fromStorage[tx.transactionHash].loading = false
            fromStorage[tx.transactionHash].status = txStatus[tx.status]
          })
          return fromStorage
        })
        .catch((error) => {
          return fromStorage
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

export const getRecentTransactions = (accountAddress: string, chainId: number) =>
  Object.values(
    (JSON.parse(localStorage.getItem('recentTransactions')) || {}) as RecentTxList,
  )?.filter((v) => v.transaction?.from === accountAddress)

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
