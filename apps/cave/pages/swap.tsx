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
  TxSubmittedDialog,
  TxErrorDialog,
  WaitingConfirmationDialog,
  CandleStickCard,
} from 'components/AMM'
import { STABLES } from 'constants/routing'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'

export function SwapPage() {
  const [settings, setSettings] = useState<SwapSettings>(defaultSettings)

  const {
    trade,
    tradeError,
    currencyIn,
    currencyOut,
    onChangeAmount,
    updateCurrencyIn,
    updateCurrencyOut,
    switchCurrencies,
  } = useSwapState(settings)

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
          maxW="567px"
        />

        <Card
          p={7}
          gap={2}
          variant="primary"
          h="fit-content"
          shadow="Block Up"
          w="100%"
          maxW="420px"
        >
          <InputField
            currencyIn={currencyIn}
            currencyAmountIn={trade?.inputAmount}
            updateInputValue={onChangeAmount}
            updateCurrencyIn={updateCurrencyIn}
          />

          <SwitchCurrencies onClick={switchCurrencies} />

          <OutputField
            currencyAmountIn={trade?.inputAmount}
            currencyOut={currencyOut}
            currencyAmountOut={trade?.outputAmount}
            updateOutputValue={onChangeAmount}
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
          onChangeAmount(null)
        }}
      />

      <WaitingConfirmationDialog
        amountIn={swapTx.trade?.inputAmount}
        amountOut={swapTx.trade?.outputAmount}
        isOpen={swapTx.isWaitingForConfirmation}
      />

      <TxSubmittedDialog tx={swapTx.data} isOpen={swapTx.isTransactionSent} />

      <TxErrorDialog error={swapTx.error?.message} isOpen={swapTx.isError} />
    </>
  )
}

SwapPage.Meta = {
  title: 'Concave | Exchange (AMM)',
  description: `A capital efficient, low slippage and high liquidity AMM, 
    Concave Exchange offers traders deeper liquidity and allows 
    liquidity providers to earn more with less capital investment.`,
}

export default SwapPage
