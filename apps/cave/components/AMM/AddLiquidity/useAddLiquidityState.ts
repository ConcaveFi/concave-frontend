import { useLinkedFields } from 'components/CurrencyAmountField'
import { usePair } from 'components/AMM/hooks/usePair'
import { toAmount } from 'utils/toAmount'
import { Currency, CurrencyAmount, NATIVE, Pair } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useEffect, useMemo, useRef, useState } from 'react'

const makeCurrencyFields = (initialTokens = [], networkId) => {
  return {
    first: initialTokens[0]?.chainId === networkId ? initialTokens[0] : NATIVE[networkId],
    second: initialTokens[1]?.chainId === networkId && initialTokens[1],
  }
}

const deriveAmount = (
  pair: Pair,
  exactAmount: CurrencyAmount<Currency>,
  otherCurrency: Currency,
  defaultValue: CurrencyAmount<Currency>,
) => {
  if (!pair) {
    return defaultValue
  }
  const price = pair.priceOf(exactAmount.currency.wrapped)
  const quoteAmount = price.quote(exactAmount.wrapped)
  if (otherCurrency.isNative)
    return CurrencyAmount.fromRawAmount(otherCurrency, quoteAmount.quotient)
  return quoteAmount
}

export const useAddLiquidityState = ({
  currency0,
  currency1,
}: {
  currency0: Currency
  currency1: Currency
}) => {
  const networkId = useCurrentSupportedNetworkId()

  const initialCurrencyFields = useMemo(
    () => makeCurrencyFields([currency0, currency1], networkId),
    [currency0, currency1, networkId],
  )

  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState<CurrencyAmount<Currency>>(
    toAmount('0', initialCurrencyFields.first),
  )

  const { onChangeField, fieldCurrency, setFieldCurrency } = useLinkedFields(
    (field) => (newAmount) => setExactAmount(newAmount),
    initialCurrencyFields,
  )

  useEffect(() => {
    setFieldCurrency(initialCurrencyFields)
    setExactAmount(toAmount('0', initialCurrencyFields.first))
    if (currency1) {
      secondFieldAmount.current = toAmount('0', currency1)
    }
  }, [currency1, initialCurrencyFields, setFieldCurrency])
  const firstFieldAmount = useRef<CurrencyAmount<Currency>>()
  const secondFieldAmount = useRef<CurrencyAmount<Currency>>()

  const isExactFirst = fieldCurrency.first && exactAmount?.currency.equals(fieldCurrency.first)
  const otherCurrency = fieldCurrency[isExactFirst ? 'second' : 'first']

  const pair = usePair(exactAmount?.currency.wrapped, otherCurrency?.wrapped)
  const otherAmount = isExactFirst ? firstFieldAmount.current : secondFieldAmount.current
  const derivedAmount = deriveAmount(pair.data, exactAmount, otherCurrency, otherAmount)
  const inputs = isExactFirst ? [exactAmount, derivedAmount] : [derivedAmount, exactAmount]
  firstFieldAmount.current = pair.data || isExactFirst ? inputs[0] : firstFieldAmount.current
  secondFieldAmount.current = pair.data || !isExactFirst ? inputs[1] : secondFieldAmount.current

  return {
    firstFieldAmount: firstFieldAmount.current,
    secondFieldAmount: secondFieldAmount.current,
    pair: pair,
    onChangeFirstField: onChangeField('first'),
    onChangeSecondField: onChangeField('second'),
  }
}
