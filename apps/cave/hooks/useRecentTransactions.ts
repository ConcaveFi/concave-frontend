import { Transaction } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { useIsMounted } from './useIsMounted'

const clearRecentTransactions = () => localStorage.clear()

export function useRecentTransactions() {
  const wait = useWaitForTransaction()[1]
  const isMounted = useIsMounted()
  const data = isMounted ? getRecentTransactions() : new Map<String, RecentTransaction>()
  const [verified, setVerified] = useState(false)

  const [test, setTest] = useState(0)
  const [anyPendingTx, setAnyPendingTx] = useState(false)

  const addRecentTransaction = (recentTx: RecentTransaction) => {
    data.set(recentTx.transaction.hash, recentTx)
    localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
    setTimeout(() => {
      setVerified(false)
    }, 200)
  }

  useEffect(() => {
    if (!verified && data.size > 0) {
      const hasUnNotLoaded = Array.from(data).filter((value) => value[1].loading).length > 0
      if (hasUnNotLoaded) {
        data.forEach((value) => {
          if (!value.loading) return
          wait({ hash: value.transaction.hash })
            .then((e) => {
              console.log('finished')
              data.set(value.transaction.hash, { ...value, loading: e.data.status === 2 })
              localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
            })
            .catch((e) => {})
        })
      }
    }

    setVerified(true)
  }, [data])

  useEffect(() => {
    setInterval(() => {
      console.log(
        'current value ->' + (Array.from(data).filter((value) => value[1].loading).length > 0),
      )

      setAnyPendingTx(Array.from(data).filter((value) => value[1].loading).length > 0)
    }, 3000)
  }, [])

  return {
    test,
    anyPendingTx,
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

const getRecentTransactions = () =>
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
}
