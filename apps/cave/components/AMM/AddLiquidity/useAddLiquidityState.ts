import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { usePair } from 'components/AMM/hooks/usePair'
import { Currency, CurrencyAmount, Pair } from '@concave/gemswap-sdk'
import { useEffect, useState } from 'react'

const deriveAmount = (
  pair: Pair,
  exactAmount: CurrencyAmount<Currency>,
  otherAmount: CurrencyAmount<Currency>,
) => {
  if (!pair) {
    return otherAmount
  }
  const price = pair.priceOf(exactAmount.currency.wrapped)
  const quoteAmount = price.quote(exactAmount.wrapped)
  if (otherAmount.currency.isNative)
    return CurrencyAmount.fromRawAmount(otherAmount.currency, quoteAmount.quotient)
  return quoteAmount
}

type CurrencyAmountFields = {
  first?: CurrencyAmount<Currency>
  second?: CurrencyAmount<Currency>
}

export const useAddLiquidityState = (props: CurrencyAmountFields) => {
  const [amounts, setFields] = useState<CurrencyAmountFields>(props)
  const { first, second } = amounts
  const pair = usePair(first?.currency.wrapped, second?.currency.wrapped)

  const { onChangeField, lastUpdated } = useLinkedCurrencyFields({}, (amount, field) => {
    return setFields((old) => ({ ...old, [field]: amount }))
  })

  useEffect(() => {
    if (!lastUpdated || !pair.data) {
      return // No changes or pair
    }
    const otherField = lastUpdated === 'first' ? 'second' : 'first'
    const anothterAmount = deriveAmount(pair.data, amounts[lastUpdated], amounts[otherField])
    if (anothterAmount?.toExact() === amounts[otherField]?.toExact()) {
      return //no need update state
    }
    setFields((old) => ({ ...old, [otherField]: anothterAmount }))
  }, [pair.data, lastUpdated, amounts])

  return {
    firstFieldAmount: first,
    secondFieldAmount: second,
    pair: pair,
    onChangeFirstField: onChangeField('first'),
    onChangeSecondField: onChangeField('second'),
  }
}
