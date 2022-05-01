import { useLinkedFields } from 'components/AMM'
import { usePair } from 'components/AMM/hooks/usePair'
import { parseAmount } from 'components/AMM/utils/parseAmount'
import { Currency, CurrencyAmount, NATIVE, Pair } from 'gemswap-sdk'
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
) => {
  try {
    const quoteAmount = pair.priceOf(exactAmount.currency.wrapped).quote(exactAmount.wrapped)
    if (otherCurrency.isNative)
      return CurrencyAmount.fromRawAmount(otherCurrency, quoteAmount.numerator)
    return quoteAmount
  } catch {
    return parseAmount('0', otherCurrency)
  }
}

export const useAddLiquidityState = () => {
  const networkId = useCurrentSupportedNetworkId()

  const initialCurrencyFields = useMemo(() => makeCurrencyFields([], networkId), [networkId])

  // the input user typed in, the other input value is then derived from it
  const [exactAmount, setExactAmount] = useState<CurrencyAmount<Currency>>(
    parseAmount('0', initialCurrencyFields.first),
  )

  const { onChangeField, fieldCurrency, setFieldCurrency } = useLinkedFields(
    (field) => (newAmount) => setExactAmount(newAmount),
    initialCurrencyFields,
  )

  useEffect(() => {
    setFieldCurrency(initialCurrencyFields)
    setExactAmount(parseAmount('0', initialCurrencyFields.first))
  }, [initialCurrencyFields, setFieldCurrency])
  const firstFieldAmount = useRef<CurrencyAmount<Currency>>()
  const secondFieldAmount = useRef<CurrencyAmount<Currency>>()

  const isExactFirst = fieldCurrency.first && exactAmount?.currency.equals(fieldCurrency.first)
  const otherCurrency = fieldCurrency[isExactFirst ? 'second' : 'first']

  const pair = usePair(exactAmount?.currency.wrapped, otherCurrency?.wrapped)

  const derivedAmount = deriveAmount(pair.data, exactAmount, otherCurrency)
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
