import { useState, useMemo, useCallback } from 'react'
import { Currency, TradeType } from '@concave/gemswap-sdk'
import { useTrade, UseTradeResult } from '../hooks/useTrade'
import { SwapSettings } from '../Settings'
import { toAmount } from 'utils/toAmount'
import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { LinkedCurrencyFields } from 'components/CurrencyAmountField/useLinkedCurrencyFields'

const makeTradePlaceholder = (exactAmount, otherCurrency, tradeType) =>
  tradeType === TradeType.EXACT_INPUT
    ? { inputAmount: exactAmount, outputAmount: toAmount(0, otherCurrency) }
    : { inputAmount: toAmount(0, otherCurrency), outputAmount: exactAmount }

export const useSwapState = (
  { multihops }: SwapSettings,
  initialCurrencies: Currency[],
  onChangeCurrencies: (currencies: LinkedCurrencyFields) => void,
) => {
  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState(toAmount(0, initialCurrencies[0]))

  const { onChangeField, switchCurrencies, currencies, lastUpdated } = useLinkedCurrencyFields(
    initialCurrencies,
    useCallback((newAmount) => setExactAmount(newAmount), []),
    onChangeCurrencies,
  )

  const tradeType = lastUpdated === 'first' ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT
  const otherCurrency = currencies[lastUpdated === 'first' ? 'second' : 'first']

  const trade = useTrade(exactAmount, otherCurrency, {
    tradeType,
    maxHops: multihops ? 3 : 1,
  })

  // return this partial just to show some data while loading (like currencies icons) if needed
  const partialTrade = useMemo(
    () =>
      ({
        ...trade,
        data: makeTradePlaceholder(exactAmount, otherCurrency, tradeType),
      } as UseTradeResult),
    [exactAmount, otherCurrency, tradeType, trade],
  )

  return useMemo(
    () => ({
      trade: trade.isSuccess ? trade : partialTrade,
      onChangeInput: onChangeField('first'),
      onChangeOutput: onChangeField('second'),
      switchCurrencies,
    }),
    [trade, partialTrade, switchCurrencies, onChangeField],
  )
}
