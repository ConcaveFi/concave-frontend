import { Currency, CurrencyAmount } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { usePair } from 'components/AMM/hooks/usePair'
import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { LinkedCurrencyFields } from 'components/CurrencyAmountField/useLinkedCurrencyFields'
import { useCallback, useEffect, useState } from 'react'
import { toAmount } from 'utils/toAmount'

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

type CurrencyAmountFields = {
  first?: CurrencyAmount<Currency>
  second?: CurrencyAmount<Currency>
}

export const useAddLiquidityState = (
  initialCurrencies: Currency[],
  onChangeCurrencies: (currencies: LinkedCurrencyFields) => void,
) => {
  const [amounts, setAmounts] = useState<CurrencyAmountFields>({
    first: toAmount(0, initialCurrencies[0]),
    second: toAmount(0, initialCurrencies[1]),
  })

  const pair = usePair(amounts.first?.currency.wrapped, amounts.second?.currency.wrapped)

  // last updated field amount
  const [exactAmount, setExactAmount] = useState(amounts.first)

  const { onChangeField, lastUpdated, currencies } = useLinkedCurrencyFields(
    initialCurrencies,
    useCallback((newAmount) => setExactAmount(newAmount), []),
    onChangeCurrencies,
  )

  useEffect(() => {
    const otherField = lastUpdated === 'first' ? 'second' : 'first'
    setAmounts((amounts) => ({
      [lastUpdated]: exactAmount,
      [otherField]:
        deriveAmount(pair.data, exactAmount, currencies[otherField]) ||
        toAmount(amounts[otherField]?.toExact() || 0, currencies[otherField]),
    }))
  }, [exactAmount, pair.data, lastUpdated, currencies])

  return {
    firstFieldAmount: amounts.first,
    secondFieldAmount: amounts.second,
    pair: pair,
    onChangeFirstField: onChangeField('first'),
    onChangeSecondField: onChangeField('second'),
    setExactAmountInLiquidityState: setExactAmount,
  }
}
