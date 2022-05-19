import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toAmount } from 'utils/toAmount'

export type LinkedCurrencyFields = {
  first: Currency
  second: Currency
}

const makeFields = (arr) => ({ first: arr[0], second: arr[1] })

export const useLinkedCurrencyFields = (
  initialCurrencies: Currency[],
  onChangeAmount: (newAmount: CurrencyAmount<Currency>, field: keyof LinkedCurrencyFields) => void,
  onChangeCurrencies: (newCurrencies: LinkedCurrencyFields) => void,
) => {
  const [currencies, setCurrencies] = useState<LinkedCurrencyFields>(makeFields(initialCurrencies))
  const lastUpdated = useRef<keyof typeof currencies>('first')

  /*
    when initialCurrencies change, set currencies 
    and call onChangeAmount with a 0 amount of the new first currency
  */
  useEffect(() => {
    const updatedFields = makeFields(initialCurrencies)
    setCurrencies(updatedFields)
    if (initialCurrencies[0]) {
      onChangeAmount(toAmount(0, initialCurrencies[0]), 'first')
      lastUpdated.current = 'first'
    }
  }, [initialCurrencies, onChangeAmount])

  const switchCurrencies = useCallback(() => {
    setCurrencies((v) => ({ first: v.second, second: v.first }))
    lastUpdated.current = lastUpdated.current === 'first' ? 'second' : 'first'
  }, [])

  const onChangeField = useCallback(
    (field: keyof LinkedCurrencyFields) => (newAmount: CurrencyAmount<Currency>) => {
      lastUpdated.current = field
      if (currencies[field]?.equals(newAmount.currency)) return onChangeAmount(newAmount, field)

      const otherField = field === 'first' ? 'second' : 'first'

      // switch currencies not amounts (1 ETH : 200 DAI -> 1 DAI : 200 ETH)
      if (currencies[otherField]?.equals(newAmount.currency)) {
        const newFields = { first: currencies.second, second: currencies.first }
        setCurrencies(newFields)
        onChangeCurrencies(newFields)
        onChangeAmount(toAmount(newAmount.toExact(), newFields[field]), field)
        return
      }

      // change the currency of this field
      const newFields = { ...currencies, [field]: newAmount.currency }
      setCurrencies(newFields)
      onChangeCurrencies(newFields)
      onChangeAmount(newAmount, field)
    },
    [currencies, onChangeAmount, onChangeCurrencies],
  )

  return {
    lastUpdated: lastUpdated.current,
    currencies,
    setCurrencies,
    onChangeField,
    switchCurrencies,
  }
}
