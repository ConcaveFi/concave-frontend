import { PCNVContract, PCNV_CONTRACT, Token } from '@concave/core'
import { useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/providers'
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
  const pCNVToCNVDifference = ((data?.cnvData?.data?.totalSupply || 0) * 0.1) / 33000000

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error'>('default')
  const [tx, setTx] = useState<TransactionResponse>()

  const { data: pCNVRedeemableData, isLoading } = usePCNVUserData()
  const { pCNV } = useVestedTokens()

  const chainId = useCurrentSupportedNetworkId()
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
        token={new Token(chainId, PCNV_CONTRACT[chainId], 18, 'pCNV')}
        conversionToCNV={pCNVToCNVDifference || 0}
      />

      <TransactionSubmittedDialog
        closeParentComponent={onCloseTransactionModal}
        isOpen={transactionSubmitted && Boolean(tx)}
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
        setStatus('default')
      })
      .catch((error) => {
        if (error.code === 4001) setStatus('rejected')
        else setStatus('error')
      })
  }
}
