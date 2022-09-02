import { CHAIN_NAME, PCNV } from '@concave/core'
import { Button, Card, Collapse, Text, useDisclosure } from '@concave/ui'
import { AddTokenToWalletButton } from 'components/AddTokenToWalletButton'
import {
  CurrencyInputField,
  CurrencyOutputField,
  SwitchCurrencies,
  useSwapButtonProps,
  useSwapState,
  useSwapTransaction,
} from 'components/AMM'
import { useSwapSettings } from 'components/AMM/Swap/Settings'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { PcnvNotification } from './PcnvNotification'
import { TradeDetails } from './TradeDetails'

const ConfirmSwapModal = dynamic(() => import('components/AMM/Swap/ConfirmSwapModal'))
const CustomRecipient = dynamic(() => import('components/AMM/Swap/CustomRecipient'))
const NetworkMismatch = dynamic(() => import('../NetworkMismatch'))
const SelectAMMCurrency = dynamic(() => import('components/CurrencySelector/SelectAMMCurrency'))
const WaitingConfirmationDialog = dynamic(
  () => import('components/TransactionDialog/TransactionWaitingConfirmationDialog'),
)
const TransactionSubmittedDialog = dynamic(
  () => import('components/TransactionDialog/TransactionSubmittedDialog'),
)
const TransactionErrorDialog = dynamic(
  () => import('components/TransactionDialog/TransactionErrorDialog'),
)

export function SwapCard() {
  const { trade, error, onChangeInput, onChangeOutput, switchFields, onReset } = useSwapState()

  const [recipient, setRecipient] = useState('')
  const {
    onOpen: openConfirmationModal,
    onClose: closeConfirmationModal,
    isOpen: isConfirmationModalOpen,
  } = useDisclosure()

  const swapTx = useSwapTransaction(trade, recipient, {
    onSuccess: (tx) => {
      onChangeInput(toAmount(0, trade.inputAmount.currency))
      closeConfirmationModal()
    },
  })

  const isExpertMode = useSwapSettings((s) => s.settings.expertMode)

  const swapButtonProps = useSwapButtonProps({
    trade,
    error,
    recipient,
    onSwapClick: useCallback(
      () => (isExpertMode ? swapTx.write() : openConfirmationModal()),
      [isExpertMode, swapTx, openConfirmationModal],
    ),
  })

  const networkId = useCurrentSupportedNetworkId()

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
        willChange="transform"
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

        <PcnvNotification
          isOpen={
            PCNV[networkId].equals(trade.inputAmount?.currency) ||
            PCNV[networkId].equals(trade.outputAmount?.currency)
          }
          currencyAmount={trade.outputAmount}
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
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
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
