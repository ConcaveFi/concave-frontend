import { ChainId, CNV, Currency, CurrencyAmount, Token } from '@concave/core'
import { Pair, Trade, TradeType } from '@concave/gemswap-sdk'
import { Transaction } from 'ethers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useWaitForTransaction, useWebSocketProvider } from 'wagmi'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export const getRecentTransactions = (accountAddress: string, chainId: number) =>
  (JSON.parse(localStorage.getItem('recentTransactions')) || {}) as RecentTxList

type RecentTxList = { [key: string]: RecentTransaction }

type ApproveTransaction = {
  type: 'Approve'
  transaction: Transaction
  token: Token
}

type SwapTransaction = {
  type: 'Swap'
  trade: Trade<Currency, Currency, TradeType>
}

type AddLiquidityTransaction = {
  type: 'Swap'
  pair: Pair
}

type BondTransaction = {
  type: 'Bond'
  amountIn: CurrencyAmount<Currency>
  amountOut: CurrencyAmount<Currency>
}

type StakeTransaction = {
  type: 'Stake'
  amount: CurrencyAmount<Token>
}

export type RecentTransaction = {
  type: 'Swap' | 'Bond' | 'Stake' | 'Liq'
  loading: boolean
  amount: number
  amountTokenName: string
  purchase?: number
  purchaseTokenName?: string
  stakePool?: string
  transaction: Transaction
  status?: 'success' | 'error'
}

const clearRecentTransactions = () => localStorage.setItem('recentTransactions', JSON.stringify({}))

export function useRecentTransactions() {
  const { data: account } = useAccount()
  const networkdID = useCurrentSupportedNetworkId()

  const provider = useWebSocketProvider()

  const data = getRecentTransactions(account?.address, networkdID)
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending')

  const addRecentTransaction = (recentTx: RecentTransaction) => {
    data[recentTx.transaction.hash] = recentTx
    localStorage.setItem('recentTransactions', JSON.stringify(data))
    setStatus('pending')
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

const txStatus = {
  0: 'error',
  1: 'success',
}
