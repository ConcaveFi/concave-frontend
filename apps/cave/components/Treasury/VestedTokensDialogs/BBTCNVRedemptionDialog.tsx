import { BBTRedemptionContractV2 } from '@concave/core'
import { useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/providers'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
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

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error'>('default')
  const [tx, setTx] = useState<TransactionResponse>()

  const networdId = useCurrentSupportedNetworkId()
  const balance = parseEther(bbtCNV?.data?.formatted || '0')
  const { registerTransaction } = useTransactionRegistry()

  useEffect(() => {
    if (status !== 'error' && status !== 'rejected') return
    const clearButtonTimeout = setTimeout(() => setStatus('default'), 3000)
    return () => clearTimeout(clearButtonTimeout)
  }, [status])

  return (
    <>
      <VestedTokenDialog
        status={status}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onRedeem={redeem}
        tokenUserData={{ ...redeemableData, balance }}
        title={'Redeem bbtCNV'}
      />
      <TransactionSubmittedDialog
        closeParentComponent={onCloseTransactionModal}
        isOpen={transactionSubmitted && Boolean(tx)}
        tx={tx}
      />
    </>
  )

  function redeem(amount: BigNumber, redeemMax: boolean) {
    const bbtCNVContract = new BBTRedemptionContractV2(concaveProvider(networdId))
    setStatus('approve')
    bbtCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        registerTransaction(transaction, {
          type: 'redeem',
          amount: formatEther(amount) + ' bbtCNV',
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
