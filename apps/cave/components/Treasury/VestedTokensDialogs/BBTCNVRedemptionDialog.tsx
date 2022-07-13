import { BBTRedemptionContractV2 } from '@concave/core'
import { useDisclosure } from '@concave/ui'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import useBBTCNVRedeemable from '../Hooks/useBBTCNVRedeemable'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'
import { VestedTokenDialog } from './VestedTokenDialog'

export const BBBTCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = (props) => {
  const {
    isOpen: transactionSubmitted,
    onClose: onCloseTransactionModal,
    onOpen: SubmitTransactionModal,
  } = useDisclosure()
  const { onClose, isOpen } = props

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { data: redeemableData, isLoading } = useBBTCNVRedeemable()
  const { bbtCNV } = useVestedTokens()

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error'>('default')
  const [tx, setTx] = useState(undefined)

  const networdId = useCurrentSupportedNetworkId()
  const bbtCNVContract = new BBTRedemptionContractV2(concaveProvider(networdId))
  const balance = parseEther(bbtCNV?.data?.formatted || '0')
  const { registerTransaction } = useTransactionRegistry()
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
        isOpen={transactionSubmitted && tx}
        tx={tx}
      />
    </>
  )

  function redeem(amount: BigNumber, redeemMax: boolean) {
    setStatus('approve')
    bbtCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        registerTransaction(transaction, {
          type: 'redeem',
          amount: formatEther(amount) + ' bbtCNV',
        })
        setTx(transaction)
        SubmitTransactionModal()
        setStatus('default')
      })
      .catch((error) => {
        if (error.code === 4001) setStatus('rejected')
        else setStatus('error')

        setTimeout(() => {
          setStatus('default')
        }, 3000)
      })
  }
}
