import { useCallback, useMemo, useRef, useState } from 'react'
import { BestTradeOptions, Pair, Trade, TradeType } from '@concave/gemswap-sdk'
import { getBestTrade } from '../hooks/useTrade'
import { useSwapSettings } from '../Swap/Settings'
import { useLinkedCurrencyAmounts } from 'components/CurrencyAmountField'
import { usePairs } from '../hooks/usePair'
import { useQueryCurrencies } from '../hooks/useQueryCurrencies'
import { Currency, CurrencyAmount } from '@concave/core'

const derive = (
  enteredAmount: CurrencyAmount<Currency>,
  currencies: [Currency, Currency],
  pairs: Pair[],
  options: BestTradeOptions,
) => {
  const [otherCurrency, tradeType] = enteredAmount.currency.equals(currencies[0])
    ? [currencies[1], TradeType.EXACT_INPUT]
    : [currencies[0], TradeType.EXACT_OUTPUT]

  const trade = getBestTrade(pairs, tradeType, enteredAmount, otherCurrency, options)
  return tradeType === TradeType.EXACT_INPUT ? trade.outputAmount : trade.inputAmount
}

const useSwitchFields = (onChangeField, amounts) => {
  const _amounts = useRef(amounts)

  const switchFields = useCallback(() => {
    onChangeField(1)(_amounts[0])
    _amounts.current = amounts
  }, [amounts, onChangeField])

  return switchFields
}

export const useSwapState = () => {
  const { currencies } = useQueryCurrencies()

  const { settings } = useSwapSettings()
  const maxHops = settings.multihops ? 3 : 1

  const pairs = usePairs(currencies[0].wrapped, currencies[1].wrapped, maxHops)
  const trade = useRef<Trade<Currency, Currency, TradeType>>(null)

  const [error, setError] = useState()

  const { amounts, onChangeField } = useLinkedCurrencyAmounts({
    onDerive: useCallback(
      (enteredAmount: CurrencyAmount<Currency>, _currencies: typeof currencies) => {
        try {
          return derive(enteredAmount, _currencies, pairs.data, { maxHops })
        } catch (e) {
          console.log(e)
          setError(e)
          return undefined
        }
      },
      [maxHops, pairs.data],
    ),
  })

  const switchFields = useSwitchFields(onChangeField, amounts)

  return useMemo(
    () => ({
      trade: trade.current,
      error,
      inputAmount: amounts[0],
      outputAmount: amounts[1],
      onChangeInput: onChangeField(0),
      onChangeOutput: onChangeField(1),
      switchFields,
    }),
    [error, amounts, onChangeField, switchFields],
  )
}
