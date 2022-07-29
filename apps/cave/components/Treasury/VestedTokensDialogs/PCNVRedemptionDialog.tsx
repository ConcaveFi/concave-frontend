import { PCNV, PCNVContract } from '@concave/core'
import { useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/providers'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useGet_Amm_Cnv_InfosQuery } from 'graphql/generated/graphql'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
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

  const { data } = useGet_Amm_Cnv_InfosQuery()

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error' | 'submitted'>(
    'default',
  )
  const [tx, setTx] = useState<TransactionResponse>()

  const { pCNV } = useVestedTokens()
  const { data: pCNVData, isLoading } = usePCNVUserData()
  const pCNVInitialSupply = 33300000
  const pCNV10PercentClaim = (data?.cnvData?.data?.totalSupply || 0) * 0.1
  const pCNVToCNVDifference = pCNV10PercentClaim / pCNVInitialSupply

  const chainId = useCurrentSupportedNetworkId()
  const balance = parseEther(pCNV?.data?.formatted || '0')
  const { registerTransaction } = useTransactionRegistry()
  const onCloseModal = () => {
    setStatus('default')
    onCloseTransactionModal()
  }
  return (
    <>
      <VestedTokenDialog
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onRedeem={redeem}
        status={status}
        tokenUserData={{ ...pCNVData, balance }}
        token={PCNV}
        conversionToCNV={pCNVToCNVDifference || 1}
      />

      <TransactionErrorDialog
        error={{ rejected: 'Transaction rejected' }[status] || 'An error occurred'}
        isOpen={(transactionSubmitted && status === 'error') || status === 'rejected'}
        closeParentComponent={onCloseModal}
      />
      <TransactionSubmittedDialog
        closeParentComponent={onCloseModal}
        isOpen={transactionSubmitted && Boolean(tx) && status === 'submitted'}
        tx={tx}
      />
    </>
  )
  function redeem(amount: BigNumber, redeemMax: boolean) {
    const pCNVContract = new PCNVContract(provider)
    setStatus('approve')
    pCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        registerTransaction(transaction, {
          type: 'redeem',
          amount: `${formatEther(amount)} pCNV`,
        })
        setTx(transaction)
        submitTransactionModal()
        setStatus('submitted')
      })
      .catch((error) => {
        if (error.code === 4001) setStatus('rejected')
        else setStatus('error')
      })
  }
}
