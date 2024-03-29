import { Token } from '@concave/core'
import { ExpandArrowIcon } from '@concave/icons'
import {
  Box,
  BoxProps,
  Button,
  Card,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from '@concave/ui'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { CustomRecipient } from 'components/AMM'
import { useFiatValue } from 'components/AMM/hooks/useFiatPrice'
import { CurrencyAmountField } from 'components/CurrencyAmountField'
import { PreSetAmount } from 'components/CurrencyAmountField/Balance'
import {
  CurrencySelector as Selector,
  CurrencySelectorType,
} from 'components/CurrencySelector/CurrencySelector'
import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { RedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { RedeemStatus } from 'components/UserDashboard/redeem/useRedeemStatus'
import { UseTransaction } from 'hooks/useTransaction'
import { compactFormat } from 'utils/bigNumberMask'
import { useCustomRecipient } from 'components/AMM/Swap/CustomRecipient'
import { useEffect } from 'react'

export type RedeemCard<Tout extends Token, Tin extends Token> = {
  redeemStatus?: RedeemStatus
  redeemTransaction: UseTransaction
  redeemFields: RedeemFields<Tout, Tin>
  redeemMax: boolean
}

const getRedeemButtonProps = ({
  redeemFields,
  redeemStatus,
  redeemTransaction,
  redeemMax,
}: RedeemCard<Token, Token>) => {
  if (redeemFields.disabled) {
    return { children: 'Coming Soon', isDisabled: true }
  }
  if (!redeemFields.amountOut.greaterThan(0)) {
    return { children: 'Enter an amount', isDisabled: true }
  }
  if (redeemFields.amountOut.greaterThan(redeemStatus.redeemable)) {
    return { children: 'Amount overflow', isDisabled: true }
  }
  if (redeemMax) {
    return { children: 'Redeem max', onClick: redeemTransaction?.sendTx }
  }
  return { children: 'Redeem', onClick: redeemTransaction?.sendTx }
}

const CurrencySelector = (props: CurrencySelectorType) => {
  return <Selector fontSize={'14px'} p={1} {...props} />
}

export const RedeemCard = ({
  redeemFields,
  redeemStatus,
  redeemTransaction,
  redeemMax,
  ...boxProps
}: RedeemCard<Token, Token> & BoxProps) => {
  const {
    immutableAmount,
    amountIn,
    setAmountOut = () => {},
    amountOut,
    setTo,
  } = { ...redeemFields, ...redeemStatus }
  const customRecipient = useCustomRecipient()
  const isMobileLayout = useBreakpointValue({ base: true, sm: false })

  useEffect(() => {
    setTo?.(customRecipient.address)
  }, [customRecipient.address])

  const outputFiat = useFiatValue(amountIn)

  if (redeemStatus?.redeemable.equalTo(0) && isMobileLayout) {
    return <></>
  }

  return (
    <Box {...boxProps}>
      <Card
        gap={4}
        p={4}
        justify="center"
        justifyContent={'space-around'}
        w={'100%'}
        minH={'fit-content'}
        h={'full'}
        px={4}
      >
        <CurrencyAmountField
          disabled={immutableAmount}
          currencyAmount={amountOut}
          CurrencySelector={CurrencySelector}
          onChangeAmount={setAmountOut}
          sx={{ px: 2, py: 2, pb: 0 }}
        >
          <VStack h={'30px'} justify="space-between" align="end" textColor="text.low" w="full">
            <HStack>
              {redeemStatus?.redeemable && (
                <PreSetAmount
                  amount={redeemStatus?.redeemable}
                  onClick={(amount) => setAmountOut(amount.wrapped)}
                  leftIcon={<Text>Redeemable</Text>}
                />
              )}
            </HStack>
          </VStack>
        </CurrencyAmountField>

        <HStack justifyContent={'center'} mt={-2} mb={-2}>
          <ExpandArrowIcon />
        </HStack>

        <CurrencyAmountField
          disabled
          currencyAmount={amountIn}
          CurrencySelector={CurrencySelector}
          onChangeAmount={() => {}}
          sx={{ px: 2, py: 2, pb: 0 }}
        >
          <HStack justify="space-between" align="center" textColor="text.low" w="full">
            <Text noOfLines={1} pb={2} pl={1} fontWeight="bold" fontSize="sm" mr={1}>
              {!!outputFiat.value?.greaterThan(0) &&
                `$${outputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
            </Text>
          </HStack>
        </CurrencyAmountField>

        {setTo && <CustomRecipient {...customRecipient}></CustomRecipient>}
        <Redeemed {...redeemStatus} />

        <Button
          size={'md'}
          variant={'primary'}
          {...getRedeemButtonProps({
            redeemFields,
            redeemStatus,
            redeemTransaction,
            redeemMax,
          })}
        />
      </Card>
      <WaitingConfirmationDialog isOpen={redeemTransaction?.isWaitingForConfirmation} />
      <TransactionSubmittedDialog
        isOpen={redeemTransaction?.isWaitingTransactionReceipt}
        txHash={redeemTransaction?.tx?.hash}
      />
    </Box>
  )
}

const Redeemed = (redeemStatus: RedeemStatus) => {
  if (!redeemStatus?.redeemed) return <></>
  return (
    <HStack width={'full'}>
      <Text color={'text.low'} fontWeight="bold">
        Redeemed:
      </Text>
      <Text textColor={'text.accent'} fontWeight="bold" flex={1} textAlign="end">
        {redeemStatus?.redeemed?.toSignificant()}
      </Text>
    </HStack>
  )
}
