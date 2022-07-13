import { BBTRedemptionContractV2 } from '@concave/core'
import { Flex, Text, useDisclosure } from '@concave/ui'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
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
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const { data: redeemableData, isLoading } = useBBTCNVRedeemable()
  const { bbtCNV } = useVestedTokens()
  const [status, setStatus] = useState<'default' | 'approve' | 'rejected'>('default')

  const [tx, setTx] = useState(undefined)

  const networdId = useCurrentSupportedNetworkId()
  const bbtCNVContract = new BBTRedemptionContractV2(concaveProvider(networdId))

  const redeem = (amount: BigNumber, redeemMax: boolean) => {
    setStatus('approve')
    bbtCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        setTx(transaction)
        SubmitTransactionModal()
        setStatus('default')
      })
      .catch((error) => {
        console.log('teste')
        setStatus('rejected')
        setTimeout(() => {
          setStatus('default')
        }, 3000)
      })
  }

  return (
    <>
      <VestedTokenDialog
        status={status}
        balance={parseEther(bbtCNV?.data?.formatted || '0')}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onRedeem={redeem}
        pCNVData={redeemableData}
      />
      <TransactionSubmittedDialog
        closeParentComponent={onCloseTransactionModal}
        isOpen={transactionSubmitted && tx}
        tx={tx}
      />
    </>
  )
}

const Info = ({ title, value }: { title: string; value: string | number }) => (
  <Flex gap={2} fontWeight={'bold'} pl={2}>
    <Text textColor={'text.low'}>{title}</Text>
    <Text textColor={'text.accent'}>{value}</Text>
  </Flex>
)
