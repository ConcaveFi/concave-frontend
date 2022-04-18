import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button, Card, Flex, HStack, useDisclosure } from '@concave/ui'
import {
  useSwapState,
  useSwapTransaction,
  useSwapButtonState,
  defaultSettings,
  Settings,
  SwapSettings,
  InputField,
  OutputField,
  RelativePrice,
  GasPrice,
  SwitchCurrencies,
  ConfirmSwapModal,
  TransactionSubmittedDialog,
  WaitingConfirmationDialog,
  CandleStickCard,
} from 'components/AMM'
import { STABLES } from 'constants/routing'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'

export function SwapPage() {
  const {
    trade,
    tradeError,
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

  const [settings, setSettings] = useState<SwapSettings>(defaultSettings)

  const [{ data: account }] = useAccount()
  const swapTx = useSwapTransaction(trade, settings, account?.address)

  const confirmationModal = useDisclosure()

  const swapButton = useSwapButtonState({
    currencyIn,
    trade,
    tradeError,
    onSwapClick: settings.expertMode ? swapTx.submit : confirmationModal.onOpen,
  })

  /*
    if one of the currencies are a stable, we want the chart to always display the other relative to the stable
    (stable always the `to`)
  */
  const networkId = useCurrentSupportedNetworkId() as 1 | 3
  const [chartFrom, chartTo] = STABLES[networkId].some((s) => s.equals(currencyIn))
    ? [currencyOut, currencyIn]
    : [currencyIn, currencyOut]

  return (
    <>
      <Flex wrap="wrap" justify="center" align="center" my="auto" w="100%" gap={10}>
        <CandleStickCard
          from={chartFrom}
          to={chartTo}
          variant="secondary"
          gap={2}
          p={6}
          w="100%"
          minW="430px"
          maxW="567px"
        />

        <Card
          p={7}
          gap={2}
          variant="primary"
          h="fit-content"
          shadow="Block Up"
          w="100%"
          minW="400px"
          maxW="420px"
        >
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
            <Settings onClose={setSettings} />
          </HStack>

          <Button variant="primary" size="large" isFullWidth {...swapButton} />
        </Card>
      </Flex>

      <ConfirmSwapModal
        trade={trade}
        settings={settings}
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.onClose}
        onConfirm={() => {
          confirmationModal.onClose()
          swapTx.submit()
          updateInputValue('')
        }}
      />

      <WaitingConfirmationDialog
        amountIn={swapTx.trade?.inputAmount}
        amountOut={swapTx.trade?.outputAmount}
        isOpen={swapTx.isWaitingForConfirmation}
      />

      <TransactionSubmittedDialog tx={swapTx.data} isOpen={swapTx.isTransactionSent} />
    </>
  )
}

export default SwapPage
