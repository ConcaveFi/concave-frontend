export { getTransactionStatusLabel } from './getTransactionStatusLabel'
export { TransactionsContext } from './TransactionsContext'
export type { TransactionMeta } from './getTransactionStatusLabel'

import {
  useRecentTransactions as _useRecentTransactions,
  useAddRecentTransaction as _useAddRecentTransaction,
  TypedUseRecentTransactions,
  TypedUseAddRecentTransaction,
} from '@pcnv/txs-react'
import type { TransactionMeta } from './getTransactionStatusLabel'

export const useRecentTransactions: TypedUseRecentTransactions<TransactionMeta> =
  _useRecentTransactions
export const useAddRecentTransaction: TypedUseAddRecentTransaction<TransactionMeta> =
  _useAddRecentTransaction
