import { Stack, useToast } from '@concave/ui'
import React, { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { BondBuyCard } from './BondBuyCard'
import BondToastCard from './BondToastCard'

export default function BondBuyCardContainer(props: any) {
  const toast = useToast()
  const [bondTransaction, setBondTransaction] = useState<any>()
  const [amountInOut, setAmountInAndOut] = useState<any>()

  const [{ data, error, loading }, wait] = useWaitForTransaction({ hash: bondTransaction?.hash })
  let currentStatus
  let currentHash

  console.log(loading)

  function addToast() {
    if (typeof currentStatus !== 'undefined' && !toast.isActive(currentHash)) {
      const capitalizedStatus = currentStatus[0].toUpperCase() + currentStatus.slice(1)
      const title = `Transaction ${capitalizedStatus}`
      const link = `https://ropsten.etherscan.io/tx/${currentHash}`
      toast({
        id: currentHash,
        title: capitalizedStatus,
        position: 'top-right',
        description: ``,
        status: currentStatus,
        isClosable: true,
        render: () => <BondToastCard type={currentStatus} title={title} link={link} />,
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
    console.log(data, loading, error)
    let showToast = false
    // if (loading) {
    // console.log('is loading', loading)
    // currentStatus = 'info'
    // showToast = true
    // } else
    if (data) {
      // console.log(data)
      currentStatus = 'success'
      showToast = true
    } else if (error) {
      // console.log(error)
      currentStatus = 'error'
      showToast = true
    }
    showToast && addToast()
  }, [data, loading, error])

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
