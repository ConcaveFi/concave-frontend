import { Currency, CurrencyAmount } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { usePair } from 'components/AMM/hooks/usePair'
import { useLinkedCurrencyAmounts } from 'components/CurrencyAmountField'
import { useCallback } from 'react'
import { toAmount } from 'utils/toAmount'
import { useQueryCurrencies } from '../hooks/useQueryCurrencies'

const deriveAmount = (
  pair: Pair,
  exactAmount: CurrencyAmount<Currency>,
  otherCurrency: Currency,
) => {
  if (
    !pair ||
    !otherCurrency ||
    !pair.involvesToken(exactAmount.currency.wrapped) ||
    !pair.involvesToken(otherCurrency.wrapped)
  )
    return
  const price = pair.priceOf(exactAmount.currency.wrapped)
  const quoteAmount = price.quote(exactAmount.wrapped)
  if (otherCurrency.isNative) return toAmount(quoteAmount.toExact(), otherCurrency)
  return quoteAmount
}

export const useAddLiquidityState = () => {
  const { currencies, onChangeCurrencies } = useQueryCurrencies()

  const pair = usePair(currencies[0]?.wrapped, currencies[1]?.wrapped)

  const { amounts, onChangeField } = useLinkedCurrencyAmounts({
    onDerive: useCallback(
      (enteredAmount, _currencies) => {
        const otherCurrency = enteredAmount.currency.equals(_currencies[0])
          ? _currencies[1]
          : _currencies[0]
        return deriveAmount(pair.data, enteredAmount, otherCurrency)
      },
      [pair.data],
    ),
  })

  return {
    firstFieldAmount: amounts[0],
    secondFieldAmount: amounts[1],
    pair: pair,
    onChangeFirstField: onChangeField(0),
    onChangeSecondField: onChangeField(1),
    onReset: () => onChangeCurrencies([undefined, undefined]),
  }
}
