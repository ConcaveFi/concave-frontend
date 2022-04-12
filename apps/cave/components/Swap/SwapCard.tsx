import { ExpandArrowIcon } from '@concave/icons'
import { Button, Card, Flex, HStack } from '@concave/ui'
import { ROUTER_ADDRESS } from 'gemswap-sdk'
import { ConfirmSwapModal } from './ConfirmSwapModal'
import { useCurrencyBalance } from './hooks/useCurrencyBalance'
import { Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionSubmittedModal } from './TransactionSubmittedModal'
import { useSwapState } from './hooks/useSwapState'
import { useUserApprove } from 'hooks/useApprove'
import { useModals } from 'contexts/ModalsContext'
import { InputField } from './InputField'
import { OutputField } from './OutputField'
import { RelativePrice } from './RelativePrice'
import { GasPrice } from './GasPrice'

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

export function SwapCard() {
  const {
    trade,
    // tradeStatus,
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

  const { allowance, approve } = useUserApprove(
    currencyIn.wrapped,
    ROUTER_ADDRESS[currencyIn.chainId],
  )

  const { connectModal } = useModals()

  return (
    <>
      <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
        <InputField
          currencyIn={currencyIn}
          currencyAmountIn={currencyAmountIn}
          updateInputValue={updateInputValue}
          updateCurrencyIn={updateCurrencyIn}
        />

        <SwitchCurrencies onClick={switchCurrencies} />

        <OutputField
          currencyAmountIn={currencyAmountIn}
          currencyOut={currencyOut}
          currencyAmountOut={currencyAmountOut}
          updateOutputValue={updateOutputValue}
          updateCurrencyOut={updateCurrencyOut}
        />

        <HStack align="center" justify="end" py={5}>
          <RelativePrice currencyIn={currencyIn} currencyOut={currencyOut} />
          <GasPrice />
          <Settings onClose={() => null} />
        </HStack>

        <Button
          variant="primary"
          size="large"
          isFullWidth
          isLoading={false}
          onClick={() => connectModal.onOpen()}
        >
          Connect Wallet
        </Button>

        <Button
          variant="primary"
          size="large"
          isFullWidth
          isLoading={false}
          onClick={() => approve()}
        >
          Approve {currencyIn.symbol}
        </Button>

        {/* 
          <Button
            isDisabled={!isTradeReady || needsApproval || !isConnected || +swapingIn.balance < +swapingIn.amount}
            variant="primary"
            size="large"
            isFullWidth
            onClick={confirmModal.onOpen}
          >
            {+swapingIn.balance < +swapingIn.amount ? 'Insufficient Funds' : 'Swap'}
          </Button>
        */}
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
