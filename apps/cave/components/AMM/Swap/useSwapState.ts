import { useCallback, useMemo, useRef, useState } from 'react'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { getBestTrade } from '../hooks/useTrade'
import { useSwapSettings } from '../Swap/Settings'
import { useLinkedCurrencyAmounts } from 'components/CurrencyAmountField'
import { usePairs } from '../hooks/usePair'
import { useQueryCurrencies } from '../hooks/useQueryCurrencies'
import { Currency, CurrencyAmount } from '@concave/core'

export const useSwapState = () => {
  const { currencies } = useQueryCurrencies()

  const { settings } = useSwapSettings()
  const maxHops = settings.multihops ? 3 : 1

  const pairs = usePairs(currencies[0].wrapped, currencies[1].wrapped, maxHops)
  const trade = useRef<Trade<Currency, Currency, TradeType>>(null)

  const [error, setError] = useState()

  const { amounts, onChangeField, switchCurrencies } = useLinkedCurrencyAmounts({
    onDerive: useCallback(
      (enteredAmount: CurrencyAmount<Currency>, _currencies: typeof currencies) => {
        const [otherCurrency, tradeType] = enteredAmount.currency.equals(_currencies[0])
          ? [_currencies[1], TradeType.EXACT_INPUT]
          : [_currencies[0], TradeType.EXACT_OUTPUT]

        try {
          trade.current = getBestTrade(pairs.data, tradeType, enteredAmount, otherCurrency, {
            maxHops,
          })
          setError(undefined)
          return tradeType === TradeType.EXACT_INPUT
            ? trade.current.outputAmount
            : trade.current.inputAmount
        } catch (e) {
          setError(e)
          return undefined
        }
      },
      [maxHops, pairs.data],
    ),
  })

  return useMemo(
    () => ({
      trade: trade.current,
      error,
      inputAmount: amounts[0],
      outputAmount: amounts[1],
      onChangeInput: onChangeField(0),
      onChangeOutput: onChangeField(1),
      switchCurrencies,
    }),
    [error, amounts, onChangeField, switchCurrencies],
  )
}
