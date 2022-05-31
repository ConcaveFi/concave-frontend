import { Button, Card, Flex, Modal, Text, NumericInput, useDisclosure } from '@concave/ui'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract, Transaction, utils } from 'ethers'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useConnect, useSigner } from 'wagmi'
import useBBTCNVRedeemable from '../Hooks/useBBTCNVRedeemable'
import useVestedTokens from '../Hooks/useVestedTokens'
interface BBBTCNVRedemptionDialogProps {
  onClose: () => void
  isOpen: boolean
}

export default function BBBTCNVRedemptionDialog(props: BBBTCNVRedemptionDialogProps) {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { onClose, isOpen } = props
  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()
  const [{ data: wallet }] = useConnect()

  const [tx, setTx] = useState<Transaction>()
  const [error, setError] = useState('')

  const { data: redeemableData, isLoading } = useBBTCNVRedeemable()
  const { bbtCNVData } = useVestedTokens()

  const balance = +bbtCNVData?.formatted || 0
  const redeemable =
    (!isLoading && redeemableData && +utils.formatEther(redeemableData?.redeemable)) || 0
  const redeemed =
    (!isLoading && redeemableData && +utils.formatEther(redeemableData?.redeemed)) || 0

  // booleans
  const insufficientFounds = balance === 0
  const nothingToRedeem = (redeemable === 0 || redeemable === balance) && !insufficientFounds
  const validValue = !insufficientFounds && !nothingToRedeem

  const bbtCNVContract = new Contract(
    '0x16F9746C0ADAAD0086b51A1a5221298E5254D906',
    RedeemBBT_CNV_Abi,
    provider(1),
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
        <Card width={'300px'} height="200px" m={-6}>
          {/* Input Container */}
          <Flex
            mt={4}
            width={'270px'}
            height="124px"
            shadow={'Down Medium'}
            rounded="2xl"
            mx={'auto'}
            direction="column"
            py={2}
            px={4}
            gap={2}
          >
            <Flex width={'full'} justify="space-between" fontWeight={'bold'}>
              <Text textColor={'text.low'}>Current Balance:</Text>
              <Text textColor={'text.accent'}>{balance.toFixed(2)} bbtCNV</Text>
            </Flex>
            <Flex width={'full'} justify="space-between" fontWeight={'bold'}>
              <Text textColor={'text.low'}>Redeemable:</Text>
              <Text textColor={'text.accent'}>
                {!isLoading && '' + redeemable.toFixed(8)}
                {isLoading && 'Loading...'}
              </Text>
            </Flex>
            <Flex width={'full'} justify="space-between" fontWeight={'bold'}>
              <Text textColor={'text.low'}>Redeemed:</Text>
              <Text textColor={'text.accent'}>
                {!isLoading && '' + redeemed.toFixed(8)}
                {isLoading && 'Loading...'}
              </Text>
            </Flex>
          </Flex>

          <Button
            onClick={() => {
              if (!validValue) return
              onOpenConfirm()
              bbtCNVContract
                .connect(signer)
                .redeem(redeemableData.redeemable, account?.address, account?.address, true)
                .then((tx) => {
                  onCloseConfirm()
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
            cursor={!validValue && 'default'}
            shadow={validValue ? 'Up Small' : 'down'}
            fontSize={'20'}
            height={'55px'}
            width="270px"
            mx={'auto'}
            variant="primary.outline"
            my={4}
            textColor={!validValue && 'text.low'}
            _active={validValue && { transform: 'scale(0.9)' }}
            _hover={validValue && { shadow: 'up' }}
            _focus={{}}
          >
            {wallet?.connected ? (
              <Text>
                {nothingToRedeem && 'Nothing To Redeem'}
                {insufficientFounds && 'Insufficient Founds'}
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
