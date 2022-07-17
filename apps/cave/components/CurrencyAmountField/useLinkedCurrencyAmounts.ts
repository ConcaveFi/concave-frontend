import { Currency, CurrencyAmount, ZERO } from '@concave/core'
import { useQueryCurrencies } from 'components/AMM/hooks/useQueryCurrencies'
import { useCallback, useMemo, useState, useTransition } from 'react'

// util to update array value on index, by passing an ArrayLike obj
const updateArr = <T extends Array<T[number]>>(indexedObj: Omit<ArrayLike<T[number]>, 'length'>) =>
  Array.from({ ...indexedObj, length: Object.values(indexedObj).length }) as T

export const useLinkedCurrencyAmounts = ({
  onDerive,
}: {
  onDerive: (
    enteredAmount: CurrencyAmount<Currency>,
    currencies: [Currency, Currency],
  ) => CurrencyAmount<Currency>
}) => {
  const { currencies, onChangeCurrencies } = useQueryCurrencies()
  const [amounts, setAmounts] = useState([ZERO, ZERO])

  const [isPending, startTransition] = useTransition()

  const derive = useCallback(
    (newAmount: CurrencyAmount<Currency>, _currencies?: typeof currencies) => {
      startTransition(() => {
        const otherField = newAmount.currency.equals(_currencies[0]) ? 1 : 0
        setAmounts((a) =>
          updateArr({
            ...a,
            [otherField]: onDerive(newAmount, _currencies)?.quotient || a[otherField],
          }),
        )
      })
    },
    [onDerive],
  )

  const currencyAmounts = useMemo(
    () =>
      [
        currencies[0] && CurrencyAmount.fromRawAmount(currencies[0], amounts[0]),
        currencies[1] && CurrencyAmount.fromRawAmount(currencies[1], amounts[1]),
      ] as const,
    [currencies, amounts],
  )
  const onChangeField = useCallback(
    (field: 0 | 1) => (newAmount: CurrencyAmount<Currency>) => {
      if (currencies[field]?.equals(newAmount?.currency)) {
        setAmounts((a) => updateArr({ ...a, [field]: newAmount.quotient }))
        derive(newAmount, currencies)
        return
      }

      // switch currencies not amounts (1 ETH : 200 DAI -> 1 DAI : 200 ETH)
      const otherCurrency = field ? currencies[0] : currencies[1]
      if (otherCurrency?.equals(newAmount?.currency)) {
        onChangeCurrencies([currencies[1], currencies[0]])
        setAmounts((a) => updateArr({ ...a, [field]: newAmount.quotient }))
        derive(newAmount, [currencies[1], currencies[0]])
        return
      }

      const newCurrencies = updateArr<typeof currencies>({
        ...currencies,
        [field]: newAmount?.currency,
      })
      onChangeCurrencies(newCurrencies)
      derive(newAmount, newCurrencies)
    },
    [currencies, derive, onChangeCurrencies],
  )

  return {
    currencies,
    amounts: currencyAmounts,
    onChangeField,
  }
}
