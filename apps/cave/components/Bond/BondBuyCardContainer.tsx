import { Stack, useToast } from '@concave/ui'
import React, { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { BondBuyCard } from './BondBuyCard'

export default function BondBuyCardContainer(props: any) {
  const toast = useToast()
  const [bondTransaction, setBondTransaction] = useState<any>()

  const [{ data, error, loading }, wait] = useWaitForTransaction({ hash: bondTransaction?.hash })
  let currentStatus
  let currentHash

  console.log(loading)

  function addToast() {
    if (typeof currentStatus !== 'undefined' && !toast.isActive(currentHash)) {
      toast({
        id: currentHash,
        title: currentHash,
        position: 'top-right',
        description: ``,
        status: currentStatus,
        isClosable: true,
      })
    }
    currentStatus = undefined
  }

  useEffect(() => {
    console.log('bondTx useEffect')
    if (typeof bondTransaction !== 'undefined') {
      console.log('bondTx in condition', currentHash)
      currentHash = bondTransaction?.hash
      console.log('currentHash', currentHash)
    }
  }, [bondTransaction])

  useEffect(() => {
    console.log(data, loading, error)
    if (loading) {
      console.log('is loading', loading)
      currentStatus = 'info'
      // addToast()
    }
    if (data) {
      console.log(data)
      currentStatus = 'success'
      // addToast()
    }
    if (error) {
      console.log(error)
      currentStatus = 'error'
    }
    addToast()
  }, [data, loading, error])

  const parentProps = {
    bondTransaction: bondTransaction,
    setBondTransaction: setBondTransaction,
  }
  return (
    <>
      <TxToast />
      <BondBuyCard {...props} {...parentProps} />
    </>
  )
}

function TxToast(props: any) {
  return <Stack isInline spacing={2}></Stack>
}
