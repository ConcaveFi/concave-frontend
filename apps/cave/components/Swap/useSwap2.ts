import { useState, useCallback, useMemo } from 'react'
import { chain, useNetwork } from 'wagmi'
import { SwapSettings } from './Settings'
import {
  RouterABI,
  ROUTER_ADDRESS,
  Router,
  Currency,
  TradeType,
  Trade,
  CNV,
  DAI,
  Pair,
  CurrencyAmount,
} from 'gemswap-sdk'
import { useTrade } from './hooks/useTrade'
import { useQuery } from 'react-query'
import { Contract } from 'ethers'
import { tryParseAmount } from './utils/parseInputAmount'
import { usePair, usePairs } from './hooks/usePair'

export const useCurrentSupportedNetworkId = () => {
  return 1
  // const { activeChain } = useNetwork()
  // const isRopsten = activeChain?.id === chain.ropsten.id
  // // we only support mainnet rn, so unless we testing in ropsten, default to mainnet
  // return isRopsten ? chain.ropsten.id : chain.mainnet.id
}

// export default function useTransactionDeadline(): BigNumber | undefined {
//   const ttl =

//   const blockTimestamp = useCurrentBlockTimestamp()
//   // console.log({ ttl, blockTimestamp })
//   return useMemo(() => {
//     if (blockTimestamp && ttl) return blockTimestamp.add(ttl)
//     return undefined
//   }, [blockTimestamp, ttl])
// }

export const useSwapTransaction = (
  trade: Trade<Currency, Currency, TradeType>,
  recipient: string,
  settings: SwapSettings,
) => {
  const networkId = useCurrentSupportedNetworkId()

  const [swap, estimateSwapGas] = useMemo(() => {
    const routerContract = new Contract(ROUTER_ADDRESS[networkId], RouterABI)
    const { methodName, args, value } = Router.swapCallParameters(trade, {
      allowedSlippage: settings.slippageTolerance,
      ttl: settings.deadline,
      recipient,
    })
    return [
      () => routerContract[methodName]({ args, overrides: { value } }),
      () => routerContract.estimateGas[methodName]({ args, overrides: { value } }),
    ]
  }, [networkId, recipient, settings.slippageTolerance, settings.deadline, trade])

  const { refetch, ...swapTransaction } = useQuery(['swap', recipient, trade, settings], swap, {
    enabled: false,
  })

  return [estimateSwapGas, swapTransaction, refetch]
}

export const useSwapState = () => {
  const networkId = useCurrentSupportedNetworkId()

  const [currencyIn, setCurrencyIn] = useState<Currency>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Currency>(CNV[networkId])
  const [exactValue, setExactValue] = useState<string>('')
  const [tradeType, setTradeType] = useState<TradeType>(TradeType.EXACT_INPUT)
  // const [recipient, setRecipient] = useState<string>('')

  const updateField = (fieldTradeType: TradeType) => (amount) => {
    setExactValue(amount)
    setTradeType(fieldTradeType)
  }

  const switchCurrencies = useCallback(() => {
    setCurrencyIn(currencyOut)
    setCurrencyOut(currencyIn)
    setTradeType(
      tradeType === TradeType.EXACT_INPUT ? TradeType.EXACT_OUTPUT : TradeType.EXACT_INPUT,
    )
  }, [currencyIn, currencyOut, tradeType])

  const setOrSwitchCurrency = useCallback(
    (otherCurrency: Currency, setCurrency) => (currency: Currency) =>
      otherCurrency?.equals(currency)
        ? (setCurrencyIn(currencyOut), setCurrencyOut(currencyIn))
        : setCurrency(currency),
    [currencyIn, currencyOut],
  )

  const [exactCurrencyAmount, otherCurrency] =
    tradeType === TradeType.EXACT_INPUT
      ? [tryParseAmount(exactValue, currencyIn), currencyOut]
      : [tryParseAmount(exactValue, currencyOut), currencyIn]

  const { trade, ...tradeStatus } = useTrade(exactCurrencyAmount, otherCurrency.wrapped, {
    tradeType,
    maxHops: 3,
  })

  const [currencyAmountIn, currencyAmountOut] =
    tradeType === TradeType.EXACT_INPUT
      ? [exactCurrencyAmount, trade?.outputAmount]
      : [trade?.inputAmount, exactCurrencyAmount]

  return useMemo(
    () => ({
      trade,
      tradeStatus,
      currencyIn,
      currencyOut,
      currencyAmountIn,
      currencyAmountOut,
      // recipient,
      tradeType,
      updateInputValue: updateField(TradeType.EXACT_INPUT),
      updateOutputValue: updateField(TradeType.EXACT_OUTPUT),
      updateCurrencyIn: setOrSwitchCurrency(currencyOut, setCurrencyIn),
      updateCurrencyOut: setOrSwitchCurrency(currencyIn, setCurrencyOut),
      switchCurrencies,
      // setRecipient,
    }),
    [
      trade,
      tradeStatus,
      currencyAmountIn,
      currencyAmountOut,
      currencyIn,
      currencyOut,
      // recipient,
      setOrSwitchCurrency,
      switchCurrencies,
      tradeType,
    ],
  )
}
