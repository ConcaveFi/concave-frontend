import { Modal, Card, Text, Flex, Button, useDisclosure } from '@concave/ui'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { Contract, Transaction } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { aCNVredeemabi } from 'lib/contractoABI'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

interface ACVNRedemptionDialogProps {
  onClose: () => void
  isOpen: boolean
}

export default function ACVNRedemptionDialog(props: ACVNRedemptionDialogProps) {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { onClose, isOpen } = props

  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()
  const networkdId = useCurrentSupportedNetworkId()
  const aCNVContract = new Contract(
    '0x38baBedCb1f226B49b2089DA0b84e52b6181Ca59',
    aCNVredeemabi,
    provider(networkdId),
  )

  const [tx, setTx] = useState<Transaction>()
  const [error, setError] = useState('')

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
        title="Redeem aCVN"
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        preserveScrollBarGap
        isCentered
      >
        <Card gap={4} width={'300px'} height="240px" m={-6} justify="center" align={'center'}>
          <Flex
            direction={'column'}
            shadow={'Down Medium'}
            rounded="2xl"
            align={'center'}
            height={'100px'}
            px="5"
            justify={'center'}
          >
            <Text fontSize={'22'} fontWeight="bold">
              Current balance:
            </Text>
            <Text textColor={'text.low'} fontWeight="bold" fontSize={'18'}>
              $0,450.00
            </Text>
          </Flex>
          <Button onClick={redeem} py={2} fontSize="22" variant={'primary.outline'} width="210px">
            Redeem
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
