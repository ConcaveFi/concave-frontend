import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button, Card, Flex, HStack, useDisclosure } from '@concave/ui'
import { useSwapState } from './hooks/useSwapState'
import { useSwapTransaction } from './hooks/useSwapTransaction'
import { useSwapButtonState } from './hooks/useSwapButtonState'
import { defaultSettings, Settings, SwapSettings } from './Settings'
import { InputField } from './InputField'
import { OutputField } from './OutputField'
import { RelativePrice } from './RelativePrice'
import { GasPrice } from './GasPrice'
import { SwitchCurrencies } from './SwitchCurrencies'
import { ConfirmSwapModal } from './ConfirmSwapModal'
import { TransactionSubmittedDialog } from './TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from './WaitingConfirmationDialog'
import { CandleStickCard } from 'components/CandleStickCard'

export function SwapCard() {
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

  return (
    <>
          <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justify="center"
        align="center"
        h="100%"
        gap={10}
      >
        <CandleStickCard
          from={currencyIn}
          to={currencyOut}
          variant="secondary"
          gap={2}
          p={6}
          h={['100%', 470, 400]}
          w={['100%', '100%', 500, 567, 567]}
          align="stretch"
        />

      <Card p={7} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
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
