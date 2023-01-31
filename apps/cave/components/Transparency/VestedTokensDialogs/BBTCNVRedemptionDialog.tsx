import { BBTCNV_ADDRESS, BBTRedemptionContractV2, Token } from '@concave/core'
import { useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { TransactionErrorDialog } from 'components/TransactionDialog/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { Address, useAccount, useSigner } from 'wagmi'
import useBBTCNVRedeemable from '../Hooks/useBBTCNVRedeemable'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'
import { VestedTokenDialog } from './VestedTokenDialog'

export const BBTCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = (props) => {
  const {
    isOpen: transactionSubmitted,
    onClose: onCloseTransactionModal,
    onOpen: submitTransactionModal,
  } = useDisclosure()
  const { onClose, isOpen } = props

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { data: redeemableData, isLoading } = useBBTCNVRedeemable()
  const { bbtCNV } = useVestedTokens()

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error' | 'submitted'>(
    'default',
  )
  const [tx, setTx] = useState<TransactionResponse>()

  const networdId = useCurrentSupportedNetworkId()
  const balance = parseEther(bbtCNV?.data?.formatted || '0')
  const { registerTransaction } = useTransactionRegistry()

  function redeem(amount: BigNumber, redeemMax: boolean) {
    const bbtCNVContract = new BBTRedemptionContractV2(concaveProvider(networdId))
    setStatus('approve')
    bbtCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        registerTransaction(transaction.hash as Address, {
          type: 'redeem',
          amount: formatEther(amount) + ' bbtCNV',
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

  const onCloseModal = () => {
    setStatus('default')
    onCloseTransactionModal()
  }
  return (
    <>
      <VestedTokenDialog
        status={status}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onRedeem={redeem}
        tokenUserData={{ ...redeemableData, balance }}
        token={new Token(networdId, BBTCNV_ADDRESS[networdId], 18, 'bbtCNV')}
      />
      <TransactionErrorDialog
        error={{ rejected: 'Transaction rejected' }[status] || 'An error occurred'}
        isOpen={(transactionSubmitted && status === 'error') || status === 'rejected'}
        closeParentComponent={onCloseModal}
      />
      <TransactionSubmittedDialog
        closeParentComponent={onCloseModal}
        isOpen={transactionSubmitted && Boolean(tx) && status === 'submitted'}
        txHash={tx.hash as `0x${string}`}
      />
    </>
  )
}
