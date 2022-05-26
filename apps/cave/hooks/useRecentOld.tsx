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
  const netWordId = useCurrentSupportedNetworkId()
  const wait = useWaitForTransaction()[1]
  const isMounted = useIsMounted()
  // const data = isMounted ? getRecentTransactions() : new Map<String, RecentTransaction>()
  const [verified, setVerified] = useState(false)
  // const [data, setData] = useState(new Map<String, RecentTransaction>())
  const data = isMounted ? getRecentTransactions() : new Map<String, RecentTransaction>()
  // const [loaded, setLoaded] = useState(false)

  // const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending')

  const addRecentTransaction = (recentTx: RecentTransaction) => {
    data.set(recentTx.transaction.hash, recentTx)
    // setData(data.set(recentTx.transaction.hash, recentTx))
    localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
    setStatus('pending')
    // setVerified(!verified)
  }

  // useEffect(() => {
  //   if (!loaded) {
  //     setData(getRecentTransactions())
  //     setLoaded(true)
  //   }
  // }, [loaded])

  // useEffect(() => {
  //   if (data.size > 0) {
  //     const promises = Array.from(data)
  //       .filter((value) => value[1].loading)
  //       .map((value) => wait({ hash: value[1].transaction.hash }))

  //     // if (promises.length > 0) setStatus('pending')

  //     Promise.all(promises).then((recentTxs) => {
  //       recentTxs.forEach((tx) => {
  //         data.get(tx.data.transactionHash).loading = tx.data.status === 2
  //         data.get(tx.data.transactionHash).status = txStatus[tx.data.status]
  //       })
  //       localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
  //       // setStatus('loaded')
  //     })
  //   }
  // }, [data, verified])

  // console.log(status)

  // useEffect(() => {
  //   setInterval(() => {
  //     setIsLoading(
  //       Array.from(getRecentTransactions()).filter((value) => value[1].loading).length > 0,
  //     )
  //   }, 2000)
  // })

  return {
    status,
    data,
    clearRecentTransactions,
    addRecentTransaction,
  }
}

const updateTransactions = () => {
  const recentTx = getRecentTransactions()
  recentTx.forEach(() => {})
}

const updateRecentTxStatus = (txHash: string, loading: boolean) => {
  const recentTx = getRecentTransactions()
  recentTx.get(txHash).loading = loading
  return recentTx
}

export const getRecentTransactions = () =>
  new Map<String, RecentTransaction>(JSON.parse(localStorage.getItem('recentTransactions')))

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
