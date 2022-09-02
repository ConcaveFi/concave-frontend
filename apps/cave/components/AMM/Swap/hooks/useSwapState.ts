import { Currency, CurrencyAmount, ROUTER_ADDRESS, ZERO } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { usePermit } from 'hooks/usePermit'
import { useCallback, useMemo, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useQueryCurrencies } from '../../hooks/useQueryCurrencies'
import { useTrade } from '../../hooks/useTrade'
import { useSwapSettings } from '../Settings'

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

  const settings = useSwapSettings((s) => ({ multihops: s.settings.multihops }))
  const maxHops = settings.multihops ? 3 : 1

  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState(ZERO)

  const { onChangeField, lastUpdated } = useLinkedCurrencyFields({
    currencies,
    onChangeCurrencies,
    onChangeAmount: (enteredAmount) => setExactAmount(enteredAmount.quotient),
  })

  const tradeType = lastUpdated === 0 ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT
  const otherCurrency = currencies[lastUpdated === 0 ? 1 : 0]
  const exactCurrencyAmount = useMemo(
    () =>
      currencies[lastUpdated] && CurrencyAmount.fromRawAmount(currencies[lastUpdated], exactAmount),
    [currencies, exactAmount, lastUpdated],
  )

  const trade = useTrade(exactCurrencyAmount, otherCurrency, { tradeType, maxHops })
  const permit = usePermit(
    trade?.data?.inputAmount?.wrapped,
    ROUTER_ADDRESS[trade.data?.inputAmount.currency.chainId],
  )

  const _trade = useMemo(
    () =>
      trade.isSuccess
        ? trade.data
        : makeTradePlaceholder(exactCurrencyAmount, otherCurrency, tradeType),
    [exactCurrencyAmount, otherCurrency, trade.data, trade.isSuccess, tradeType],
  )

  // useEvent (?)
  const switchFields = useCallback(() => {
    const otherField = lastUpdated === 0 ? 1 : 0
    onChangeField(otherField)(otherField === 0 ? _trade.outputAmount : _trade.inputAmount)
  }, [_trade, lastUpdated, onChangeField])

  return useMemo(
    () => ({
      permit,
      error: trade.error as string,
      trade: _trade,
      onChangeInput: onChangeField(0),
      onChangeOutput: onChangeField(1),
      switchFields,
      onReset: () => onChangeField(0)(toAmount(0, currencies[0])),
    }),
    [trade.error, permit, _trade, onChangeField, switchFields, currencies],
  )
}
