import { CurrencyAmount, Currency, TradeType, Ether } from '@uniswap/sdk-core'
import { findBestTrade, usePairs, useQuote } from 'hooks/useBestTrade'
import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { chain, useBalance, useNetwork } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'
import { Trade } from '@uniswap/v2-sdk'
import { defaultSettings } from './Settings'
// import { debounce } from 'debounce'

const useCurrencyBalance = (currency: Currency, userAddress: string) =>
  useBalance({
    addressOrName: userAddress,
    token: currency?.isToken && currency?.address,
    formatUnits: currency?.decimals,
    skip: !currency || !userAddress,
  })

export const useNativeCurrency = () => {
  const [{ data: network }] = useNetwork()
  return useMemo(
    () =>
      Ether.onChain(network?.chain?.id === chain.ropsten.id ? chain.ropsten.id : chain.mainnet.id),
    [network],
  )
}

export type TradeInfo = {
  trade:
    | Trade<Currency, Currency, TradeType.EXACT_INPUT>
    | Trade<Currency, Currency, TradeType.EXACT_OUTPUT>
  settings: typeof defaultSettings
}

export const useSwap = () => {
  const nativeCurrency = useNativeCurrency()
  const [settings, setSettings] = useState(defaultSettings)

  const [currencyIn, setCurrencyIn] = useState<Currency>(nativeCurrency)
  const [currencyOut, setCurrencyOut] = useState<Currency>()

  const [amountIn, setAmountIn] = useState<string>()
  const [amountOut, setAmountOut] = useState<string>()

  const { user } = useAuth()

  const [{ data: currencyInBalance }] = useCurrencyBalance(currencyIn, user?.address)
  const [{ data: currencyOutBalance }] = useCurrencyBalance(currencyOut, user?.address)

  const { price: currencyInUsdPrice } = useQuote(currencyIn, 1)
  const { price: currencyOutUsdPrice } = useQuote(currencyOut, 1)

  const { price: relativePrice } = useQuote(currencyOut?.wrapped, 1, currencyIn?.wrapped)

  const pairs = usePairs(currencyIn?.wrapped, currencyOut?.wrapped, settings.multihops ? 3 : 1)

  const tradeType = useRef(TradeType.EXACT_INPUT)
  const tradeInfo = useRef<TradeInfo>()

  useEffect(() => {
    const [desiredExactCurrency, amount, otherCurrency, setOtherFieldAmount] =
      tradeType.current === TradeType.EXACT_INPUT
        ? [currencyIn, amountIn, currencyOut, setAmountOut]
        : [currencyOut, amountOut, currencyIn, setAmountIn]

    setOtherFieldAmount('')
    if (!amount || !otherCurrency || !pairs.data || pairs.isLoading) return

    const desiredExactCurrencyAmount = CurrencyAmount.fromRawAmount(
      desiredExactCurrency,
      +amount * 10 ** desiredExactCurrency.decimals,
    )
    const bestTrade = findBestTrade(
      pairs.data,
      desiredExactCurrencyAmount,
      otherCurrency,
      tradeType.current,
      { maxHops: settings.multihops ? 3 : 1 },
    )

    const quote = bestTrade?.executionPrice?.quote(desiredExactCurrencyAmount)
    setOtherFieldAmount(quote.toSignificant(6))

    tradeInfo.current = { trade: bestTrade, settings }
  }, [currencyIn, currencyOut, pairs, tradeType, amountIn, amountOut, settings])

  const updateField = useCallback(
    (fieldTradeType: TradeType) => (amount) => {
      const setFieldAmount = fieldTradeType === TradeType.EXACT_INPUT ? setAmountIn : setAmountOut
      setFieldAmount(amount)
      tradeType.current = fieldTradeType
    },
    [],
  )

  const switchCurrencies = useCallback(() => {
    setCurrencyIn(currencyOut)
    setCurrencyOut(currencyIn)
    setAmountIn(amountOut)
    setAmountOut(amountIn)
    tradeType.current =
      tradeType.current === TradeType.EXACT_INPUT ? TradeType.EXACT_OUTPUT : TradeType.EXACT_INPUT
  }, [currencyIn, currencyOut, amountOut, amountIn, tradeType])

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
      setSettings,
      isFetchingPairs: pairs.isLoading || pairs.isRefetching || pairs.isFetching,
      isErrored: pairs.isError,
      isTradeReady: !!tradeInfo.current?.trade?.executionPrice,
      swapingIn: {
        currency: currencyIn,
        amount: amountIn,
        balance: currencyInBalance?.formatted,
        stable: currencyInUsdPrice,
      },
      swapingOut: {
        currency: currencyOut,
        amount: amountOut,
        balance: currencyOutBalance?.formatted,
        stable: currencyOutUsdPrice,
        relativePrice,
      },
      settings,
      tradeInfo: tradeInfo.current,
    }),
    [
      currencyIn,
      currencyOut,
      amountIn,
      amountOut,
      currencyInBalance,
      currencyOutBalance,
      currencyInUsdPrice,
      currencyOutUsdPrice,
      relativePrice,
      pairs,
      settings,
      tradeInfo,
      updateField,
      setOrSwitchCurrency,
      switchCurrencies,
    ],
  )
}
