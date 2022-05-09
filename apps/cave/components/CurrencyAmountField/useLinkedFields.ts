import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { useCallback, useState } from 'react'

const isCurrencyEqual = (currency1: Currency, currency2: Currency) => {
  if (currency1.isNative && currency2.isNative) return currency1.chainId === currency2.chainId
  return currency1.isToken && currency1.equals(currency2)
}

export const useLinkedFields = (
  onChangeFieldAmount: (
    field: keyof typeof initialFields,
  ) => (amount: CurrencyAmount<Currency>) => void,
  initialFields: { first: Currency; second: Currency },
) => {
  const [fieldCurrency, setFieldCurrency] = useState(initialFields)

  const switchCurrencies = useCallback(() => {
    setFieldCurrency({ first: fieldCurrency.second, second: fieldCurrency.first })
  }, [fieldCurrency])

  const onChangeField = useCallback(
    (field: keyof typeof fieldCurrency) => (newAmount: CurrencyAmount<Currency>) => {
      if (isCurrencyEqual(fieldCurrency[field], newAmount.currency))
        return onChangeFieldAmount(field)(newAmount)

      const newCurrency = newAmount.currency
      const otherField = field === 'first' ? 'second' : 'first'

      if (isCurrencyEqual(fieldCurrency[otherField], newCurrency))
        return setFieldCurrency({ first: fieldCurrency.second, second: fieldCurrency.first })

      setFieldCurrency({ ...fieldCurrency, [field]: newCurrency })
      onChangeFieldAmount(field)(newAmount)
    },
    [fieldCurrency, onChangeFieldAmount],
  )

  return {
    onChangeField,
    switchCurrencies,
    setFieldCurrency,
    fieldCurrency,
  }
}
