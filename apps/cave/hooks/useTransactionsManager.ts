import { Transaction } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { useQueries, useQueryClient } from 'react-query'
import { useLocalStorage } from 'react-use'
import { useAccount, useProvider } from 'wagmi'
import { ChainId, CNV, Currency, CurrencyAmount, Token } from '@concave/core'
import { Pair, Trade, TradeType } from '@concave/gemswap-sdk'

const TransactionType = {
  // approve: (transaction: Transaction, token: Token) => ({
  //   type: 'approve',
  //   transaction,
  //   labels: {
  //     pending: `Approving ${token.symbol}`,
  //     success: `Approved ${token.symbol}`,
  //     error: `Failed to approve ${token.symbol}`,
  //   },
  // }),
  swap: (transaction: Transaction, trade: Trade<Currency, Currency, TradeType>) => ({
    type: 'swap',
    transaction,
    labels: {
      pending: `Swapping ${trade.inputAmount.toString()} for ${trade.outputAmount.toString()}`,
      success: `Swapped ${trade.inputAmount.toString()} for ${trade.outputAmount.toString()}`,
      error: `Failed to swap ${trade.inputAmount.toString()} for ${trade.outputAmount.toString()}`,
    },
  }),
  addLiquidity: (
    transaction: Transaction,
    amount0: CurrencyAmount<Currency>,
    amount1: CurrencyAmount<Currency>,
  ) => ({
    type: 'add liquidity',
    transaction,
    labels: {
      pending: `Adding liquidity to ${amount0.currency.symbol}-${amount1.currency.symbol} pair`,
      success: `Added ${amount0.toString()} and ${amount1.toString()} to the liquidity pair`,
      error: `Failed to add ${amount0.currency.symbol}-${amount1.currency.symbol} liquidity`,
    },
  }),
  stake: (transaction: Transaction, amount: CurrencyAmount<Token>, poolName: string) => ({
    type: 'stake',
    transaction,
    labels: {
      pending: `Staking ${amount.toString()} in ${poolName}`,
      success: `${amount.toString()} Staked  in ${poolName}`,
      error: `Failed to stake ${amount.toString()} in ${poolName}`,
    },
  }),
  bond: (
    transaction: Transaction,
    amountIn: CurrencyAmount<Token>,
    amountOut: CurrencyAmount<Token>,
  ) => ({
    type: 'bond',
    transaction,
    labels: {
      pending: `Bonding ${amountIn.toString()} for ${amountOut.toString()}`,
      success: `Bonded ${amountIn.toString()} for ${amountOut.toString()}`,
      error: `Failed to bond ${amountIn.toString()} for ${amountOut.toString()}`,
    },
  }),
}

type RecentTransaction = {
  from: string
  hash: string
  chainId: ChainId
  status: 'pending' | 'success' | 'error'
  labels: {
    pending: string
    success: string
    error: string
  }
}

const waitTransaction = async (tx: RecentTransaction) => {
  try {
    await concaveProvider(tx.chainId).waitForTransaction(tx.hash)
    return { ...tx, status: 'success' }
  } catch (e) {
    return { ...tx, status: 'error' }
  }
}

export const useTransactionsManager = () => {
  const { data: account } = useAccount()
  const [transactions, setTransactions] = useLocalStorage<RecentTransaction[]>(
    `transactions ${account.address}`,
  )

  const transactionsQueries = useQueries(
    transactions.map((tx) => ({
      queryKey: tx.hash,
      queryFn: () => {
        if (tx.status === 'pending') return waitTransaction(tx)
        return tx
      },
    })),
  )

  return {
    registerTransaction: (transaction: RecentTransaction) => {
      // save last 10 txs
      setTransactions((lastTransactions) => [transaction, ...lastTransactions.slice(0, 9)])
    },
    lastTransactions: transactionsQueries.map((q) => q.data),
  }
}
