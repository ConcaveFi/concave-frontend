import { PCNVContract } from '@concave/core'
import { InfoIcon } from '@concave/icons'
import {
  Button,
  Card,
  Collapse,
  Flex,
  Modal,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
} from '@concave/ui'
import { TransactionResponse } from '@ethersproject/providers'
import { ToggleButton } from 'components/ToggleButton'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useState } from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { usePCNVUserData } from '../Hooks/usePCNVUserData'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'
import { VestedTokenInput } from './VestedTokenDialogInput'

export const PCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = ({ isOpen, onClose }) => {
  const {
    isOpen: transactionSubmitted,
    onClose: onCloseTransactionModal,
    onOpen: submitTransactionModal,
  } = useDisclosure()

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error'>('default')
  const [tx, setTx] = useState<TransactionResponse>()

  const { data: pCNVUserData, isLoading } = usePCNVUserData()
  const { pCNV } = useVestedTokens()

  const balance = parseEther(pCNV?.data?.formatted || '0')
  const { registerTransaction } = useTransactionRegistry()

  const { isConnected } = useAccount()
  const { redeemable, redeemed } = pCNVUserData || {}
  const [value, setValue] = useState<string>()
  const [redeemMax, setRedeemMax] = useState(true)

  const insufficientFunds = balance?.isZero() || parseEther(value || '0.0').gt(balance)
  const invalidAmount = !insufficientFunds && parseEther(value || '0.0')?.isZero() && !redeemMax
  const nothingToRedeem = (redeemable?.isZero() || redeemable?.eq(balance)) && !insufficientFunds
  const redeemableExceeded =
    !redeemMax &&
    parseEther(value || '0')?.gt(redeemable || 0) &&
    !insufficientFunds &&
    !nothingToRedeem
  const validValue = !invalidAmount && !insufficientFunds && !nothingToRedeem && !redeemableExceeded

  return (
    <>
      <Modal
        title={'Redeem pCNV'}
        bluryOverlay
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <Card width={'340px'} minW="280px" m={-6} px={6} gap={2} justify="center" py={6}>
          <VestedTokenInput
            redeemable={redeemable}
            redeemMax={redeemMax}
            balance={formatEther(balance)}
            onChangeValue={setValue}
            value={value}
          />
          <Flex direction={'column'} fontSize="14px" px={2}>
            <Info
              title="Redeemable:"
              value={isLoading ? 'Loading...' : formatEther(redeemable || '0')}
            />
            <Info
              title="Redeemed:"
              value={isLoading ? 'Loading...' : formatEther(redeemed || '0')}
            />
            <Collapse in={validValue || (redeemMax && !redeemable?.isZero())}>
              {
                <Info
                  title="You will receive:"
                  value={formatEther(parseEther(value || '0')) + ' CNV'}
                />
              }
            </Collapse>
          </Flex>
          <Flex gap={2} fontWeight={'bold'} pl={2} align="center">
            <Text textColor={'gray.200'}>Redeem max</Text>
            <ToggleButton enabled={redeemMax} onToggle={setRedeemMax} />
            <Tooltip
              textColor={'white'}
              bg="text.low"
              textShadow={'0px 0px 10px #333'}
              fontWeight={'bold'}
              fontSize="13px"
              textAlign="center"
              label={`Attempts to redeem all of your currently available pCNV`}
            >
              <InfoIcon color={'text.low'} cursor="pointer" />
            </Tooltip>
          </Flex>

          <Button
            height={'55px'}
            width="full"
            {...redeemButtonProps(validValue, status)}
            onClick={() => redeem()}
            gap={4}
          >
            {(status === 'approve' || isLoading) && <Spinner color="text.low" />}
            {isConnected && !isLoading && (
              <>
                <Text>
                  {invalidAmount && 'Invalid amount'}
                  {nothingToRedeem && 'Nothing to redeem'}
                  {insufficientFunds && 'Insufficient funds'}
                  {redeemableExceeded && 'Redeemable exceeded'}
                  {validValue && redeemButtonText[status]}
                </Text>
              </>
            )}
            {isConnected && isLoading && 'Loading...'}
            {!isConnected && 'Not connected'}
          </Button>
        </Card>
      </Modal>

      <TransactionSubmittedDialog
        closeParentComponent={onCloseTransactionModal}
        isOpen={transactionSubmitted && Boolean(tx)}
        tx={tx}
      />
    </>
  )
  function redeem() {
    const pCNVContract = new PCNVContract(provider)
    setStatus('approve')
    const amount = redeemMax ? redeemable : parseEther(value || '0')
    pCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        registerTransaction(transaction, {
          type: 'redeem',
          amount: `${formatEther(amount)} pCNV`,
        })
        setTx(transaction)
        submitTransactionModal()
        setStatus('default')
      })
      .catch((error) => {
        if (error.code === 4001) setStatus('rejected')
        else setStatus('error')
      })
  }
}
const Info = ({ title, value }: { title: string; value: string | number }) => (
  <Flex gap={2} fontWeight={'bold'}>
    <Text textColor={'text.low'}>{title}</Text>
    <Text textColor={'text.accent'}>{value}</Text>
  </Flex>
)
const redeemButtonText = {
  default: 'Redeem',
  approve: 'Aprove in your wallet...',
  rejected: 'Transaction rejected',
  error: 'Ocurred an error',
}
const redeemButtonProps = (validValue: boolean, status) => {
  const defaultProps = {
    variant: 'secondary',
    fontSize: 20,
    shadow: 'Up Small',
    cursor: !validValue && 'default',
    textColor: !validValue && 'text.low',
    _active: validValue && { transform: 'scale(0.9)' },
    _hover: validValue && { shadow: 'up' },
    _focus: {},
  }
  const disabledProps = { ...defaultProps, disabled: true, _hover: {}, variant: 'primary.outline' }
  if (status === 'default') return { ...defaultProps }
  return { ...disabledProps }
}
