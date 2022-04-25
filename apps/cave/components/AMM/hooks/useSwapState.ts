import { useState, useCallback, useMemo, useEffect } from 'react'
import { Currency, TradeType, CNV, DAI, CurrencyAmount } from 'gemswap-sdk'
import { useTrade } from './useTrade'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { SwapSettings } from '../Settings'

export const useSwapState = ({ multihops }: SwapSettings) => {
  const networkId = useCurrentSupportedNetworkId()

  const [currencyIn, setCurrencyIn] = useState<Currency>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Currency>(CNV[networkId])

  useEffect(() => {
    setCurrencyIn(DAI[networkId])
    setCurrencyOut(CNV[networkId])
  }, [networkId])

  /*
    we only need the value of the input the user typed in, 
    the other input value is then derived from it, simulating the 'trade'
  */
  const [exactAmount, setExactAmount] = useState<CurrencyAmount<Currency>>()

  const isExactIn = exactAmount?.currency.equals(currencyIn)
  const otherCurrency = isExactIn ? currencyOut : currencyIn

  const { data: trade, error: tradeError } = useTrade(exactAmount, otherCurrency.wrapped, {
    tradeType: isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
    maxHops: multihops ? 3 : 1,
  })

  /*
    if shouldKeepValue, we only change the currency, if false we 'send' input value to output
  */
  const switchCurrencies = useCallback(
    (shouldKeepValues = false) => {
      setCurrencyIn(currencyOut)
      setCurrencyOut(currencyIn)
      if (shouldKeepValues)
        setExactAmount(
          CurrencyAmount.fromRawAmount(
            isExactIn ? currencyOut : currencyIn,
            isExactIn ? trade.inputAmount.quotient : trade.outputAmount.quotient,
          ),
        )
    },
    [currencyIn, currencyOut, isExactIn, trade?.inputAmount.quotient, trade?.outputAmount.quotient],
  )

  const setOrSwitchCurrency = useCallback(
    (otherCurrency: Currency, setCurrency) => (currency: Currency) =>
      otherCurrency?.equals(currency) ? switchCurrencies(true) : setCurrency(currency),
    [switchCurrencies],
  )

  return useMemo(
    () => ({
      trade,
      tradeError,
      currencyIn,
      currencyOut,
      onChangeAmount: setExactAmount,
      updateCurrencyIn: setOrSwitchCurrency(currencyOut, setCurrencyIn),
      updateCurrencyOut: setOrSwitchCurrency(currencyIn, setCurrencyOut),
      switchCurrencies: () => switchCurrencies(false),
    }),
    [trade, tradeError, currencyIn, currencyOut, setOrSwitchCurrency, switchCurrencies],
  )
}
