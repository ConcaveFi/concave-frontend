import { Currency, CurrencyAmount } from '@concave/core'
import { useCallback, useMemo, useRef } from 'react'
import { updateArray } from 'utils/updateArray'

export const useLinkedCurrencyFields = ({
  currencies,
  onChangeCurrencies,
  onChangeAmount,
}: {
  currencies: [Currency, Currency]
  onChangeCurrencies: (newCurrencies: [Currency, Currency]) => void
  onChangeAmount: (newAmount: CurrencyAmount<Currency>, field: 0 | 1) => void
}) => {
  const lastUpdated = useRef<0 | 1>(0)

  const onChangeField = useCallback(
    (field: 0 | 1) => (newAmount: CurrencyAmount<Currency>) => {
      lastUpdated.current = field
      if (currencies[field]?.equals(newAmount.currency)) return onChangeAmount(newAmount, field)

      const otherField = field === 0 ? 1 : 0

      // switch currencies not amounts (1 ETH : 200 DAI -> 1 DAI : 200 ETH)
      if (currencies[otherField]?.equals(newAmount.currency)) {
        const newFields: [Currency, Currency] = [currencies[1], currencies[0]]
        onChangeCurrencies(newFields)
        onChangeAmount(newAmount, field)
        return
      }

      // change the currency of this field
      const newFields: [Currency, Currency] = updateArray({
        ...currencies,
        [field]: newAmount.currency,
      })
      onChangeCurrencies(newFields)
      onChangeAmount(newAmount, field)
    },
    [currencies, onChangeAmount, onChangeCurrencies],
  )

  return useMemo(
    () => ({
      lastUpdated: lastUpdated.current,
      onChangeField,
    }),
    [onChangeField],
  )
}
