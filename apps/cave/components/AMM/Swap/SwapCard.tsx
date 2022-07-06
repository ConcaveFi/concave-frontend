import { CHAIN_NAME, ROUTER_ADDRESS } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { Card, Collapse, Text, useDisclosure } from '@concave/ui'
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
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useMemo, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { NetworkMismatch } from '../NetworkMismatch'
import { TradeDetails } from './TradeDetails'

export function SwapCard() {
  const {
    trade,
    error,
    inputAmount,
    outputAmount,
    onChangeInput,
    onChangeOutput,
    switchCurrencies,
  } = useSwapState()

  /*
    temporary workaround for unknow issue with swapTokenForExactToken
    all trades are submited as exact input for now
  */
  const exactInTrade = useMemo(
    () => trade && new Trade(trade.route, trade.inputAmount, TradeType.EXACT_INPUT),
    [trade],
  )
  const { registerTransaction } = useTransactionRegistry()
  const swapTx = useSwapTransaction({
    onTransactionSent: (tx) => {
      onChangeInput(toAmount(0, trade.inputAmount.currency))
      registerTransaction(tx, {
        type: 'swap',
        amountIn: trade.inputAmount.toString(),
        amountOut: trade.outputAmount.toString(),
      })
    },
  })

  const { settings } = useSwapSettings()
  const [recipient, setRecipient] = useState('')
  const confirmationModal = useDisclosure()
  const swapButtonProps = useSwapButtonProps({
    trade,
    inputAmount,
    outputAmount,
    error,
    recipient,
    settings,
    onSwapClick: () =>
      settings.expertMode
        ? () => swapTx.submit({ trade: exactInTrade, settings, recipient })
        : confirmationModal.onOpen,
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
          currencyAmountIn={inputAmount}
          onChangeAmount={onChangeInput}
          CurrencySelector={SelectAMMCurrency}
        />

        <SwitchCurrencies onClick={switchCurrencies} />

        <CurrencyOutputField
          currencyAmountOut={outputAmount}
          currencyAmountIn={inputAmount}
          updateOutputValue={onChangeOutput}
        />

        <Collapse in={settings.expertMode} style={{ overflow: 'visible' }}>
          <CustomRecipient onChangeRecipient={setRecipient} />
        </Collapse>

        <TradeDetails trade={trade} />

        <ApproveButton
          variant="primary"
          size="large"
          w="full"
          approveArgs={{
            currency: inputAmount.currency,
            amount: inputAmount.numerator,
            spender: ROUTER_ADDRESS[inputAmount.currency?.chainId],
          }}
          {...swapButtonProps}
        />

        <NetworkMismatch>
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
        trade={exactInTrade}
        settings={settings}
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.onClose}
        onConfirm={() => {
          confirmationModal.onClose()
          swapTx.submit({ trade: exactInTrade, settings, recipient })
        }}
      />

      <WaitingConfirmationDialog isOpen={swapTx.isWaitingForConfirmation}>
        <Text fontSize="lg" color="text.accent">
          Swapping {swapTx.trade?.inputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.inputAmount.currency.symbol} for{' '}
          {swapTx.trade?.outputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.outputAmount.currency.symbol}
        </Text>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog
        tx={swapTx.data}
        isOpen={swapTx.isTransactionSent}
        tokenSymbol={swapTx.trade?.outputAmount.currency.symbol}
        tokenOutAddress={swapTx.trade?.outputAmount.currency.address} // workaround for type error
      />
      <TransactionErrorDialog error={swapTx.error?.message} isOpen={swapTx.isError} />
    </>
  )
}
