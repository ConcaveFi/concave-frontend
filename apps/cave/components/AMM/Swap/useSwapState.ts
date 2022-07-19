import { Currency, CurrencyAmount } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { useLinkedCurrencyAmounts } from 'components/CurrencyAmountField'
import { swapDefaultCurrencies } from 'pages/gemswap'
import { useCallback, useMemo, useRef, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { usePairs } from '../hooks/usePair'
import { useQueryCurrencies } from '../hooks/useQueryCurrencies'
import { getBestTrade } from '../hooks/useTrade'
import { useSwapSettings } from '../Swap/Settings'

/*
  lets say you filled the swap card with 100 dai in and it derived 3 cnv out
  click switch and the trade becomes 2.98 cnv in for 100 dai out (because of price impact etc)
  now you click switch again, you'd expect it to become 100 dai in for 3 cnv out
  
  for this reason we can't just grab the first field amount and throw it in the second and let it derive again, 
  in the example above the initial 100dai -> 3cnv would switch to 2.98cnv -> 100dai and then to 97.435dai -> 2.98cnv ...

  the solution implemented below in the first click sends the first field amount to the second 
  and in the second click it sends the second field amount back to the first
*/
const useSwitchFields = (
  onChangeField: (field: 0 | 1) => (newAmount: CurrencyAmount<Currency>) => void,
  amounts: readonly [CurrencyAmount<Currency>, CurrencyAmount<Currency>],
) => {
  const switchToField = useRef<0 | 1>(1)

  const switchFields = useCallback(() => {
    const otherField = switchToField.current ? 0 : 1
    onChangeField(switchToField.current)(amounts[otherField])
    switchToField.current = otherField
  }, [amounts, onChangeField])

  return switchFields
}

export const useSwapState = () => {
  const { currencies, onChangeCurrencies } = useQueryCurrencies()

  const { settings } = useSwapSettings()
  const maxHops = settings.multihops ? 3 : 1

  const pairs = usePairs(currencies[0]?.wrapped, currencies[1]?.wrapped, maxHops)
  const trade = useRef<Trade<Currency, Currency, TradeType>>(null)

  const [error, setError] = useState()

  const { amounts, onChangeField } = useLinkedCurrencyAmounts({
    onDerive: useCallback(
      (enteredAmount: CurrencyAmount<Currency>, _currencies: typeof currencies) => {
        try {
          trade.current = null

          const [otherCurrency, tradeType] = enteredAmount.currency.equals(currencies[0])
            ? [currencies[1], TradeType.EXACT_INPUT]
            : [currencies[0], TradeType.EXACT_OUTPUT]

          if (enteredAmount.equalTo(0)) return toAmount(0, otherCurrency)

          const bestTrade = getBestTrade(pairs.data, tradeType, enteredAmount, otherCurrency, {
            maxHops,
          })
          trade.current = bestTrade

          return tradeType === TradeType.EXACT_INPUT
            ? bestTrade.outputAmount
            : bestTrade.inputAmount
        } catch (e) {
          setError(e)
          return undefined
        }
      },
      [currencies, maxHops, pairs.data],
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
      onReset: (chainId) => onChangeCurrencies(swapDefaultCurrencies[chainId]),
    }),
    [error, amounts, onChangeField, switchFields, onChangeCurrencies],
  )
}
