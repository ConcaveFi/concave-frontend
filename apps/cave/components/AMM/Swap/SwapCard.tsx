import { CHAIN_NAME } from '@concave/core'
import { Button, Card, Collapse, Text, useDisclosure } from '@concave/ui'
import { AddTokenToWalletButton } from 'components/AddTokenToWalletButton'
import {
  ConfirmSwapModal,
  CurrencyInputField,
  CurrencyOutputField,
  CustomRecipient,
  SwitchCurrencies,
  useSwapButtonProps,
  useSwapState,
  useSwapTransaction,
} from 'components/AMM'
import { useSwapSettings } from 'components/AMM/Swap/Settings'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { NetworkMismatch } from '../NetworkMismatch'
import { TradeDetails } from './TradeDetails'

export function SwapCard() {
  const { trade, error, onChangeInput, onChangeOutput, switchFields, onReset } = useSwapState()

  const [recipient, setRecipient] = useState('')
  const confirmationModal = useDisclosure()

  const swapTx = useSwapTransaction(trade, recipient, {
    onSuccess: (tx) => {
      onChangeInput(toAmount(0, trade.inputAmount.currency))
      confirmationModal.onClose()
    },
  })

  const isExpertMode = useSwapSettings((s) => s.settings.expertMode)

  const swapButtonProps = useSwapButtonProps({
    trade,
    error,
    recipient,
    onSwapClick: () => (isExpertMode ? swapTx.write() : confirmationModal.onOpen()),
  })

  return (
    <>
      <Card
        p={6}
        gap={2}
        variant="primary"
        h="fit-content"
        minH="400px" // match candlestick
        shadow="Block Up"
        w="100%"
        maxW="420px"
      >
        <CurrencyInputField
          currencyAmountIn={trade.inputAmount}
          onChangeAmount={onChangeInput}
          CurrencySelector={SelectAMMCurrency}
        />

        <SwitchCurrencies onClick={switchFields} />

        <CurrencyOutputField
          currencyAmountOut={trade.outputAmount}
          priceImpact={trade?.priceImpact}
          updateOutputValue={onChangeOutput}
        />

        <Collapse in={isExpertMode} style={{ overflow: 'visible' }}>
          <CustomRecipient onChangeRecipient={setRecipient} />
        </Collapse>

        <TradeDetails
          trade={trade}
          inputAmount={trade.inputAmount}
          outputAmount={trade.outputAmount}
        />

        <Button variant="primary" size="large" w="full" {...swapButtonProps} />

        <NetworkMismatch onReset={onReset}>
          {({ queryChainId, activeChainId }) => (
            <Text color="text.low">
              Do you wanna drop this {CHAIN_NAME[queryChainId]} trade
              <br />
              and restart on {CHAIN_NAME[activeChainId]}?
            </Text>
          )}
        </NetworkMismatch>
      </Card>

      <ConfirmSwapModal
        trade={swapTx.trade}
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.onClose}
        onConfirm={() => swapTx.write()}
      />

      <WaitingConfirmationDialog isOpen={swapTx.isLoading}>
        <Text fontSize="lg" color="text.accent">
          Swapping {swapTx.trade?.inputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.inputAmount.currency.symbol} for{' '}
          {swapTx.trade?.outputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.outputAmount.currency.symbol}
        </Text>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog title="Swap Submitted" tx={swapTx.data} isOpen={swapTx.isSuccess}>
        {swapTx.trade?.outputAmount.currency.isToken && (
          <AddTokenToWalletButton token={swapTx.trade.outputAmount.currency.wrapped} />
        )}
      </TransactionSubmittedDialog>
      <TransactionErrorDialog error={swapTx.error?.message} isOpen={swapTx.isError} />
    </>
  )
}
