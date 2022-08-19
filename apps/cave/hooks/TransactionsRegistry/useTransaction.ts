import { Transaction } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { TrackedTransaction, useTransactionRegistry } from '.'

export type UseTransaction = ReturnType<typeof useTransaction>

export const useTransaction = (
  doTx: () => Promise<Transaction>,
  extra: {
    onSend?: () => void
    onSuccess?: (tx: Transaction) => void
    onError?: (e: unknown) => void
    meta?: TrackedTransaction['meta']
  } = {},
) => {
  const {
    current: { onError, onSend, onSuccess },
  } = useRef(extra)
  const { registerTransaction } = useTransactionRegistry()
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false)
  const [error, setError] = useState()
  const tx = useRef<Transaction>()
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
      const transaction = await doTx()
      tx.current = transaction
      if (extra.meta) {
        registerTransaction(transaction, extra.meta)
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
    isError: !!error,
    isSucess: status === 'success',
    isWaitingTransactionReceipt: status === `loading`,
    sendTx,
  }
}
