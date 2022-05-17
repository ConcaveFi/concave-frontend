import { ChainId, CNV, Currency, DAI, Trade, TradeType } from '@concave/gemswap-sdk'
import {
  Button,
  Card,
  Collapse,
  Flex,
  HStack,
  Modal,
  Stack,
  Text,
  useDisclosure,
} from '@concave/ui'
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
import { CurrencyIcon } from 'components/CurrencyIcon'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import {
  currencyToJson,
  currencyFromJson,
  fetchCurrenciesFromQuery,
} from 'hooks/useSyncQueryCurrencies'
import { GetServerSideProps } from 'next'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount, useNetwork } from 'wagmi'

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [currency0, currency1] = await fetchCurrenciesFromQuery(ctx.query).catch(() => [])

  // if chainId is not supported default to mainnet
  // const c = currency0?.chainId || currency1?.chainId || +ctx.query.chainId
  // const chainId = swapSupportedChains.includes(c) ? c : 1

  const currencies = [currency0, currency1]
  const setCurrencies = !currency0?.equals(currency1) ? currencies : [currencies[0]]

  return { props: { currencies: setCurrencies.map(currencyToJson) } }
}

export function SwapPage({ currencies }) {
  const [settings, setSettings] = useState<SwapSettings>(defaultSettings)
  const [{ data: network }] = useNetwork()

  const networkId = useCurrentSupportedNetworkId()

  const initialCurrencies = useMemo(
    () => ({
      first: currencyFromJson(currencies[0]) || DAI[networkId],
      second: currencyFromJson(currencies[1]) || CNV[networkId],
    }),
    [currencies, networkId],
  )
  const { trade, onChangeInput, onChangeOutput, switchCurrencies } = useSwapState(
    settings,
    initialCurrencies,
  )

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
    trade.data.inputAmount?.currency,
    trade.data.outputAmount?.currency,
  ]

  const hasDetails = !!trade.data.route && trade.data.outputAmount.greaterThan(0)
  const [isDetailsOpen, toggleDetails] = useReducer((s) => hasDetails && !s, false)
  useEffect(() => {
    if (!hasDetails) toggleDetails()
  }, [hasDetails])

  return (
    <>
      <Flex
        wrap="wrap"
        alignContent="start"
        justify="center"
        mt={['10vh', '25vh']}
        mb={['25vh', 'none']}
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
            <RelativePrice currency0={currencyIn} currency1={currencyOut} mr="auto" />
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
          Swapping {swapTx.trade?.inputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.inputAmount.currency.symbol} for{' '}
          {swapTx.trade?.outputAmount.toSignificant(6, { groupSeparator: ',' })}{' '}
          {swapTx.trade?.outputAmount.currency.symbol}
        </Text>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog
        tx={swapTx.data}
        isOpen={swapTx.isTransactionSent}
        tokenSymbol={currencyOut.symbol}
        tokenOutAddress={currencyOut['address']} // workaround for type error
      />
      <TransactionErrorDialog error={swapTx.error?.message} isOpen={swapTx.isError} />

      {/* <Modal
        onClose={() => null}
        isCentered
        isOpen={true}
        title="Network Mismatch"
        bluryOverlay
        hideClose
        titleAlign="center"
      >
        <Stack spacing={4}>
          <Text align="center" fontSize="md" fontWeight="bold">
            You got here with a {CHAIN_NAME[currencyIn.chainId]} link
          </Text>

          <Flex gap={1} justify="center" fontWeight="medium">
            For a <CurrencyIcon size="xs" currency={currencyIn} />
            {currencyIn.symbol}
            {currencyOut.symbol && (
              <>
                {' '}
                to <CurrencyIcon size="xs" currency={currencyOut} /> {currencyOut.symbol}
              </>
            )}{' '}
            swap
          </Flex>

          <Flex justify="center" gap={2}>
            <Button variant="secondary" size="medium" px={3}>
              Continue to {network.chain?.name}
            </Button>
            <Button variant="primary" size="medium" px={3}>
              Switch Network
            </Button>
          </Flex>
        </Stack>
      </Modal> */}
    </>
  )
}

SwapPage.Meta = {
  title: 'Concave | Gemswap (AMM)',
  description: `Concave's AMM allows LPs to deploy deep liquidity for different pairs and allows LPs to earn more with less capital. The AMM has cheaper gas fees and swap fees.`,
}

export default SwapPage
