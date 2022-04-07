import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { chain, useContract, useContractWrite, useNetwork } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'
import { defaultSettings, SwapSettings } from './Settings'
import { concaveProvider } from 'lib/providers'
import { usePairs } from './hooks/usePair'
import {
  RouterABI,
  ROUTER_ADDRESS,
  CurrencyAmount,
  Router,
  Currency,
  TradeType,
  Trade,
  CNV,
  DAI,
} from 'c-sdk'
import { useTrade } from './hooks/useTrade'
import swap from 'pages/swap'
import { useQuery } from 'react-query'
import { Contract } from 'ethers'
import { tryParseAmount } from './utils/parseInputAmount'

export const useCurrentSupportedNetworkId = () => {
  const [{ data: network }] = useNetwork()
  const isRopsten = network?.chain?.id === chain.ropsten.id
  // we only support mainnet rn, so unless we testing in ropsten, default to gather data from mainnet
  return isRopsten ? chain.ropsten.id : chain.mainnet.id
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

// type SwapState = {
//   recipient: string
//   [Field.Input]: Currency
//   [Field.Output]: Currency
//   exactField: Field
//   exactAmount: string
//   // trade: Trade<Currency, Currency, TradeType>,
//   // settings: SwapSettings,
// }

// const enum Field {
//   Input,
//   Output,
// }

// type SwapAction =
//   | { type: 'user_input'; field: Field; value: string }
//   | { type: 'select_currency'; field: Field; currency: Currency }
//   | { type: 'switch_currencies' }
//   | { type: 'set_recipient'; recipient: string }

// const swapReducer = (state: SwapState, action: SwapAction) => {
//   switch (action.type) {
//     case 'user_input':
//       return {
//         ...state,
//         exactField: action.field,
//         exactAmount: action.value,
//       }
//     case 'select_currency': {
//       const otherField = action.field === Field.Input ? Field.Input : Field.Output
//       if (action.currency === state[otherField])
//         return {
//           ...state,
//           [action.field]: action.currency,
//           [otherField]: state[action.field],
//         }
//       return { ...state, [action.field]: action.currency }
//     }
//     case 'switch_currencies':
//       return {
//         ...state,
//         exactField: state.exactField === Field.Input ? Field.Output : Field.Input,
//         [Field.Input]: state[Field.Output],
//         [Field.Output]: state[Field.Input],
//       }
//     case 'set_recipient':
//       return { ...state, recipient: action.recipient }
//   }
// }

//   const [exactCurrency, otherCurrency] =
//     TradeType.EXACT_INPUT === tradeType.current
//       ? [currencyIn, currencyOut]
//       : [currencyOut, currencyIn]
//   const trade = useTrade(CurrencyAmount.fromRawAmount(exactCurrency, exactValue), otherCurrency, {
//     tradeType: tradeType.current,
//     maxHops: 1,
//   })

export const useSwapState = () => {
  const networkId = useCurrentSupportedNetworkId()

  const [currencyIn, setCurrencyIn] = useState<Currency>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Currency>(CNV[networkId])
  const [exactValue, setExactValue] = useState<string>('')
  const [tradeType, setTradeType] = useState<TradeType>(TradeType.EXACT_INPUT)
  const [recipient, setRecipient] = useState<string>('')

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

  const [exactCurrency, otherCurrency] =
    tradeType === TradeType.EXACT_INPUT ? [currencyIn, currencyOut] : [currencyOut, currencyIn]
  const parsedExactAmount = tryParseAmount(exactValue, exactCurrency)
  const trade = useTrade(parsedExactAmount, otherCurrency, { tradeType, maxHops: 1 })

  const [inputValue, outputValue] =
    tradeType === TradeType.EXACT_INPUT
      ? [exactValue, trade.trade?.outputAmount.toSignificant(6)]
      : [trade.trade?.inputAmount.toSignificant(6), exactValue]

  return useMemo(
    () => ({
      tradeStatus: trade.status,
      currencyIn,
      currencyOut,
      inputValue,
      outputValue,
      recipient,
      tradeType,
      updateInputValue: updateField(TradeType.EXACT_INPUT),
      updateOutputValue: updateField(TradeType.EXACT_OUTPUT),
      updateCurrencyIn: setOrSwitchCurrency(currencyOut, setCurrencyIn),
      updateCurrencyOut: setOrSwitchCurrency(currencyIn, setCurrencyOut),
      switchCurrencies,
      setRecipient,
    }),
    [
      currencyIn,
      currencyOut,
      inputValue,
      outputValue,
      recipient,
      setOrSwitchCurrency,
      switchCurrencies,
      trade.status,
      tradeType,
    ],
  )
}
