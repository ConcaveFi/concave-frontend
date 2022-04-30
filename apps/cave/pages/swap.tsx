import { Text, Button, Card, Flex, HStack, useDisclosure } from '@concave/ui'
import {
  CandleStickCard,
  ConfirmSwapModal,
  defaultSettings,
  GasPrice,
  InputField,
  OutputField,
  RelativePrice,
  Settings,
  SwapSettings,
  SwitchCurrencies,
  useSwapButtonProps,
  useSwapState,
  useSwapTransaction,
} from 'components/AMM'
import { STABLES } from 'constants/routing'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { parseAmount } from 'components/AMM/utils/parseAmount'

import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'

export function SwapPage() {
  const [settings, setSettings] = useState<SwapSettings>(defaultSettings)

  const { trade, onChangeInput, onChangeOutput, switchCurrencies } = useSwapState(settings)

  const [{ data: account }] = useAccount()
  const swapTx = useSwapTransaction(trade.data, settings, account?.address)

  const confirmationModal = useDisclosure()

  const swapButton = useSwapButtonProps({
    trade,
    onSwapClick: settings.expertMode ? swapTx.submit : confirmationModal.onOpen,
  })

  const [currencyIn, currencyOut] = [
    trade.data.inputAmount.currency,
    trade.data.outputAmount.currency,
  ]
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
          <InputField currencyAmountIn={trade.data.inputAmount} onChangeAmount={onChangeInput} />

          <SwitchCurrencies onClick={switchCurrencies} />

          <OutputField
            currencyAmountOut={trade.data.outputAmount}
            currencyAmountIn={trade.data.inputAmount}
            updateOutputValue={onChangeOutput}
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
        trade={trade.data}
        settings={settings}
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.onClose}
        onConfirm={() => {
          confirmationModal.onClose()
          swapTx.submit()
          onChangeInput(parseAmount('0', trade.data.inputAmount.currency))
        }}
      />

      <WaitingConfirmationDialog isOpen={swapTx.isWaitingForConfirmation}>
        <Text fontSize="lg" color="text.accent">
          Swaping {swapTx.trade?.inputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.inputAmount.currency.symbol} for{' '}
          {swapTx.trade?.outputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.outputAmount.currency.symbol}
        </Text>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog tx={swapTx.data} isOpen={swapTx.isTransactionSent} />
      <TransactionErrorDialog error={swapTx.error?.message} isOpen={swapTx.isError} />
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
