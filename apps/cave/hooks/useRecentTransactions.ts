import { Transaction } from 'ethers'
import { useIsMounted } from './useIsMounted'

const clearRecentTransactions = () => localStorage.clear()

export function useRecentTransactions() {
  const isMounted = useIsMounted()
  const data = isMounted ? JSON.parse(localStorage.getItem('RecentTransactions')) || [] : []

  function addRecentTransaction(transaction: RecentTransaction) {
    data.push(transaction)
    localStorage.setItem('RecentTransactions', JSON.stringify(data))
  }

  return {
    data,
    addRecentTransaction,
    clearRecentTransactions,
  }
}

export type RecentTransaction = {
  type: 'Swap' | 'Bond' | 'Stake'
  amount: number
  purchase?: number
  stakePool?: string
  transaction: Transaction
}
