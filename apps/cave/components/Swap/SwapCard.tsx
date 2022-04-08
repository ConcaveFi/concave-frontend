import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { CurrencyAmount, Token, Percent, JSBI } from 'gemswap-sdk'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import { TokenType } from 'lib/tokens'
import React, { useEffect, useState } from 'react'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { ConfirmSwapModal } from './ConfirmSwap'
import { useCurrencyBalance } from './hooks/useCurrencyBalance'
import { useFiatPrice, useFiatValue } from './hooks/useFiatPrice'
import { Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionStatusModal } from './TransactionStatus'
import { TransactionSubmittedModal } from './TransactionSubmitted'
import { useSwapState } from './useSwap2'

const GasPrice = () => {
  const { data, isSuccess, isLoading, isError } = useFeeData({ formatUnits: 'gwei', watch: true })
  if (isError) return null
  return (
    <>
      <GasIcon viewBox="0 0 16 16" />
      {isSuccess && (
        <Text fontSize="xs" color="text.low" fontWeight="medium">
          {Number(data?.formatted.gasPrice).toFixed(2)} gwei
        </Text>
      )}
      {isLoading && <Spinner size="xs" color="text.low" />}
    </>
  )
}

const LoadingIndicator = ({ label }) => {
  return (
    <Flex mr="auto" gap={2} align="center" color="text.low">
      <Spinner size="xs" />
      <Text fontSize="sm">{label}</Text>
    </Flex>
  )
}

const SwitchCurrencies = ({ onClick }) => {
  return (
    <Flex align="center" justify="center">
      <Button
        shadow="Up Small"
        _focus={{ shadow: 'Up Small' }}
        _hover={{ shadow: 'Up Big' }}
        px={3.5}
        py={2}
        bgColor="blackAlpha.100"
        rounded="3xl"
        onClick={onClick}
      >
        <ExpandArrowIcon />
      </Button>
    </Flex>
  )
}

const PairsError = () => (
  <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
    Error Fetching Pairs
  </Text>
)

const Balance = ({ value, onClick }: { value: string; onClick?: () => void }) => (
  <Button
    fontSize="xs"
    ml="auto"
    onClick={onClick}
    rightIcon={!!onClick && <Text textColor="#2E97E2">Max</Text>}
    leftIcon={<Text>Balance:</Text>}
    iconSpacing={1}
  >
    <Text isTruncated maxW="50px">
      {value}
    </Text>
  </Button>
)

// export function calculateSlippageAmount(
//   value: CurrencyAmount<Currency>,
//   slippage: Percent,
// ): [JSBI, JSBI] {
//   if (slippage.lessThan(0) || slippage.greaterThan(ONE)) throw new Error('Unexpected slippage')
//   return [
//     value.multiply(ONE.subtract(slippage)).quotient,
//     value.multiply(ONE.add(slippage)).quotient,
//   ]
// }

export const ZERO_PERCENT = new Percent('0')

export const ONE_HUNDRED_PERCENT = new Percent('1')

export function computeFiatValuePriceImpact(
  fiatValueInput: CurrencyAmount<Token> | undefined | null,
  fiatValueOutput: CurrencyAmount<Token> | undefined | null,
): Percent | undefined {
  if (!fiatValueOutput || !fiatValueInput) return undefined
  if (!fiatValueInput.currency.equals(fiatValueOutput.currency)) return undefined
  if (JSBI.equal(fiatValueInput.quotient, JSBI.BigInt(0))) return undefined
  const pct = ONE_HUNDRED_PERCENT.subtract(fiatValueOutput.divide(fiatValueInput))
  return new Percent(pct.numerator, pct.denominator)
}

export function SwapCard() {
  const {
    tradeStatus,
    trade,
    currencyIn,
    currencyOut,
    currencyAmountIn,
    currencyAmountOut,
    updateInputValue,
    updateOutputValue,
    updateCurrencyIn,
    updateCurrencyOut,
    switchCurrencies,
  } = useSwapState()

  const outputFiat = useFiatValue(trade?.outputAmount)
  const inputFiat = useFiatValue(trade?.inputAmount)

  const priceImpact = computeFiatValuePriceImpact(outputFiat?.value, inputFiat?.value)

  const { data: inputCurrencyBalance } = useCurrencyBalance(currencyIn)
  const { data: outputCurrencyBalance } = useCurrencyBalance(currencyOut)

  return (
    <>
      <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
        <TokenInput
          currency={currencyIn}
          currencyAmount={currencyAmountIn}
          onChangeValue={updateInputValue}
          onSelectCurrency={updateCurrencyIn}
        >
          <HStack justify="space-between" align="center" textColor="text.low" w="full">
            <Text isTruncated maxW="100px" fontWeight="bold" fontSize="sm">
              {!!inputFiat.isSuccess && `$${inputFiat.value.toFixed(2)}`}
            </Text>
            {inputCurrencyBalance && (
              <Balance
                value={inputCurrencyBalance.formatted}
                onClick={() => updateInputValue(inputCurrencyBalance.formatted)}
              />
            )}
          </HStack>
        </TokenInput>

        <SwitchCurrencies onClick={switchCurrencies} />

        <TokenInput
          currency={currencyOut}
          currencyAmount={currencyAmountOut}
          onChangeValue={updateOutputValue}
          onSelectCurrency={updateCurrencyOut}
        >
          <HStack justify="space-between" align="center" textColor="text.low" w="full">
            <Text isTruncated maxW="100px" fontWeight="bold" fontSize="sm">
              {!!outputFiat.isSuccess &&
                `$${outputFiat.value.toFixed(2)} (${priceImpact.toFixed(2)})`}
            </Text>
            {outputCurrencyBalance && <Balance value={outputCurrencyBalance.formatted} />}
          </HStack>
        </TokenInput>

        {/* <HStack align="center" justify="end" py={5}>
          {tradeStatus.isFetching && <Spinner size="xs" />}
          {tradeStatus.isLoading && <Text fontSize="sm">Updating prices</Text>}
          {tradeStatus.isError && <PairsError />}
          {tradeStatus.isSuccess && trade && (
            <Flex flexWrap="wrap" fontSize="xs" fontWeight="medium" mr="auto">
              <Text>
                1 {trade.inputAmount.currency.symbol} = {trade.route.midPrice.toSignificant(3)}{' '}
                {trade.outputAmount.currency.symbol}
              </Text>
              {outputFiat.price && (
                <Text ml={1} textColor="text.low">
                  (${outputFiat.price})
                </Text>
              )}
            </Flex>
          )} */}
        {/* <GasPrice /> */}
        {/* <Settings onClose={() => null} /> */}
        {/* </HStack> */}
        {/*
        {needsApproval && (
          <Button
            isLoading={isApproving}
            variant="primary"
            size="large"
            isFullWidth
            onClick={() => approve()}
          >
            Approve {swapingIn.currency.symbol}
          </Button>
        )}

        {!isConnected && false ? (
          // <Button variant="primary" size="large" disabled onClick={connectWithModal}>
          //   Connect Wallet
          // </Button>
          <></>
        ) : (
          <Button
            isDisabled={
              !isTradeReady ||
              needsApproval ||
              !isConnected ||
              +swapingIn.balance < +swapingIn.amount
            }
            variant="primary"
            size="large"
            isFullWidth
            onClick={confirmModal.onOpen}
          >
            {+swapingIn.balance < +swapingIn.amount ? 'Insufficient Funds' : 'Swap'}
          </Button>
        )} */}
      </Card>
      {/* 
      <ConfirmSwapModal
        tradeInfo={tradeInfo}
        tokenInUsdPrice={swapingIn.stable}
        tokenOutUsdPrice={swapingOut.stable}
        tokenInRelativePriceToTokenOut={swapingOut.relativePrice}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => confirmSwap()}
        exactInOrExactOut={inOrOut}
      />

      {/* <TransactionStatusModal
        inAmount={swapingIn?.amount}
        outAmount={tradeInfo?.meta.expectedOutput}
        inSymbol={swapingIn?.currency?.symbol}
        outSymbol={swapingOut?.currency?.symbol}
        status={swapTransaction}
        isOpen={transactionStatusModal.isOpen}
        onClose={() => {
          transactionStatusModal.onClose()
        }}
      /> */}

      {/* <TransactionSubmittedModal
        receipt={swapReceipt}
        isOpen={receiptModal.isOpen}
        onClose={() => {
          receiptModal.onClose()
        }}
      />  */}
    </>
  )
}
