import { valueToPercent } from '@chakra-ui/utils'
import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { Transaction } from 'ethers'
import { useEffect, useState } from 'react'
import { useTransaction, useWaitForTransaction } from 'wagmi'
import { useIsMounted } from './useIsMounted'

const clearRecentTransactions = () => localStorage.clear()

export function useAddRecentTransaction() {
  const [currentTx, setCurrentTx] = useState<RecentTransaction>(undefined)
  const { data: recentTransactions } = useRecentTransactions()
  const [{}, wait] = useWaitForTransaction()

  function addRecentTransaction(recenTx: RecentTransaction) {
    setCurrentTx({ ...recenTx })
  }
  useEffect(() => {
    if (currentTx) {
      const newData = recentTransactions.set(currentTx.transaction.hash, currentTx)
      localStorage.setItem('recentTransactions', JSON.stringify(Array.from(newData)))
      wait({ hash: currentTx.transaction.hash })
        .then((value) => {
          recentTransactions.get(currentTx.transaction.hash).loading = false
          localStorage.setItem('recentTransactions', JSON.stringify(Array.from(recentTransactions)))
        })
        .catch((e) => {})
    }
  }, [currentTx])

  return {
    addRecentTransaction,
  }
}

export function useRecentTransactions() {
  const wait = useWaitForTransaction()[1]
  const isMounted = useIsMounted()
  const data = isMounted ? getRecentTransactions() : new Map<String, RecentTransaction>()

  const addRecentTransaction = (recentTx: RecentTransaction) => {
    data.set(recentTx.transaction.hash, recentTx)
    localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
  }

  const anyPedingTx = Array.from(data).filter((value) => value[1].loading).length > 0
  return {
    anyPedingTx,
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
