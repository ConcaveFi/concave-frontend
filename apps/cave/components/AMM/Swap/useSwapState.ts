import { useState, useMemo, useCallback } from 'react'
import { Currency, TradeType, CurrencyAmount, Trade } from '@concave/gemswap-sdk'
import { useTrade, UseTradeResult } from '../hooks/useTrade'
import { SwapSettings } from '../Settings'
import { toAmount } from 'utils/toAmount'
import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { useUpdateEffect } from '@concave/ui'

export const useSwapState = ({ multihops }: SwapSettings, initialCurrencies) => {
  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState<CurrencyAmount<Currency>>(
    toAmount(0, initialCurrencies.first),
  )

  const { onChangeField, switchCurrencies, setCurrencies, currencies } = useLinkedCurrencyFields(
    initialCurrencies,
    useCallback((newAmount, field) => setExactAmount(newAmount), []),
  )

  useUpdateEffect(() => {
    setCurrencies(initialCurrencies)
    setExactAmount(toAmount(0, initialCurrencies.first))
  }, [initialCurrencies])

  const isExactIn = exactAmount?.currency.equals(currencies.first)
  const otherCurrency = currencies[isExactIn ? 'second' : 'first']

  const trade = useTrade(exactAmount, otherCurrency, {
    tradeType: isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
    maxHops: multihops ? 3 : 1,
  })

  // return this partial just to show some data while loading (like currencies icons) if needed
  const partialTradeData: Partial<Trade<Currency, Currency, TradeType>> = useMemo(
    () =>
      isExactIn
        ? { inputAmount: exactAmount, outputAmount: toAmount(0, otherCurrency) }
        : { inputAmount: toAmount(0, otherCurrency), outputAmount: exactAmount },
    [exactAmount, isExactIn, otherCurrency],
  )

  return useMemo(
    () => ({
      trade: trade.isSuccess ? trade : ({ ...trade, data: partialTradeData } as UseTradeResult),
      onChangeInput: onChangeField('first'),
      onChangeOutput: onChangeField('second'),
      switchCurrencies,
    }),
    [trade, partialTradeData, switchCurrencies, onChangeField],
  )
}
