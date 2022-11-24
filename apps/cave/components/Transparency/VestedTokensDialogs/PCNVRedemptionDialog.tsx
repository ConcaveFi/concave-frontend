import { PCNV, PCNVContract } from '@concave/core'
import { QuestionIcon } from '@concave/icons'
import {
  Card,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@concave/ui'
import { TransactionResponse } from '@ethersproject/providers'
import { TransactionErrorDialog } from 'components/TransactionDialog/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { useGet_Amm_Cnv_InfosQuery } from 'graphql/generated/graphql'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useState } from 'react'
import { formatFixed } from 'utils/bigNumberMask'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { usePCNVUserData } from '../Hooks/usePCNVUserData'
import useVestedTokens from '../Hooks/useVestedTokens'
import { VestedTokenButtonProps } from '../TreasuryRedeemCard'
import { PCNVConfirmationModal } from './PCNVConfirmatioModal'
import { VestedTokenDialog } from './VestedTokenDialog'

export const PCNVRedemptionDialog: React.FC<VestedTokenButtonProps> = ({ isOpen, onClose }) => {
  const {
    isOpen: transactionSubmitted,
    onClose: onCloseTransactionModal,
    onOpen: submitTransactionModal,
  } = useDisclosure()

  const confirmModal = useDisclosure()
  const { data, status: cnvDataStatus } = useGet_Amm_Cnv_InfosQuery()

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()

  const [status, setStatus] = useState<'default' | 'approve' | 'rejected' | 'error' | 'submitted'>(
    'default',
  )
  const [tx, setTx] = useState<TransactionResponse>()

  const { pCNV } = useVestedTokens()
  const { data: pCNVData, isLoading } = usePCNVUserData()
  const pCNVInitialSupply = 33300000
  const pCNV10PercentClaim = (data?.cnvData?.data?.totalSupply || 0) * 0.1
  const pCNVToCNVDifference = pCNV10PercentClaim / pCNVInitialSupply

  const chainId = useCurrentSupportedNetworkId()
  const balance = parseEther(pCNV?.data?.formatted || '0')
  const { registerTransaction } = useTransactionRegistry()
  const onCloseModal = () => {
    setStatus('default')
    onCloseTransactionModal()
  }
  const [amount, setAmount] = useState<BigNumber>(pCNVData?.redeemable || BigNumber.from(0))
  const [redeemMax, setRedeemMax] = useState(false)

  const [curValue, setCurValue] = useState(pCNVData?.redeemable)
  const cnvAmount = (+formatEther(curValue || 0) * pCNVToCNVDifference)?.toFixed(12) || '0'
  const conversion = formatFixed(parseEther(pCNVToCNVDifference?.toFixed(12) || '0'), { places: 5 })
  const totalSupplyFormatted = formatFixed(
    parseEther(data?.cnvData?.data?.totalSupply?.toString() || '0'),
  )
  const pCNVToken = PCNV[chainId]
  const amountToReceive = {
    loading: 'calculating',
    error: '---',
    success: formatFixed(parseEther(cnvAmount), { places: 5 }) + ' CNV',
  }[cnvDataStatus]
  const conversionLabel = {
    loading: `1 ${pCNVToken.symbol} = calculating`,
    error: 'error calculating conversion',
    success: `1 ${pCNVToken?.symbol} = ${conversion} CNV`,
  }[cnvDataStatus]
  const [updatedCurValue, setUpdatedCurValue] = useState(false)
  useEffect(() => {
    if (!pCNVData?.redeemable) return
    if (updatedCurValue) return
    console.log('teste')

    setCurValue(pCNVData.redeemable)
    setUpdatedCurValue(true)
  }, [pCNVData])

  return (
    <>
      <VestedTokenDialog
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onRedeem={openConfirmModal}
        status={status}
        tokenUserData={{ ...pCNVData, balance }}
        token={pCNVToken}
        onChangeValue={setCurValue}
      >
        {!!cnvDataStatus && (
          <Flex gap={2} fontWeight={'bold'}>
            <Text textColor={'text.low'}>{'You will receive'}</Text>
            <Text textColor={'text.accent'}>{amountToReceive}</Text>
          </Flex>
        )}
        {!!cnvDataStatus && (
          <Flex gap={2} align="center">
            <Text fontSize={'sm'} color={'text.accent'} fontWeight="bold" opacity={0.5}>
              {conversionLabel}
            </Text>
            <PCNVInfoIcon />
          </Flex>
        )}
      </VestedTokenDialog>

      <TransactionErrorDialog
        error={{ rejected: 'Transaction rejected' }[status] || 'An error occurred'}
        isOpen={(transactionSubmitted && status === 'error') || status === 'rejected'}
        closeParentComponent={onCloseModal}
      />
      <TransactionSubmittedDialog
        closeParentComponent={onCloseModal}
        isOpen={transactionSubmitted && Boolean(tx) && status === 'submitted'}
        tx={tx}
      />
      <PCNVConfirmationModal
        redeemMax={redeemMax}
        difference={pCNVToCNVDifference}
        amount={amount}
        isOpen={confirmModal.isOpen && Boolean(amount)}
        onClose={confirmModal.onClose}
        onAccept={redeem}
        status={cnvDataStatus}
      />
    </>
  )
  function openConfirmModal(amount: BigNumber, redeemMax: boolean) {
    setAmount(amount)
    setRedeemMax(redeemMax)
    confirmModal.onOpen()
  }
  function redeem(amount: BigNumber, redeemMax: boolean) {
    const pCNVContract = new PCNVContract(provider)
    setStatus('approve')
    pCNVContract
      .redeem(signer, amount, address, redeemMax)
      .then((transaction) => {
        registerTransaction(transaction, {
          type: 'redeem',
          amount: `${formatEther(amount)} pCNV`,
        })
        setTx(transaction)
        submitTransactionModal()
        setStatus('submitted')
      })
      .catch((error) => {
        if (error.code === 4001) setStatus('rejected')
        else setStatus('error')
      })
  }
}
const PCNVInfoIcon = () => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Flex cursor={'pointer'} rounded="full">
          <QuestionIcon />
        </Flex>
      </PopoverTrigger>

      <PopoverContent w="220px" zIndex={4}>
        <Card
          shadow={'up'}
          css={{ ':after': { opacity: 1 } }}
          py={3}
          px={5}
          position={'absolute'}
          width={'220px'}
          height="80px"
          justify={'center'}
          variant="secondary"
        >
          <Text color={'text.small'} fontSize="xs" textAlign={'justify'} fontWeight="bold">
            pCNV is a claim on 10% of the total current CNV supply and is on a 24 month full vest
            cycle.
          </Text>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
