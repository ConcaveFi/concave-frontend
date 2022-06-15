import { InfoIcon } from '@concave/icons'
import { Button, Card, Flex, Modal, Text, Tooltip, useDisclosure } from '@concave/ui'
import { ToggleButton } from 'components/ToggleButton'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract, Transaction, utils } from 'ethers'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { MdInfo } from 'react-icons/md'
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

  const balance = +bbtCNVData?.formatted || 0
  const redeemable = +utils.formatEther(redeemableData?.redeemable || 0)
  const redeemed = +utils.formatEther(redeemableData?.redeemed || 0)

  // booleans
  const insufficientFounds = balance === 0
  const nothingToRedeem = (redeemable === 0 || redeemable === balance) && !insufficientFounds
  const validValue = !insufficientFounds && !nothingToRedeem

  const [useMax, setUseMax] = useState(false)
  const [value, setValue] = useState<number>()

  const bbtCNVContract = new Contract(
    '0xCf6B82Ca69bE4272d457c246FAF380f88af34f69',
    RedeemBBT_CNV_Abi,
    provider(4),
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
            balance={balance}
            redeemable={redeemable}
            onChangeValue={setValue}
            value={value}
          />
          <Flex direction={'column'} fontSize="14px">
            <Info title="Redeemable:" value={isLoading ? 'Loading...' : redeemable} />
            <Info title="Redeemed:" value={isLoading ? 'Loading...' : redeemed} />
          </Flex>
          <Flex gap={2} fontWeight={'bold'} pl={2} align="center">
            <Text textColor={'gray.200'}>Try redeem max?</Text>
            <ToggleButton onActivate={() => setUseMax(true)} onDisable={() => setUseMax(false)} />
            <Tooltip
              textColor={'white'}
              bg="text.low"
              textShadow={'0px 0px 10px #333'}
              fontWeight={'bold'}
              fontSize="13px"
              textAlign="center"
              label="If this option it's enabled, the contract will try to redeem all your redeemable amount"
            >
              <InfoIcon color={'text.low'} cursor="pointer" />
            </Tooltip>
          </Flex>
          <Button
            cursor={!validValue && 'default'}
            shadow={validValue ? 'Up Small' : 'down'}
            fontSize={'20'}
            height={'55px'}
            width="full"
            variant="primary.outline"
            textColor={!validValue && 'text.low'}
            _active={validValue && { transform: 'scale(0.9)' }}
            _hover={validValue && { shadow: 'up' }}
            _focus={{}}
            onClick={() => {
              if (!validValue) return
              onOpenConfirm()
              bbtCNVContract
                .connect(signer)
                .redeem(redeemableData.redeemable, account?.address, account?.address, true)
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
                {nothingToRedeem && 'Nothing To Redeem'}
                {insufficientFounds && 'Insufficient Funds'}
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
