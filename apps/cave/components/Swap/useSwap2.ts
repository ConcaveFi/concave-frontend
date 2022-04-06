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

const useCurrentNetworkId = () => {
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
  const [{ data: network }] = useNetwork()

  const [swap, estimateSwapGas] = useMemo(() => {
    const routerContract = new Contract(ROUTER_ADDRESS[network.chain.id], RouterABI)
    const { methodName, args, value } = Router.swapCallParameters(trade, {
      allowedSlippage: settings.slippageTolerance,
      ttl: settings.deadline,
      recipient,
    })
    return [
      () => routerContract[methodName]({ args, overrides: { value } }),
      () => routerContract.estimateGas[methodName]({ args, overrides: { value } }),
    ]
  }, [network.chain.id, recipient, settings.slippageTolerance, settings.deadline, trade])

  const { refetch, ...swapTransaction } = useQuery(['swap', recipient, trade, settings], swap, {
    enabled: false,
  })

  return [estimateSwapGas, swapTransaction, refetch]
}

export const useSwapActions = () => {
  const { tradeType, currencyIn, currencyOut, setCurrencyIn, setCurrencyOut, setExactValue } =
    useSwapContext()

  const updateField = (fieldTradeType: TradeType) => (amount) => {
    setExactValue(amount)
    tradeType.current = fieldTradeType
  }

  const switchCurrencies = useCallback(() => {
    setCurrencyIn(currencyOut)
    setCurrencyOut(currencyIn)
    tradeType.current =
      tradeType.current === TradeType.EXACT_INPUT ? TradeType.EXACT_OUTPUT : TradeType.EXACT_INPUT
  }, [currencyIn, currencyOut])

  const setOrSwitchCurrency = useCallback(
    (otherCurrency: Currency, setCurrency) => (currency: Currency) =>
      otherCurrency?.equals(currency)
        ? (setCurrencyIn(currencyOut), setCurrencyOut(currencyIn))
        : setCurrency(currency),
    [currencyIn, currencyOut],
  )

  return useMemo(
    () => ({
      setAmountIn: updateField(TradeType.EXACT_INPUT),
      setAmountOut: updateField(TradeType.EXACT_OUTPUT),
      setCurrencyIn: setOrSwitchCurrency(currencyOut, setCurrencyIn),
      setCurrencyOut: setOrSwitchCurrency(currencyIn, setCurrencyOut),
      switchCurrencies,
    }),
    [currencyIn, currencyOut, setCurrencyIn, setCurrencyOut, switchCurrencies],
  )
}

export const useSwap = () => {
  const networkId = useCurrentNetworkId()

  const [settings, setSettings] = useState(defaultSettings)
  const [currencyIn, setCurrencyIn] = useState<Currency>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Currency>(CNV[networkId])
  const [exactValue, setExactValue] = useState<string>('')

  const pairs = usePairs(currencyIn?.wrapped, currencyOut?.wrapped, settings.multihops ? 3 : 1)

  const tradeType = useRef(TradeType.EXACT_INPUT)
  const [exactCurrency, otherCurrency] =
    TradeType.EXACT_INPUT === tradeType.current
      ? [currencyIn, currencyOut]
      : [currencyOut, currencyIn]
  const trade = useTrade(CurrencyAmount.fromRawAmount(exactCurrency, exactValue), otherCurrency, {
    tradeType: tradeType.current,
    maxHops: 1,
  })
}
