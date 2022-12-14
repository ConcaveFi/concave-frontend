import { CHAIN_NAME, PCNV, ROUTER_ADDRESS } from '@concave/core'
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
import { useCurrencyApprove } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionErrorDialog } from 'components/TransactionDialog/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'

import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useCallback, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useWaitForTransaction } from 'wagmi'
import { NetworkMismatch } from '../NetworkMismatch'
import { SwapState } from './hooks/useSwapState'
import { PcnvNotification } from './PcnvNotification'
import { TradeDetails } from './TradeDetails'

/** webhook to start a db syncronization with the blockchain */
const requestDBSync = () => fetch('https://cnv-amm.vercel.app/api/gemswap', { keepalive: true })

export function SwapCard() {
  const swapState: SwapState = useSwapState()

  if ( !swapState.trade.inputAmount ) {
    return <></>
  }
  return <Swap {...swapState}></Swap> 
}

export function Swap(props: SwapState) {
  const { trade, error, onChangeInput, onChangeOutput, switchFields, onReset } = props;
  const { deadline: ttl } = useSwapSettings((s) => ({
    deadline: s.settings.deadline,
  }))

  const currencyApprove = useCurrencyApprove(
    trade.inputAmount,
    ROUTER_ADDRESS[trade.inputAmount?.currency.chainId],
    { enablePermit: true, ttl },
  )
  const [recipient, setRecipient] = useState('')
  const {
    onOpen: openConfirmationModal,
    onClose: closeConfirmationModal,
    isOpen: isConfirmationModalOpen,
  } = useDisclosure()

  const swapTx = useSwapTransaction(
    trade,
    recipient,
    {
      onSuccess: (tx) => {
        onChangeInput(toAmount(0, trade.inputAmount.currency))
        closeConfirmationModal()
      },
    },
    currencyApprove.permit,
  )

  useWaitForTransaction({
    wait: swapTx.data?.wait,
    onSuccess: requestDBSync,
    enabled: swapTx.isSuccess,
  })

  const isExpertMode = useSwapSettings((s) => s.settings.expertMode)
  const swapButtonProps = useSwapButtonProps({
    trade,
    error,
    recipient,
    currencyApprove,
    onSwapClick: useCallback(
      () => (isExpertMode ? swapTx.write() : openConfirmationModal()),
      [isExpertMode, swapTx, openConfirmationModal],
    ),
  })

  const networkId = useCurrentSupportedNetworkId()

  return (
    <>
      <Card
        key={`swap-${networkId}`}
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

      <TransactionSubmittedDialog title="Swap submitted" tx={swapTx.data} isOpen={swapTx.isSuccess}>
        {swapTx.trade?.outputAmount.currency.isToken && (
          <AddTokenToWalletButton token={swapTx.trade.outputAmount.currency.wrapped} />
        )}
      </TransactionSubmittedDialog>
      <TransactionErrorDialog error={swapTx.error?.message} isOpen={swapTx.isError} />
    </>
  )
}
