import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { useCallback, useState } from 'react'
import { toAmount } from 'utils/toAmount'

export const useLinkedCurrencyFields = (
  initialFields: { first?: Currency; second?: Currency } = {},
  onChangeAmount: (newAmount: CurrencyAmount<Currency>, field: keyof typeof initialFields) => void,
) => {
  const [currencies, setCurrencies] = useState(initialFields)

  const switchCurrencies = useCallback(() => {
    setCurrencies((v) => ({ first: v.second, second: v.first }))
  }, [])

  const onChangeField = useCallback(
    (field: keyof typeof initialFields) => (newAmount: CurrencyAmount<Currency>) => {
      if (currencies[field]?.equals(newAmount.currency)) return onChangeAmount(newAmount, field)

      const otherField = field === 'first' ? 'second' : 'first'

      // switch currencies not amounts (1 ETH : 200 DAI -> 1 DAI : 200 ETH)
      if (currencies[otherField]?.equals(newAmount.currency)) {
        setCurrencies({ first: currencies.second, second: currencies.first })
        onChangeAmount(toAmount(newAmount.toExact(), currencies[otherField]), field)
        return
      }

      // change the currency of this field
      setCurrencies({ ...currencies, [field]: newAmount.currency })
      onChangeAmount(newAmount, field)
    },
    [currencies, onChangeAmount],
  )

  return {
    currencies,
    setCurrencies,
    onChangeField,
    switchCurrencies,
  }
}
