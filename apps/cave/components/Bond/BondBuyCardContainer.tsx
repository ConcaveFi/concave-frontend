import { Stack, useToast } from '@concave/ui'
import React, { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { BondBuyCard } from './BondBuyCard'
import BondToastCard from './BondToastCard'

export default function BondBuyCardContainer(props: any) {
  const toast = useToast()
  const [bondTransaction, setBondTransaction] = useState<any>()
  const [amountInOut, setAmountInAndOut] = useState<{ in: number; out: number }>()

  const { data, error, isLoading } = useWaitForTransaction({ hash: bondTransaction?.hash })
  let currentStatus
  let currentHash

  console.log(isLoading)

  function closeToast() {
    if (toast.isActive(currentHash)) {
      toast.close(currentHash)
    }
  }

  function addToast() {
    if (typeof currentStatus !== 'undefined' && !toast.isActive(currentHash)) {
      const capitalizedStatus = currentStatus[0].toUpperCase() + currentStatus.slice(1)
      const title = `Transaction ${capitalizedStatus}`
      const link = `https://RINKEBY.etherscan.io/tx/${currentHash}`
      toast({
        id: currentHash,
        title: capitalizedStatus,
        position: 'top-right',
        description: ``,
        status: currentStatus,
        isClosable: true,
        // duration: null,
        duration: 10000,
        render: () => (
          <BondToastCard
            type={currentStatus}
            title={title}
            tx={currentHash}
            amountInOut={amountInOut}
            link={link}
          />
        ),
      })
    }
    currentStatus = undefined
  }

  useEffect(() => {
    console.log('bondTx useEffect')
    if (typeof currentHash === 'undefined') {
      currentStatus = 'info'
    }
    if (typeof bondTransaction !== 'undefined') {
      console.log('bondTx in condition', currentHash)
      currentHash = bondTransaction?.hash
      console.log('currentHash', currentHash)
    }
  }, [bondTransaction])

  useEffect(() => {
    console.log(data, isLoading, error)
    let showToast = false
    if (isLoading) {
      console.log('is loading', isLoading)
      currentStatus = 'info'
      showToast = true
    } else if (data) {
      // console.log(data)
      currentStatus = 'success'
      showToast = true
    } else if (error) {
      // console.log(error)
      currentStatus = 'error'
      showToast = true
    }
    showToast && addToast()
  }, [data, isLoading, error])

  const parentProps = {
    bondTransaction: bondTransaction,
    setBondTransaction: setBondTransaction,
    setAmountInAndOut: setAmountInAndOut,
  }
  return (
    <>
      {/* <TxToast /> */}
      <BondBuyCard {...props} {...parentProps} />
    </>
  )
}

function TxToast(props: any) {
  return <Stack isInline spacing={2}></Stack>
}
