import { CNV, Token } from '@concave/core'
import { ExpandArrowIcon } from '@concave/icons'
import { Box, Button, Card, Flex, HStack, Text, VStack } from '@concave/ui'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { CustomRecipient } from 'components/AMM'
import { useFiatValue } from 'components/AMM/hooks/useFiatPrice'
import { CurrencyAmountField } from 'components/CurrencyAmountField'
import { Balance, PreSetAmount } from 'components/CurrencyAmountField/Balance'
import { CurrencySelector } from 'components/CurrencySelector/CurrencySelector'
import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { RedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { RedeemStatus } from 'components/UserDashboard/redeem/useRedeemStatus'
import { UseTransaction } from 'hooks/useTransaction'
import { compactFormat } from 'utils/bigNumberMask'

export type RedeemCard<Tout extends Token, Tin extends Token> = {
  redeemStatus?: RedeemStatus
  redeemTransaction: UseTransaction
  redeemFields: RedeemFields<Tout, Tin>
}

const getRedeemButtonProps = ({
  redeemFields,
  redeemStatus,
  redeemTransaction,
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
  if (redeemFields.amountOut.equalTo(redeemStatus.redeemable)) {
    return { children: 'Redeem max', onClick: redeemTransaction?.sendTx }
  }
  return { children: 'Redeem', onClick: redeemTransaction?.sendTx }
}

export const RedeemCard = ({
  redeemFields,
  redeemStatus,
  redeemTransaction,
  ...boxProps
}: RedeemCard<Token, Token>) => {
  const {
    address,
    immutableAmount,
    amountIn,
    setAmountOut = () => {},
    amountOut,
    setTo,
  } = { ...redeemFields, ...redeemStatus }
  const outputFiat = useFiatValue(amountIn)
  return (
    <Box {...boxProps}>
      <Card gap={4} p={4} justify="center" w={'100%'} h={'fit-content'} px={5}>
        <CurrencyAmountField
          disabled={immutableAmount}
          currencyAmount={amountOut}
          CurrencySelector={CurrencySelector}
          onChangeAmount={setAmountOut}
        >
          <VStack justify="space-between" align="end" textColor="text.low" w="full">
            {redeemStatus?.redeemable && (
              <PreSetAmount
                amount={redeemStatus?.redeemable}
                onClick={(amount) => setAmountOut(amount.wrapped)}
                leftIcon={<Text>Redeemable</Text>}
              />
            )}
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
        >
          <HStack justify="space-between" align="end" textColor="text.low" w="full">
            <Text noOfLines={1} fontWeight="bold" fontSize="sm" mr={1}>
              {!!outputFiat.value?.greaterThan(0) &&
                `$${outputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
            </Text>
            <Balance currency={CNV[1]}></Balance>
          </HStack>
        </CurrencyAmountField>

        {setTo && <CustomRecipient onChangeRecipient={setTo}></CustomRecipient>}
        <VestedPercent {...redeemStatus} />
        <Redeemed {...redeemStatus} />

        <Button
          size={'md'}
          variant={'primary'}
          {...getRedeemButtonProps({
            redeemFields,
            redeemStatus,
            redeemTransaction,
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
  console.log(redeemStatus)
  if (!redeemStatus?.redeemed) return <></>
  if (!redeemStatus.redeemed.greaterThan(0)) return <></>
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

/**
 * @returns the percent of holdings vested for right now
 */
const VestedPercent = (redeemStatus: RedeemStatus) => {
  if (!redeemStatus?.vestedPercent) return <></>
  if (!redeemStatus.vestedPercent?.eq(0)) return <></>

  return (
    <HStack width={'full'}>
      <Text color={'text.low'} fontWeight="bold">
        Vested holding rate now
      </Text>
      <Text textColor={'text.accent'} fontWeight="bold" flex={1} textAlign="end">
        {compactFormat(redeemStatus?.vestedPercent || '0', { decimals: 16 })}%
      </Text>
    </HStack>
  )
}
