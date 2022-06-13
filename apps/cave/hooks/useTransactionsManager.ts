import { Transaction } from 'ethers'
import { createContext, useContext } from 'react'
import { useQueries, useQueryClient } from 'react-query'
import { useProvider } from 'wagmi'

export const useTransactionsManager = () => {
  const queryClient = useQueryClient()

  const a = useQueries()

  return {
    registerTransaction: (tx: Transaction) => {
      queryClient.fetch
    },
  }
}
