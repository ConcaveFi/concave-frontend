import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { useAuth } from 'contexts/AuthContext'
import { useApproval, useApprovalWhenNeeded } from 'hooks/useAllowance'
import { TokenType } from 'lib/tokens'
import React from 'react'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { ConfirmSwapModal } from './ConfirmSwap'
import { Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionStatusModal } from './TransactionStatus'
import { TransactionSubmittedModal } from './TransactionSubmitted'
import { ROUTER_CONTRACT, useNativeCurrency, useSwap } from './useSwap2'

export const twoDecimals = (s: string | number) => {
  const a = s.toString()
  return a.indexOf('.') > -1 ? a.slice(0, a.indexOf('.') + 3) : a
}

const GasPrice = () => {
  const [{ data }] = useFeeData({ formatUnits: 'gwei', watch: true })
  return (
    <>
      <GasIcon viewBox="0 0 16 16" />
      {data ? (
        <Text fontSize="xs" color="text.low" fontWeight="medium">
          {twoDecimals(data?.formatted.gasPrice)} gwei
        </Text>
      ) : (
        <Spinner size="xs" color="text.low" />
      )}
    </>
  )
}

const LoadingBestTradeIndicator = () => {
  return (
    <Flex mr="auto" gap={2} align="center" color="text.low">
      <Spinner size="xs" />
      <Text fontSize="sm">Fetching pair data</Text>
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

/**

  TODO
    - switch tokens
    - eth -> weth

 */

export function SwapCard() {
  const {
    setAmountIn,
    setAmountOut,
    setCurrencyIn,
    setCurrencyOut,
    switchCurrencies,
    setSettings,
    confirmSwap,
    swapTransaction,
    tradeInfo,
    isTradeReady,
    isErrored,
    isFetchingPairs,
    swapingIn,
    swapingOut,
  } = useSwap()

  const nativeCurrency = useNativeCurrency()

  const { user, isConnected, connectWithModal } = useAuth()

  const confirmModal = useDisclosure()
  const transactionStatusModal = useDisclosure()
  const receiptModal = useDisclosure()

  const [swapReceipt] = useWaitForTransaction({
    hash: swapTransaction.data?.hash,
    skip: !swapTransaction.data?.hash,
  })

  const [needsApproval, approve, isApproving] = useApprovalWhenNeeded(
    swapingIn.currency.wrapped as TokenType,
    ROUTER_CONTRACT[1],
    user.address,
    +swapingIn?.balance,
  )

  return (
    <>
      <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
        <TokenInput
          value={swapingIn.amount}
          currency={swapingIn.currency}
          stable={swapingIn.stable}
          balance={swapingIn.balance}
          onChangeValue={setAmountIn}
          onChangeCurrency={setCurrencyIn}
          onClickMaxBalance={() => {
            if (swapingIn.currency.equals(nativeCurrency)) setAmountIn(+swapingIn.balance * 0.8)
            else setAmountIn(swapingIn.balance)
          }}
        />
        <SwitchCurrencies onClick={switchCurrencies} />
        <TokenInput
          value={swapingOut.amount}
          currency={swapingOut.currency}
          stable={swapingOut.stable}
          balance={swapingOut.balance}
          onChangeValue={setAmountOut}
          onChangeCurrency={setCurrencyOut}
        />

        <HStack align="center" justify="end" py={5}>
          {isFetchingPairs ? (
            <LoadingBestTradeIndicator />
          ) : isErrored ? (
            <PairsError />
          ) : (
            swapingOut.relativePrice && (
              <Flex flexWrap="wrap" fontSize="xs" fontWeight="medium" mr="auto">
                <Text>
                  1 {swapingOut.currency.symbol} = {swapingOut.relativePrice}
                  {swapingIn.currency.symbol}
                </Text>
                {swapingOut.stable && (
                  <Text ml={1} textColor="text.low">
                    (${swapingOut.stable})
                  </Text>
                )}
              </Flex>
            )
          )}
          <GasPrice />
          <Settings onClose={setSettings} />
        </HStack>

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
            isDisabled={!isTradeReady || needsApproval || !isConnected}
            variant="primary"
            size="large"
            isFullWidth
            onClick={confirmModal.onOpen}
          >
            Swap
          </Button>
        )}
      </Card>

      <ConfirmSwapModal
        tradeInfo={tradeInfo}
        tokenInUsdPrice={swapingIn.stable}
        tokenOutUsdPrice={swapingOut.stable}
        tokenInRelativePriceToTokenOut={swapingOut.relativePrice}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => confirmSwap()}
      />

      <TransactionStatusModal
        inAmount={swapingIn?.amount}
        outAmount={tradeInfo?.meta.expectedOutput}
        inSymbol={swapingIn?.currency?.symbol}
        outSymbol={swapingOut?.currency?.symbol}
        status={swapTransaction}
        isOpen={!!swapTransaction?.data}
        onClose={transactionStatusModal.onClose}
      />

      <TransactionSubmittedModal
        receipt={swapReceipt}
        isOpen={!!swapReceipt?.data}
        onClose={receiptModal.onClose}
      />
    </>
  )
}
