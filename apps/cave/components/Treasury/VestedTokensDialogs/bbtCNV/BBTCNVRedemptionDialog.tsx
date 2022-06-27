import { InfoIcon } from '@concave/icons'
import {
  Button,
  Card,
  Flex,
  InputLeftAddon,
  Modal,
  Text,
  Tooltip,
  useDisclosure,
} from '@concave/ui'
import { ToggleButton } from 'components/ToggleButton'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { bbtCNV_REDEMPTION_V2 } from 'contracts/VestedTokens/addresses'
import { bbtCNV_REDEMPTION_V2_ABI } from 'contracts/VestedTokens/BBTCNV_V2_ABI'
import { Contract, Transaction, utils } from 'ethers'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { parseEther } from 'ethers/lib/utils'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useConnect, useSigner } from 'wagmi'
import useBBTCNVRedeemable from '../../Hooks/useBBTCNVRedeemable'
import useVestedTokens from '../../Hooks/useVestedTokens'
import { BBT_CNVDialogInput } from './BbtCNVDialogInput'
interface BBBTCNVRedemptionDialogProps {
  onClose: () => void
  isOpen: boolean
}

export default function BBBTCNVRedemptionDialog(props: BBBTCNVRedemptionDialogProps) {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { onClose, isOpen } = props
  const { data: signer } = useSigner()
  const { data: account } = useAccount()
  const { isConnected } = useConnect()

  const [tx, setTx] = useState<Transaction>()
  const [error, setError] = useState('')

  const { data: redeemableData, isLoading } = useBBTCNVRedeemable()
  const { bbtCNVData } = useVestedTokens()

  const { registerTransaction } = useTransactionRegistry()
  const [redeemMax, setRedeemMax] = useState(false)
  const [value, setValue] = useState<string>()

  const balance = bbtCNVData?.formatted || '0'
  const redeemable = +utils.formatEther(redeemableData?.redeemable || 0)
  const redeemed = +utils.formatEther(redeemableData?.redeemed || 0)

  // Conditions
  const insufficientFunds = +balance === 0 || +value > +balance
  const redeemableExceeded = +value > redeemable && !insufficientFunds
  const invalidValue = utils.parseEther(value || '0').isZero() && !redeemMax
  const nothingToRedeem = (redeemable === 0 || redeemable === +balance) && !insufficientFunds
  const validValue = !insufficientFunds && !nothingToRedeem && !invalidValue && !redeemableExceeded

  const networdId = useCurrentSupportedNetworkId()

  const bbtCNVContract = new Contract(
    bbtCNV_REDEMPTION_V2[networdId],
    bbtCNV_REDEMPTION_V2_ABI,
    provider(networdId),
  )

  return (
    <>
      <Modal
        title="Redeem bbtCNV"
        bluryOverlay
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <Card width={'340px'} height="280px" m={-6} px={6} gap={2} justify="center">
          <BBT_CNVDialogInput
            redeemable={String(redeemable)}
            redeemMax={redeemMax}
            balance={balance}
            onChangeValue={setValue}
            value={value}
          />
          <Flex direction={'column'} fontSize="14px">
            <Info title="Redeemable:" value={isLoading ? 'Loading...' : redeemable} />
            <Info title="Redeemed:" value={isLoading ? 'Loading...' : redeemed} />
          </Flex>
          <Flex gap={2} fontWeight={'bold'} pl={2} align="center">
            <Text textColor={'gray.200'}>Redeem max?</Text>
            <ToggleButton
              onActivate={() => setRedeemMax(true)}
              onDisable={() => setRedeemMax(false)}
            />
            <Tooltip
              textColor={'white'}
              bg="text.low"
              textShadow={'0px 0px 10px #333'}
              fontWeight={'bold'}
              fontSize="13px"
              textAlign="center"
              label="Attempts to redeem all of your currently available bbtCNV."
            >
              <InfoIcon color={'text.low'} cursor="pointer" />
            </Tooltip>
          </Flex>
          <Button
            cursor={!validValue && 'default'}
            shadow={'Up Small'}
            fontSize={'20'}
            height={'55px'}
            width="full"
            variant={'secondary'}
            textColor={!validValue && 'text.low'}
            _active={validValue && { transform: 'scale(0.9)' }}
            _hover={validValue && { shadow: 'up' }}
            _focus={{}}
            onClick={() => {
              if (!validValue) return
              onOpenConfirm()
              bbtCNVContract
                .connect(signer)
                .redeem(parseEther(String(value || '0')), account?.address, redeemMax)
                .then((tx) => {
                  onCloseConfirm()
                  registerTransaction(tx, {
                    type: 'redeem',
                    amount: `${bbtCNVData.formatted} bbtCNV`,
                  })
                  setTx(tx)
                  onOpenSub()
                })
                .catch((e) => {
                  console.log(e)
                  setError('Transaction rejected')
                  onOpenError()
                  onCloseConfirm()
                })
            }}
          >
            {isConnected ? (
              <Text>
                {invalidValue && 'Invalid Value'}
                {redeemableExceeded && 'Redeemable Exceeded'}
                {nothingToRedeem && 'Nothing To Redeem'}
                {insufficientFunds && 'Insufficient Funds'}
                {validValue && 'Redeem'}
              </Text>
            ) : (
              'Not Connected'
            )}
          </Button>
        </Card>
      </Modal>
      <TransactionSubmittedDialog isOpen={isSubOpen} tx={tx} closeParentComponent={onCloseSub} />
      <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      <TransactionErrorDialog error={error} isOpen={isErrorOpen} />
    </>
  )
}

const Info = ({ title, value }: { title: string; value: string | number }) => (
  <Flex gap={2} fontWeight={'bold'} pl={2}>
    <Text textColor={'text.low'}>{title}</Text>
    <Text textColor={'text.accent'}>{value}</Text>
  </Flex>
)