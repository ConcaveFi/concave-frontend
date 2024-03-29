import { Transaction } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { Address, useWaitForTransaction } from 'wagmi'
import { TransactionMeta, useAddRecentTransaction } from '../contexts/Transactions'
import { SendTransactionArgs, SendTransactionResult } from '@wagmi/core'

export type UseTransaction = ReturnType<typeof useTransaction>

export const useTransaction = (
  doTx: () => Promise<Transaction | SendTransactionResult>,
  extra: {
    onSend?: () => void
    onSuccess?: (tx: Transaction) => void
    onError?: (e: unknown) => void
    meta?: TransactionMeta
  } = {},
) => {
  const {
    current: { onError, onSend, onSuccess },
  } = useRef(extra)
  const registerTransaction = useAddRecentTransaction()
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false)
  const [error, setError] = useState<{ code: number; reason: string }>()
  const tx = useRef<Transaction & { hash: `0x${string}` }>()
  const { status } = useWaitForTransaction({
    hash: tx.current?.hash,
  })

  useEffect(() => {
    if (status === 'loading') {
      onSend?.()
    }
    if (status === 'success') {
      onSuccess?.(tx.current)
    }
  }, [onSend, onSuccess, status])

  const sendTx = async () => {
    setIsWaitingForConfirmation(true)
    try {
      const transaction = (await doTx()) as Transaction & { hash: `0x${string}`; from: Address }
      tx.current = transaction
      if (extra.meta) {
        registerTransaction({ hash: transaction.hash, meta: extra.meta })
      }
    } catch (e) {
      if (e[`code`] !== 4001) {
        onError?.(e)
        setError(e)
      }
    }
    setIsWaitingForConfirmation(false)
  }
  return {
    tx: tx.current,
    isWaitingForConfirmation,
    error,
    status,
    isError: !!error,
    isIdle: status === 'idle',
    isSucess: status === 'success',
    isWaitingTransactionReceipt: status === `loading`,
    sendTx,
  }
}
