import { CurrencyAmount, Currency, TradeType, Ether, Percent, Trade, Router } from 'gemswap-sdk'
import { findBestTrade, usePairs, useQuote } from 'hooks/useBestTrade'
import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { chain, useBalance, useNetwork } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'
import { defaultSettings } from './Settings'
import { RouterABI } from './routerABI'
import { useContractWrite } from './hooks/useContractWrite'
import { CNV, DAI } from 'constants/tokens'
import { ROPSTEN_CNV, ROPSTEN_DAI } from 'constants/ropstenTokens'
import { concaveProvider } from 'lib/providers'

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

export const ROUTER_CONTRACT = {
  [chain.mainnet.id]: '0x0a3e1c20b5384eb97d2ccff9a96bc91f0c77e7db',
  [chain.ropsten.id]: '0x95dDC411d31bBeDd37e9aaABb335b0951Bc2D25a',
}

export type TradeInfo = {
  trade: Trade<Currency, Currency, TradeType>
  meta: {
    allowedSlippage: Percent
    expectedOutput: string
    worstExecutionPrice: string
  }
}

export const useSwap = () => {
  const [{ data: network }] = useNetwork()

  const [settings, setSettings] = useState(defaultSettings)

  const isRopsten = network?.chain?.id === chain.ropsten.id
  const [currencyOut, setCurrencyOut] = useState<Currency>(isRopsten ? ROPSTEN_CNV : CNV)
  const [currencyIn, setCurrencyIn] = useState<Currency>(isRopsten ? ROPSTEN_DAI : DAI)

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

    if (+amount <= 0 || isNaN(+amount)) {
      return
    }

    setOtherFieldAmount('')

    if (!amount || !otherCurrency || !desiredExactCurrency || !pairs.data || pairs.isLoading) return

    const desiredExactCurrencyAmount = CurrencyAmount.fromRawAmount(
      desiredExactCurrency,
      Math.round(+amount * 10 ** desiredExactCurrency.decimals), //The number 1100000000000000.1 cannot be converted to BigInt because it is not an integer
    )
    const bestTrade = findBestTrade(
      pairs.data,
      desiredExactCurrencyAmount,
      otherCurrency,
      tradeType.current,
      { maxHops: 1 },
    )
    //
    const quote = bestTrade?.executionPrice?.quote(desiredExactCurrencyAmount)
    setOtherFieldAmount(quote.toSignificant(6))

    const allowedSlippage = new Percent(settings.slippageTolerance * 100, 100_000)
    const expectedOutput = bestTrade.executionPrice
      .quote(desiredExactCurrencyAmount)
      .toSignificant(6)
    const worstExecutionPrice = bestTrade
      .worstExecutionPrice(allowedSlippage)
      .quote(desiredExactCurrencyAmount)
      .toSignificant(6)

    tradeInfo.current = {
      trade: bestTrade as any,
      meta: {
        allowedSlippage,
        expectedOutput,
        worstExecutionPrice,
      },
    }
  }, [currencyIn, currencyOut, pairs, tradeType, amountIn, amountOut, settings])

  const [swapTransaction, swap] = useContractWrite({
    addressOrName: ROUTER_CONTRACT[isRopsten ? chain.ropsten.id : chain.mainnet.id],
    contractInterface: RouterABI,
  })

  const confirmSwap = useCallback(async () => {
    const provider = concaveProvider(chain.ropsten.id)
    const currentBlockNumber = await provider.getBlockNumber()
    const { timestamp } = await provider.getBlock(currentBlockNumber)
    const deadLine = timestamp + 1
    const { methodName, args, value } = Router.swapCallParameters(tradeInfo.current.trade, {
      allowedSlippage: tradeInfo.current.meta.allowedSlippage,
      ttl: deadLine,
      recipient: user.address,
      // feeOnTransfer?: boolean;
    })
    swap(methodName, { args, overrides: { value } })
  }, [swap, user.address])
  // settings.deadline, swap, user.address

  const updateField = useCallback(
    (fieldTradeType: TradeType) => (amount) => {
      const setFieldAmount = fieldTradeType === TradeType.EXACT_INPUT ? setAmountIn : setAmountOut
      setFieldAmount(amount)
      tradeType.current = fieldTradeType
    },
    [],
  )

  // const switchCurrencies = useCallback(() => {
  //   setCurrencyIn(currencyOut)
  //   setCurrencyOut(currencyIn)
  //   setAmountIn(amountOut)
  //   setAmountOut(amountIn)
  //   tradeType.current =
  //     tradeType.current === TradeType.EXACT_INPUT ? TradeType.EXACT_OUTPUT : TradeType.EXACT_INPUT
  // }, [currencyIn, currencyOut, amountOut, amountIn, tradeType])

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
      switchCurrencies: () => {
        setCurrencyIn(currencyOut)
        setCurrencyOut(currencyIn)
      },
      setSettings,
      isFetchingPairs: pairs.isLoading || pairs.isRefetching || pairs.isFetching,
      isErrored: pairs.isError,
      isTradeReady: !!tradeInfo.current?.trade.executionPrice,
      swapTransaction,
      confirmSwap,
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
      swapTransaction,
      confirmSwap,
      updateField,
      setOrSwitchCurrency,
      // switchCurrencies,
    ],
  )
}
