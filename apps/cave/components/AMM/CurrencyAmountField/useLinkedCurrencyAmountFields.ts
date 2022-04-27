import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useCallback, useState } from 'react'

export const useLinkedCurrencyAmountFields = (
  initialFields: { first: Currency; second: Currency },
  onChangeFieldAmountValue: (
    field: keyof typeof initialFields,
  ) => (amount: CurrencyAmount<Currency>) => void,
) => {
  const [fieldCurrency, setFieldCurrency] = useState(initialFields)

  const switchCurrencies = useCallback(() => {
    setFieldCurrency({ first: fieldCurrency.second, second: fieldCurrency.first })
  }, [fieldCurrency])

  const onChangeFieldAmount = useCallback(
    (field: keyof typeof fieldCurrency) => (newAmount: CurrencyAmount<Currency>) => {
      if (newAmount.currency.equals(fieldCurrency[field]))
        return onChangeFieldAmountValue(field)(newAmount)

      const newCurrency = newAmount.currency
      const otherField = field === 'first' ? 'second' : 'first'

      if (newCurrency.equals(fieldCurrency[otherField]))
        return setFieldCurrency({ first: fieldCurrency.second, second: fieldCurrency.first })

      setFieldCurrency({ ...fieldCurrency, [field]: newCurrency })
      onChangeFieldAmountValue(field)(newAmount)
    },
    [fieldCurrency, onChangeFieldAmountValue],
  )

  return {
    onChangeFieldAmount,
    switchCurrencies,
    setFieldCurrency,
    fieldCurrency,
  }
}
