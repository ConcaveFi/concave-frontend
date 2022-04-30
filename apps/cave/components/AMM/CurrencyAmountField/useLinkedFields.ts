import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useCallback, useState } from 'react'

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
      if (fieldCurrency[field]?.equals(newAmount.currency))
        return onChangeFieldAmount(field)(newAmount)

      const newCurrency = newAmount.currency
      const otherField = field === 'first' ? 'second' : 'first'

      if (fieldCurrency[otherField]?.equals(newCurrency))
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
