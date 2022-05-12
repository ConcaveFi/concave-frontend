import { useLinkedCurrencyFields } from 'components/CurrencyAmountField'
import { usePair } from 'components/AMM/hooks/usePair'
import { Currency, CurrencyAmount, Pair } from '@concave/gemswap-sdk'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getAddressOrSymbol } from 'hooks/useSyncQueryCurrencies'

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
  const lastField = useRef<keyof typeof amounts>()
  const { first, second } = amounts
  const pair = usePair(first?.currency.wrapped, second?.currency.wrapped)
  const router = useRouter()
  const { onChangeField } = useLinkedCurrencyFields({}, (amount, field) => {
    const otherField = field === 'first' ? 'second' : 'first'
    lastField.current = field
    const otherAmount = amounts[otherField]
    router.replace(
      {
        query: {
          ...router.query,
          chainId: amount.currency.chainId,
          [field === 'first' ? 'currency0' : 'currency1']: getAddressOrSymbol(amount.currency),
        },
      },
      undefined,
      { shallow: false },
    )

    return setFields((old) => {
      if (amount.currency.wrapped.address === otherAmount?.currency.wrapped.address) {
        return { [field]: amount, [otherField]: old[field] }
      }
      return { ...old, [field]: amount }
    })
  })

  useEffect(() => {
    if (!lastField.current || !pair.data) {
      return // No changes or pair
    }
    const otherField = lastField.current === 'first' ? 'second' : 'first'
    const anothterAmount = deriveAmount(pair.data, amounts[lastField.current], amounts[otherField])
    if (anothterAmount?.toExact() === amounts[otherField]?.toExact()) {
      return //no need update state
    }
    setFields((old) => ({ ...old, [otherField]: anothterAmount }))
  }, [pair.data, lastField, amounts])

  return {
    firstFieldAmount: first,
    secondFieldAmount: second,
    pair: pair,
    onChangeFirstField: onChangeField('first'),
    onChangeSecondField: onChangeField('second'),
  }
}
