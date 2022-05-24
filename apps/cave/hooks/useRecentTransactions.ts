import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { Transaction } from 'ethers'
import { useEffect, useState } from 'react'
import { useTransaction, useWaitForTransaction } from 'wagmi'
import { useIsMounted } from './useIsMounted'

const clearRecentTransactions = () => localStorage.clear()

export function useAddRecentTransaction() {
  const [currentTx, setCurrentTx] = useState<RecentTransaction>(undefined)
  const { data: recentTransactions } = useRecentTransactions()
  // const [{ data }, wait] = useWaitForTransaction({ hash: currentTx?.transaction.hash })

  function addRecentTransaction(recenTx: RecentTransaction) {
    setCurrentTx({ ...recenTx })
  }

  useEffect(() => {
    if (currentTx) {
      const newData = recentTransactions.set(currentTx.transaction.hash, currentTx)
      localStorage.setItem('recentTransactions', JSON.stringify(Array.from(newData)))
    }
  }, [currentTx])

  return {
    addRecentTransaction,
  }
}

export function useRecentTransactions() {
  const isMounted = useIsMounted()
  const data = isMounted
    ? new Map<String, RecentTransaction>(JSON.parse(localStorage.getItem('recentTransactions')))
    : new Map<String, RecentTransaction>()

  const anyPedingTx = Array.from(data).filter((value) => value[1].loading).length > 0

  // console.log(data)

  return {
    anyPedingTx,
    data,
    clearRecentTransactions,
  }
}

export type RecentTransaction = {
  type: 'Swap' | 'Bond' | 'Stake'
  loading: boolean
  amount: number
  amountTokenName: string
  purchase?: number
  purchaseTokenName?: string
  stakePool?: string
  transaction: Transaction
  wait?: any
}
