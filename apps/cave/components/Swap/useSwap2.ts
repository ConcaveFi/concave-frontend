import { CurrencyAmount, Currency, TradeType, Ether } from '@uniswap/sdk-core'
import { findBestTrade, usePairs, useQuote } from 'hooks/useBestTrade'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { chain, useBalance, useNetwork } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'
// import { debounce } from 'debounce'

type SwapSettings = {
  expertMode?: boolean
  multihops?: boolean
  deadline?: number
  slippageTolerance?: number
}

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

export const useSwap = (settings: SwapSettings = {}) => {
  const nativeCurrency = useNativeCurrency()

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

  const [tradeType, setTradeType] = useState(TradeType.EXACT_INPUT)

  useEffect(() => {
    if (!pairs.data || pairs.isLoading) return

    const [desiredExactCurrency, amount, otherCurrency, setOtherFieldAmount] =
      tradeType === TradeType.EXACT_INPUT
        ? [currencyIn, amountIn, currencyOut, setAmountOut]
        : [currencyOut, amountOut, currencyIn, setAmountIn]

    if (!amount || !otherCurrency) return

    const desiredExactCurrencyAmount = CurrencyAmount.fromRawAmount(
      desiredExactCurrency,
      +amount * 10 ** desiredExactCurrency.decimals,
    )
    const bestTrade = findBestTrade(
      pairs.data,
      desiredExactCurrencyAmount,
      otherCurrency,
      tradeType,
      { maxHops: settings.multihops ? 3 : 1 },
    )

    setOtherFieldAmount(
      bestTrade?.executionPrice.quote(desiredExactCurrencyAmount).toSignificant(6),
    )
  }, [currencyIn, currencyOut, pairs, tradeType, amountIn, amountOut, settings])

  const updateField = useCallback(
    (fieldTradeType: TradeType) => (amount) => {
      const setFieldAmount = fieldTradeType === TradeType.EXACT_INPUT ? setAmountIn : setAmountOut
      setFieldAmount(amount)
      setTradeType(fieldTradeType)
    },
    [],
  )

  const switchCurrencies = useCallback(() => {
    setCurrencyIn(currencyOut)
    setCurrencyOut(currencyIn)
    setAmountIn(amountOut)
    setAmountOut(amountIn)
    setTradeType(
      tradeType === TradeType.EXACT_INPUT ? TradeType.EXACT_OUTPUT : TradeType.EXACT_INPUT,
    )
  }, [amountIn, amountOut, currencyIn, currencyOut, tradeType])

  const setOrSwitchCurrency = useCallback(
    (otherCurrency: Currency, setCurrency) => (currency: Currency) =>
      otherCurrency?.equals(currency) ? switchCurrencies() : setCurrency(currency),
    [switchCurrencies],
  )

  return {
    setAmountIn: updateField(TradeType.EXACT_INPUT),
    setAmountOut: updateField(TradeType.EXACT_OUTPUT),
    setCurrencyIn: setOrSwitchCurrency(currencyOut, setCurrencyIn),
    setCurrencyOut: setOrSwitchCurrency(currencyIn, setCurrencyOut),
    switchCurrencies,
    isFetchingPairs: pairs.isLoading,
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
  }
}
