import { ACNVRedeemContract, ChainId } from '@concave/core'
import { Button, Card, Flex, Link, Modal, Text, useDisclosure } from '@concave/ui'
import { TransactionResponse } from '@ethersproject/providers'
import { TransactionErrorDialog } from 'components/TransactionDialog/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { useGet_User_Acnv_RedeemedQuery } from 'graphql/generated/graphql'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'

export const ACNVRedemptionDialog: React.FC<VestedTokenButtonProps> = (props) => {
  const provider = useProvider()
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const { isOpen: isSubOpen, onOpen: onOpenSub, onClose: onCloseSub } = useDisclosure()
  const { isOpen: isErrorOpen, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()
  const { onClose, isOpen } = props

  const { data: signer } = useSigner()
  const { address, isConnected } = useAccount()

  const [tx, setTx] = useState<TransactionResponse>()
  const [error, setError] = useState('')

  const { data, isLoading } = useGet_User_Acnv_RedeemedQuery({
    address: address,
  })
  const redeemed: number = data?.logACNVRedemption[0]?.amount || 0
  const txHash = data?.logACNVRedemption[0]?.txHash || ''

  const { aCNV } = useVestedTokens()
  const { data: aCNVData } = aCNV
  const validBalance = +aCNVData?.formatted > 0
  const alreadyRedeemed = redeemed === +aCNVData?.formatted
  const unsupportedNetwork = provider?.network?.chainId !== ChainId.ETHEREUM
  const canRedeem = validBalance && !alreadyRedeemed && !unsupportedNetwork

  const { registerTransaction } = useTransactionRegistry()

  function redeem() {
    onOpenConfirm()
    const aCNVContract = new ACNVRedeemContract(provider)
    aCNVContract
      .redeem(signer, address)
      .then((tx) => {
        onCloseConfirm()
        registerTransaction(tx, {
          type: 'redeem',
          amount: `${aCNVData.formatted} aCNV`,
        })
        setTx(tx)
        onOpenSub()
      })
      .catch((e) => {
        onCloseConfirm()
        setError('Transaction rejected')
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
              <Text textColor={'text.accent'} fontWeight="bold" flex={1} textAlign="end">
                {unsupportedNetwork && '0'}
                {!unsupportedNetwork && !aCNV?.isLoading && (aCNVData?.formatted || '0')}
                {!unsupportedNetwork && !unsupportedNetwork && aCNV?.isLoading && 'Loading...'}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text color={'text.low'} fontWeight="bold">
                Redeemed:
              </Text>
              <Text textColor={'text.accent'} fontWeight="bold" flex={1} textAlign="end">
                {!isLoading && redeemed}
                {isLoading && 'Loading...'}
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
                View on explorer
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
            variant={'primary'}
            width="full"
            size={'large'}
            shadow={'Up Small'}
            disabled={!canRedeem}
            textColor={!canRedeem && 'text.low'}
            _hover={canRedeem && { shadow: 'up' }}
            cursor={!canRedeem && 'default'}
          >
            {unsupportedNetwork && 'Unsupported network'}
            {!unsupportedNetwork && (
              <Text>
                {!isConnected && 'Not connected'}
                {!validBalance && isConnected && 'Insufficient balance'}
                {isConnected && canRedeem && 'Redeem'}
                {isConnected && !canRedeem && validBalance && 'Nothing to redeem'}
              </Text>
            )}
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
