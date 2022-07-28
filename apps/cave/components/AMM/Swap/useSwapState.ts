import { Currency } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { useCallback, useMemo, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useQueryCurrencies } from '../hooks/useQueryCurrencies'
import { useTrade } from '../hooks/useTrade'
import { useSwapSettings } from '../Swap/Settings'

const makeTradePlaceholder = (exactAmount, otherCurrency, tradeType) =>
  (tradeType === TradeType.EXACT_INPUT
    ? { inputAmount: exactAmount, outputAmount: toAmount(0, otherCurrency) }
    : { inputAmount: toAmount(0, otherCurrency), outputAmount: exactAmount }) as Trade<
    Currency,
    Currency,
    TradeType
  >

export const useSwapState = () => {
  const { currencies, onChangeCurrencies } = useQueryCurrencies()

  const { settings } = useSwapSettings()
  const maxHops = settings.multihops ? 3 : 1

  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState(toAmount(0, currencies[0]))

  const { onChangeField, lastUpdated } = useLinkedCurrencyFields({
    currencies,
    onChangeCurrencies,
    onChangeAmount: setExactAmount,
  })

  const tradeType = lastUpdated === 0 ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT
  const otherCurrency = currencies[lastUpdated === 0 ? 1 : 0]

  const trade = useTrade(exactAmount, otherCurrency, { tradeType, maxHops })

  const switchFields = useCallback(() => {
    const otherField = lastUpdated === 0 ? 1 : 0
    // const newAmount = CurrencyAmount.fromRawAmount(currencies[lastUpdated], amounts[lastUpdated])
    onChangeField(otherField)(trade.data.outputAmount)
  }, [trade, lastUpdated, onChangeField])

  return useMemo(
    () => ({
      error: trade.error as string,
      trade: trade.isSuccess
        ? trade.data
        : makeTradePlaceholder(exactAmount, otherCurrency, tradeType),
      onChangeInput: onChangeField(0),
      onChangeOutput: onChangeField(1),
      switchFields,
      onReset: () => onChangeField(0)(toAmount(0, currencies[0])),
    }),
    [
      trade.error,
      trade.isSuccess,
      trade.data,
      exactAmount,
      otherCurrency,
      tradeType,
      onChangeField,
      switchFields,
      currencies,
    ],
  )
}
