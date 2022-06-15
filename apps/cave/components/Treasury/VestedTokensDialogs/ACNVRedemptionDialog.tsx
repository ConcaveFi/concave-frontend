import { Modal, Card, Text, Flex, Button, useDisclosure } from '@concave/ui'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { Contract, Transaction } from 'ethers'
import { useGet_User_Acnv_RedeemedQuery } from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { aCNVredeemabi } from 'lib/contractoABI'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { truncateNumber } from 'utils/truncateNumber'
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
  const networkdId = useCurrentSupportedNetworkId()
  const aCNVContract = new Contract(
    '0x38baBedCb1f226B49b2089DA0b84e52b6181Ca59',
    aCNVredeemabi,
    provider(1),
  )
  const { data, isLoading } = useGet_User_Acnv_RedeemedQuery({ address: account?.address })
  console.log('data', data)

  const { aCNVData, loadingACNV } = useVestedTokens()

  const [tx, setTx] = useState<Transaction>()
  const [error, setError] = useState('')

  const validBalance = +aCNVData?.formatted > 0

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
              {aCNVData && parseFloat(aCNVData?.formatted).toFixed(2)}
              {!aCNVData && 'loading...'}
            </Text>
          </Flex>
          <Button
            onClick={() => {
              if (!validBalance) return
              redeem()
            }}
            py={2}
            fontSize="22"
            variant={'primary.outline'}
            width="210px"
            shadow={'Up Small'}
            textColor={!validBalance && 'text.low'}
            _hover={validBalance && { shadow: 'up' }}
            cursor={!validBalance && 'default'}
            _active={{}}
            _focus={{}}
          >
            {isConnected ? (!validBalance ? 'Insufficient balance' : 'Redeem') : 'Not Connected'}
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
