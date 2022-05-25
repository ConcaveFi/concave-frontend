import { Transaction } from 'ethers'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useWaitForTransaction } from 'wagmi'
import { useIsMounted } from './useIsMounted'

const clearRecentTransactions = () => localStorage.clear()

export function useRecentTransactions() {
  const wait = useWaitForTransaction()[1]
  const isMounted = useIsMounted()
  const data = isMounted ? getRecentTransactions() : new Map<String, RecentTransaction>()
  const [txData, setTxData] = useState<RecentTransaction[]>(
    JSON.parse(localStorage.getItem('recentTransactions2') || '[]'),
  )
  const [verified, setVerified] = useState(false)

  const [test, setTest] = useState(0)

  const addRecentTransaction = (recentTx: RecentTransaction) => {
    data.set(recentTx.transaction.hash, recentTx)
    setTxData((oldData) => {
      const newData = [...oldData, recentTx]
      localStorage.setItem('recentTransactions2', JSON.stringify(newData))
      return newData
    })
    localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
  }

  useQuery(['transactions'], async () => {
    if (data.size === 0) return false
    if (anyPendingTx) return false

    console.log('entered here')
    txData
      .filter((recentTx) => recentTx.loading)
      .map(
        (value) => wait({ hash: value.transaction.hash }),
        // .then((tx) => {
        //   console.log('finished')
        //   data.set(value.transaction.hash, { ...value, loading: tx.data.status === 2 })
        //   localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
        // })
        // .catch((e) => {}),
      )
  })

  const anyPendingTx = Array.from(data).filter((value) => value[1].loading).length > 0

  // useEffect(() => {
  //   if (!verified && data.size > 0 && anyPendingTx) {
  //     console.log('entered here')
  //     data.forEach((value) => {
  //       if (!value.loading) return

  //       wait({ hash: value.transaction.hash })
  //         .then((e) => {
  //           console.log('finished')
  //           data.set(value.transaction.hash, { ...value, loading: e.data.status === 2 })
  //           localStorage.setItem('recentTransactions', JSON.stringify(Array.from(data)))
  //         })
  //         .catch((e) => {})
  //     })
  //   }

  //   setVerified(true)
  // }, [data])

  // console.log(anyPendingTx)

  return {
    test,
    anyPendingTx,
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
