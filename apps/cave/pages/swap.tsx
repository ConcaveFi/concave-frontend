import { Currency, Trade, TradeType } from '@concave/gemswap-sdk'
import { Button, Card, Collapse, Flex, HStack, Stack, Text, useDisclosure } from '@concave/ui'
import {
  CandleStickCard,
  ConfirmSwapModal,
  CurrencyInputField,
  CurrencyOutputField,
  CustomRecipient,
  defaultSettings,
  GasPrice,
  RelativePrice,
  Settings,
  SwapSettings,
  SwitchCurrencies,
  useSwapButtonProps,
  useSwapState,
  useSwapTransaction,
} from 'components/AMM'
import { ExpectedOutput, MinExpectedOutput } from 'components/AMM/Swap/ExpectedOutput'
import { TradeRoute } from 'components/AMM/Swap/TradeRoute'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useEffect, useReducer, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount } from 'wagmi'

const TradeDetails = ({
  trade,
  settings,
}: {
  trade: Trade<Currency, Currency, TradeType>
  settings: SwapSettings
}) =>
  trade.route && (
    <Stack mb={4} p={4} w="full" shadow="Down Big" rounded="2xl">
      <ExpectedOutput outputAmount={trade.outputAmount} priceImpact={trade.priceImpact} />
      <MinExpectedOutput trade={trade} slippageTolerance={settings.slippageTolerance} />
      <TradeRoute route={trade.route} />
    </Stack>
  )

export function SwapPage() {
  const [settings, setSettings] = useState<SwapSettings>(defaultSettings)

  const { trade, onChangeInput, onChangeOutput, switchCurrencies } = useSwapState(settings)

  const [{ data: account }] = useAccount()
  const [recipient, setRecipient] = useState('')
  const swapTx = useSwapTransaction(trade.data, settings, recipient || account?.address, {
    onTransactionSent: () => onChangeInput(toAmount(0, trade.data.inputAmount.currency)),
  })

  const confirmationModal = useDisclosure()

  const swapButton = useSwapButtonProps({
    trade,
    recipient,
    onSwapClick: settings.expertMode ? swapTx.submit : confirmationModal.onOpen,
  })

  const [currencyIn, currencyOut] = [
    trade.data.inputAmount.currency,
    trade.data.outputAmount.currency,
  ]

  const hasDetails = !!trade.data.route && trade.data.outputAmount.greaterThan(0)
  const [isDetailsOpen, toggleDetails] = useReducer((s) => hasDetails && !s, false)
  useEffect(() => {
    !hasDetails && toggleDetails()
  }, [hasDetails])

  return (
    <>
      <Flex
        wrap="wrap"
        alignContent="start"
        justify="center"
        mt={['10vh', '25vh']}
        w="100%"
        gap={10}
      >
        <CandleStickCard
          from={currencyIn}
          to={currencyOut}
          variant="secondary"
          gap={2}
          p={6}
          w="100%"
          h="min"
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
          <CurrencyInputField
            currencyAmountIn={trade.data.inputAmount}
            onChangeAmount={onChangeInput}
            CurrencySelector={SelectAMMCurrency}
          />

          <SwitchCurrencies onClick={switchCurrencies} />

          <CurrencyOutputField
            currencyAmountOut={trade.data.outputAmount}
            currencyAmountIn={trade.data.inputAmount}
            updateOutputValue={onChangeOutput}
          />

          {settings.expertMode && <CustomRecipient onChangeRecipient={setRecipient} />}

          <HStack
            onClick={toggleDetails}
            sx={hasDetails && { cursor: 'pointer', _hover: { bg: 'blackAlpha.200' } }}
            justify="center"
            align="center"
            py={2}
            px={3}
            rounded="xl"
          >
            <RelativePrice currencyIn={currencyIn} currencyOut={currencyOut} />
            <GasPrice />
            <Settings onChange={setSettings} />
          </HStack>

          <Collapse style={{ overflow: 'visible' }} in={isDetailsOpen} animateOpacity>
            <TradeDetails trade={trade.data} settings={settings} />
          </Collapse>

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
