import {
  ChainId,
  CHAIN_NAME,
  CNV,
  Currency,
  DAI,
  ROUTER_ADDRESS,
  Trade,
  TradeType,
} from '@concave/gemswap-sdk'
import { Card, Collapse, Flex, HStack, Stack, Text, useDisclosure } from '@concave/ui'
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
import {
  currencyFromJson,
  currencyToJson,
  fetchQueryCurrencies,
  useQueryCurrencies,
} from 'components/AMM/hooks/useQueryCurrencies'
import { NetworkMismatch } from 'components/AMM/NetworkMismatch'
import { ExpectedOutput, MinExpectedOutput } from 'components/AMM/Swap/ExpectedOutput'
import { TradeRoute } from 'components/AMM/Swap/TradeRoute'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { withPageTransition } from 'components/PageTransition'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { LayoutGroup } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { toAmount } from 'utils/toAmount'

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

export const swapSupportedChains = [ChainId.ETHEREUM, ChainId.ROPSTEN]
const defaultCurrencies = {
  [ChainId.ETHEREUM]: [DAI[1], CNV[1]],
  [ChainId.ROPSTEN]: [DAI[3], CNV[3]],
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const currencies = await fetchQueryCurrencies(query)
  const currenciesOrDefaults =
    currencies.filter(Boolean).length === 0
      ? defaultCurrencies[+query.chainId] || defaultCurrencies[1]
      : currencies
  return { props: { currencies: currenciesOrDefaults.map(currencyToJson) } }
}

export function SwapPage({ currencies: serverPropsCurrencies }) {
  const [settings, setSettings] = useState<SwapSettings>(defaultSettings)

  const currencies = useMemo(
    () => serverPropsCurrencies?.map(currencyFromJson),
    [serverPropsCurrencies],
  )
  const { onChangeCurrencies, isNetworkMismatch, queryHasCurrency, currentChainId, queryChainId } =
    useQueryCurrencies()

  const { trade, onChangeInput, onChangeOutput, switchCurrencies } = useSwapState(
    settings,
    currencies,
    onChangeCurrencies,
  )

  /*
    temporary workaround for unknow issue with swapTokenForExactToken
    all trades are submited as exact input for now
  */
  const exactInTrade = useMemo(
    () =>
      trade.data.route &&
      new Trade(trade.data.route, trade.data.inputAmount, TradeType.EXACT_INPUT),
    [trade],
  )

  const [recipient, setRecipient] = useState('')
  const swapTx = useSwapTransaction(exactInTrade, settings, recipient, {
    onTransactionSent: () => onChangeInput(toAmount(0, trade.data.inputAmount.currency)),
  })

  const confirmationModal = useDisclosure()
  const swapButtonProps = useSwapButtonProps({
    trade,
    recipient,
    onSwapClick: settings.expertMode ? swapTx.submit : confirmationModal.onOpen,
  })

  /*
    toggle trade details, only toggleable when there is a valid trade 
    auto hide when there is no details to show (inputs are emptied)
  */
  const hasDetails = !!trade.data.route && trade.data.outputAmount.greaterThan(0)
  const [isDetailsOpen, toggleDetails] = useReducer((s) => hasDetails && !s, false)
  useEffect(() => {
    if (!hasDetails) toggleDetails()
  }, [hasDetails])

  return (
    <>
      <Flex
        wrap="wrap"
        justify="center"
        mt={{ base: '10vh', xl: '25vh' }}
        mb={['25vh', 'none']}
        w="100%"
        gap={10}
      >
        <LayoutGroup>
          <CandleStickCard
            from={trade.data.inputAmount?.currency}
            to={trade.data.outputAmount?.currency}
          />

          <Card
            p={6}
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
              <RelativePrice
                currency0={trade.data.inputAmount?.currency}
                currency1={trade.data.outputAmount?.currency}
                mr="auto"
              />
              <GasPrice />
              <Settings onChange={setSettings} />
            </HStack>

            <Collapse style={{ overflow: 'visible' }} in={isDetailsOpen} animateOpacity>
              <TradeDetails trade={trade.data} settings={settings} />
            </Collapse>

            <ApproveButton
              variant="primary"
              size="large"
              w="full"
              approveArgs={{
                currency: trade.data.inputAmount.currency,
                spender: ROUTER_ADDRESS[trade.data.inputAmount.currency?.chainId],
              }}
              {...swapButtonProps}
            />

            <NetworkMismatch
              isOpen={isNetworkMismatch && queryHasCurrency}
              expectedChainId={queryChainId}
              currentChainId={currentChainId}
            >
              <Text color="text.low">
                Do you wanna drop this {CHAIN_NAME[queryChainId]} trade
                <br />
                and restart on {CHAIN_NAME[currentChainId]}?
              </Text>
            </NetworkMismatch>
          </Card>
        </LayoutGroup>
      </Flex>

      <ConfirmSwapModal
        trade={exactInTrade}
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
          Swapping {swapTx.trade?.inputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.inputAmount.currency.symbol} for{' '}
          {swapTx.trade?.outputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.outputAmount.currency.symbol}
        </Text>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog
        tx={swapTx.data}
        isOpen={swapTx.isTransactionSent}
        tokenSymbol={swapTx.trade?.inputAmount.currency.symbol}
        tokenOutAddress={swapTx.trade?.outputAmount.currency.address} // workaround for type error
      />
      <TransactionErrorDialog error={swapTx.error?.message} isOpen={swapTx.isError} />

      {/* <NetworkMismatchModal /> */}
    </>
  )
}

SwapPage.Meta = {
  title: 'Concave | Gemswap (AMM)',
  description: `Concave's AMM allows LPs to deploy deep liquidity for different pairs and allows LPs to earn more with less capital. The AMM has cheaper gas fees and swap fees.`,
}

export default withPageTransition(SwapPage)
