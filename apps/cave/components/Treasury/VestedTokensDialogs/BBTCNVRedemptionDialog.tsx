import { Flex, Text, useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { bbtCNV_REDEMPTION_V2 } from 'contracts/VestedTokens/addresses'
import { bbtCNV_REDEMPTION_V2_ABI } from 'contracts/VestedTokens/BBTCNV_V2_ABI'
import { Contract, utils } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import useBBTCNVRedeemable from '../Hooks/useBBTCNVRedeemable'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'
import { VestedTokenDialog } from './VestedTokenDialog'

export const BBBTCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = (props) => {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { onClose, isOpen } = props
  const { data: signer } = useSigner()
  const { address, isConnected } = useAccount()

  const [tx, setTx] = useState<TransactionResponse>()
  const [error, setError] = useState('')

  const { data: redeemableData, isLoading } = useBBTCNVRedeemable()
  const { bbtCNVData } = useVestedTokens()

  const { registerTransaction } = useTransactionRegistry()
  const [redeemMax, setRedeemMax] = useState(true)
  const [value, setValue] = useState<string>()

  const balance = bbtCNVData?.formatted || '0'
  const redeemable = +utils.formatEther(redeemableData?.redeemable || 0)
  const redeemed = +utils.formatEther(redeemableData?.redeemed || 0)

  // Conditions
  const insufficientFunds = +balance === 0 || +value > +balance
  const nothingToRedeem = (redeemable === 0 || redeemable === +balance) && !insufficientFunds
  const redeemableExceeded = +value > redeemable && !insufficientFunds && !nothingToRedeem
  const validValue = !insufficientFunds && !nothingToRedeem && !redeemableExceeded

  const networdId = useCurrentSupportedNetworkId()

  const bbtCNVContract = new Contract(
    bbtCNV_REDEMPTION_V2[networdId],
    bbtCNV_REDEMPTION_V2_ABI,
    provider(networdId),
  )

  return (
    <VestedTokenDialog
      balance={parseEther(balance || '0')}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onRedeem={() => {}}
      pCNVData={redeemableData}
    />
  )
}

const Info = ({ title, value }: { title: string; value: string | number }) => (
  <Flex gap={2} fontWeight={'bold'} pl={2}>
    <Text textColor={'text.low'}>{title}</Text>
    <Text textColor={'text.accent'}>{value}</Text>
  </Flex>
)
