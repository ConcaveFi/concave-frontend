import { Currency, CurrencyAmount, JSBI, ZERO } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { usePair } from 'components/AMM/hooks/usePair'
import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { useCallback, useState } from 'react'
import { updateArray } from 'utils/updateArray'

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
  return quoteAmount.quotient
}

const newAmount = (currency: Currency, amount: JSBI = ZERO) =>
  currency && CurrencyAmount.fromRawAmount(currency, amount)

export const useAddLiquidityState = (
  currencies: [Currency, Currency],
  onChangeCurrencies?: (currencies: [Currency, Currency]) => void,
) => {
  const [amounts, setAmounts] = useState([ZERO, ZERO])

  const pair = usePair(currencies[0]?.wrapped, currencies[1]?.wrapped, {
    onSuccess(pair) {
      const otherField = lastUpdated === 0 ? 1 : 0
      const derivedAmount = deriveAmount(
        pair,
        newAmount(currencies[lastUpdated], amounts[lastUpdated]),
        currencies[otherField],
      )
      setAmounts((amounts) =>
        updateArray({
          [lastUpdated]: amounts[lastUpdated],
          [otherField]: derivedAmount || amounts[otherField],
        }),
      )
    },
  })

  const { onChangeField, lastUpdated } = useLinkedCurrencyFields({
    currencies,
    onChangeCurrencies,
    onChangeAmount: (enteredAmount) => {
      const otherField = lastUpdated === 0 ? 1 : 0
      setAmounts((amounts) =>
        updateArray({
          [lastUpdated]: enteredAmount.quotient,
          [otherField]:
            deriveAmount(pair.data, enteredAmount, currencies[otherField]) || amounts[otherField],
        }),
      )
    },
  })

  return {
    firstFieldAmount: newAmount(currencies[0], amounts[0]),
    secondFieldAmount: newAmount(currencies[1], amounts[1]),
    pair: pair,
    onChangeFirstField: onChangeField(0),
    onChangeSecondField: onChangeField(1),
    onReset: useCallback(() => {
      onChangeCurrencies([undefined, undefined])
      setAmounts([ZERO, ZERO])
    }, [onChangeCurrencies]),
  }
}
