import { Modal, Card, Text, Flex, Button, useDisclosure, Link } from '@concave/ui'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { Contract, Transaction } from 'ethers'
import { useGet_User_Acnv_RedeemedQuery } from 'graphql/generated/graphql'
import { aCNVredeemabi } from 'lib/contractoABI'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useConnect, useSigner } from 'wagmi'
import useVestedTokens from '../Hooks/useVestedTokens'

interface ACNVRedemptionDialogProps {
  onClose: () => void
  isOpen: boolean
}

export default function ACNVRedemptionDialog(props: ACNVRedemptionDialogProps) {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { onClose, isOpen } = props

  const { data: signer } = useSigner()
  const { data: account } = useAccount()
  const { isConnected } = useConnect()

  const [tx, setTx] = useState<Transaction>()
  const [error, setError] = useState('')

  const aCNVContract = new Contract(
    '0x38baBedCb1f226B49b2089DA0b84e52b6181Ca59',
    aCNVredeemabi,
    provider(1),
  )
  const { data, isLoading } = useGet_User_Acnv_RedeemedQuery({
    address: account?.address,
  })
  const redeemed: number = data?.logACNVRedemption[0]?.amount || 0
  const txHash = data?.logACNVRedemption[0]?.txHash || ''

  const { aCNVData, loadingACNV } = useVestedTokens()
  const validBalance = +aCNVData?.formatted > 0
  const alreadyRedeemed = redeemed === +aCNVData?.formatted
  const canRedeem = validBalance && !alreadyRedeemed
  function redeem() {
    onOpenConfirm()
    aCNVContract
      .connect(signer)
      .redeem(account?.address)
      .then((tx) => {
        onCloseConfirm()
        setTx(tx)
        onOpenSub()
      })
      .catch((e) => {
        onCloseConfirm()
        setError('Transaction Rejected')
        onOpenError()
      })
  }

  return (
    <>
      <Modal
        bluryOverlay
        title="Redeem aCNV"
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        preserveScrollBarGap
        isCentered
      >
        <Card gap={4} width={'340px'} height="220px" m={-6} justify="center" px={5}>
          <Flex
            direction={'column'}
            width="full"
            shadow={'Down Medium'}
            rounded="2xl"
            height={'100px'}
            justify={'center'}
            py={4}
            px={3}
            fontSize={'18'}
          >
            <Flex gap={'2'} align={'center'} width={'full'}>
              <Text textColor={'text.low'} fontWeight="bold">
                Current balance:
              </Text>
              <Text textColor={'text.accent'} fontWeight="bold">
                {(!loadingACNV && aCNVData?.formatted) || '0'}
                {loadingACNV && 'loading...'}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text color={'text.low'} fontWeight="bold">
                Redeemed:
              </Text>
              <Text textColor={'text.accent'} fontWeight="bold">
                {!isLoading && redeemed}
                {isLoading && 'loading...'}
              </Text>
            </Flex>
            {txHash && (
              <Link
                isExternal
                href={`https://etherscan.io/tx/${data?.logACNVRedemption[0].txHash}`}
                fontWeight={'bold'}
                textColor="text.low"
                fontSize={'13'}
              >
                Show tx on explorer
              </Link>
            )}
          </Flex>
          <Button
            onClick={() => {
              if (!canRedeem) return
              redeem()
            }}
            py={2}
            fontSize="22"
            variant={'primary.outline'}
            width="full"
            shadow={'Up Small'}
            textColor={!canRedeem && 'text.low'}
            _hover={canRedeem && { shadow: 'up' }}
            cursor={!canRedeem && 'default'}
            _active={{}}
            _focus={{}}
          >
            {!isConnected && 'Not Connected'}
            {!validBalance && isConnected && 'Insufficient Balance'}
            {isConnected && canRedeem && 'Redeem'}
            {isConnected && !canRedeem && validBalance && 'Nothing To Redeem'}
          </Button>
        </Card>
      </Modal>
      <WaitingConfirmationDialog isOpen={isConfirmOpen} />
      <TransactionSubmittedDialog isOpen={isSubOpen} closeParentComponent={onCloseSub} tx={tx} />
      <TransactionErrorDialog
        error={error}
        isOpen={isErrorOpen}
        closeParentComponent={onCloseError}
      />
    </>
  )
}
