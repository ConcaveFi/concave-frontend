import { PCNVContract } from '@concave/core'
import { useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/providers'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { usePCNVUserData } from '../Hooks/usePCNVUserData'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'
import { VestedTokenDialog } from './VestedTokenDialog'

export const PCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = ({ isOpen, onClose }) => {
  const {
    isOpen: transactionSubmitted,
    onClose: onCloseTransactionModal,
    onOpen: submitTransactionModal,
  } = useDisclosure()

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { bbtCNV } = useVestedTokens()
  const provider = useProvider()

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error'>('default')
  const [tx, setTx] = useState<TransactionResponse>()

  const { data: pCNVRedeemableData, isLoading } = usePCNVUserData()
  const { pCNV } = useVestedTokens()

  const balance = parseEther(pCNV?.data?.formatted || '0')
  const { registerTransaction } = useTransactionRegistry()
  return (
    <>
      <VestedTokenDialog
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onRedeem={redeem}
        status={status}
        tokenUserData={{ ...pCNVRedeemableData, balance }}
        title="Redeem pCNV"
      />

      <TransactionSubmittedDialog
        closeParentComponent={onCloseTransactionModal}
        isOpen={transactionSubmitted && Boolean(tx)}
        tx={tx}
      />
    </>
  )
  function redeem(amount: BigNumber, redeemMax: boolean) {
    const bbtCNVContract = new PCNVContract(provider)
    setStatus('approve')
    bbtCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        registerTransaction(transaction, {
          type: 'redeem',
          amount: `${formatEther(amount)} pCNV`,
        })
        setTx(transaction)
        submitTransactionModal()
        setStatus('default')
      })
      .catch((error) => {
        if (error.code === 4001) setStatus('rejected')
        else setStatus('error')

        const cleanButtonState = setTimeout(() => {
          setStatus('default')
          clearTimeout(cleanButtonState)
        }, 3000)
      })
  }
}
