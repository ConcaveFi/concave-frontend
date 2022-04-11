import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { CurrencyAmount, Token, Percent, JSBI, Currency, computePriceImpact } from 'gemswap-sdk'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import React, { useEffect, useState } from 'react'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { ConfirmSwapModal } from './ConfirmSwap'
import { useCurrencyBalance } from './hooks/useCurrencyBalance'
import { useFiatPrice, useFiatValue } from './hooks/useFiatPrice'
import { usePrice } from './hooks/usePrice'
import { Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionSubmittedModal } from './TransactionSubmitted'
import { useSwapState } from './useSwap2'
import { computeFiatValuePriceImpact } from './utils/computeFiatValuePriceImpact'

const GasPrice = () => {
  const [{ data, error }] = useFeeData({ formatUnits: 'gwei', watch: true })
  if (error) return null
  return (
    <>
      <GasIcon viewBox="0 0 16 16" />
      {data && (
        <Text fontSize="xs" color="text.low" fontWeight="medium">
          {Number(data?.formatted.gasPrice).toFixed(2)} gwei
        </Text>
      )}
      {
        // only show spinner on the first time
        !data && <Spinner size="xs" color="text.low" />
      }
    </>
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

export function SwapCard() {
  const {
    trade,
    tradeStatus,
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

  const relativePrice = usePrice(currencyIn.wrapped, currencyOut.wrapped)

  const inputFiat = useFiatPrice(currencyIn.wrapped)
  const outputFiat = useFiatPrice(currencyOut.wrapped)

  const inputFiatValue = currencyAmountIn && inputFiat.price?.quote(currencyAmountIn)
  const outputFiatValue = currencyAmountOut && outputFiat.price?.quote(currencyAmountOut)

  const priceImpact = computeFiatValuePriceImpact(inputFiatValue, outputFiatValue)

  const [{ data: inputCurrencyBalance }] = useCurrencyBalance(currencyIn)
  const [{ data: outputCurrencyBalance }] = useCurrencyBalance(currencyOut)

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
              {!!inputFiatValue && `$${inputFiatValue.toFixed(2, { groupSeparator: ',' })}`}
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
            <Text isTruncated maxW="120px" fontWeight="bold" fontSize="sm">
              {!!outputFiatValue &&
                `$${outputFiatValue.toFixed(2, { groupSeparator: ',' })} ${
                  priceImpact && `(${priceImpact.toFixed(2)}%)`
                }`}
            </Text>
            {outputCurrencyBalance && <Balance value={outputCurrencyBalance.formatted} />}
          </HStack>
        </TokenInput>

        <HStack align="center" justify="end" py={5}>
          <HStack flexWrap="wrap" align="center" fontSize="xs" fontWeight="medium" mr="auto">
            {relativePrice.isFetching && <Spinner size="xs" />}
            {relativePrice.isLoading && <Text fontSize="sm">Updating prices</Text>}
            {relativePrice.isError && <PairsError />}
            {relativePrice.price && (
              <>
                <Text>
                  1 {relativePrice.price?.baseCurrency.symbol} ={' '}
                  {relativePrice.price?.invert().toSignificant(3)}{' '}
                  {relativePrice.price?.quoteCurrency.symbol}
                </Text>
                {outputFiat.price && (
                  <Text ml={1} textColor="text.low">
                    (${outputFiat.price.toFixed(2, { groupSeparator: ',' })})
                  </Text>
                )}
              </>
            )}
          </HStack>
          <GasPrice />
          <Settings onClose={() => null} />
        </HStack>
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
