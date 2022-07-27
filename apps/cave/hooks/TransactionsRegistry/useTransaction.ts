import { Transaction } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { TrackedTransaction, useTransactionRegistry } from '.'

export type UseTransaction = ReturnType<typeof useTransaction>

export const useTransaction = (
  fn: () => Promise<Transaction>,
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
  const [isWaitingForConfirmation, setisWaitingForConfirmation] = useState(false)
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
  }, [onSended, onSuccess, status])

  const sendTx = async () => {
    setisWaitingForConfirmation(true)
    try {
      const transaction = await fn()
      setisWaitingForConfirmation(false)
      tx.current = transaction
      registerTransaction(transaction, extra.meta)
    } catch (e) {
      if (e[`code`] !== 4001) {
        onError?.(e)
        setError(e)
      }
      setisWaitingForConfirmation(false)
    }
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
