import { Currency, CurrencyAmount } from '@concave/core'
import { useQueryCurrencies } from 'components/AMM/hooks/useQueryCurrencies'
import { useCallback, useState, useTransition } from 'react'
import { toAmount } from 'utils/toAmount'

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
  const [amounts, setAmounts] = useState(['0', '0'])

  const switchCurrencies = useCallback(() => {
    onChangeCurrencies([currencies[1], currencies[0]])
  }, [currencies, onChangeCurrencies])

  const [isPending, startTransition] = useTransition()

  const derive = useCallback(
    (field: 0 | 1, newAmount: CurrencyAmount<Currency>, _currencies?: typeof currencies) => {
      startTransition(() => {
        const otherField = field ? 0 : 1
        setAmounts((a) =>
          updateArr({
            ...a,
            [otherField]: onDerive(newAmount, _currencies)?.toExact() || a[otherField],
          }),
        )
      })
    },
    [onDerive],
  )

  const onChangeField = useCallback(
    (field: 0 | 1) => (newAmount: CurrencyAmount<Currency>) => {
      if (currencies[field]?.equals(newAmount.currency)) {
        setAmounts((a) => updateArr({ ...a, [field]: newAmount.toExact() }))
        derive(field, newAmount, currencies)
        return
      }

      // switch currencies not amounts (1 ETH : 200 DAI -> 1 DAI : 200 ETH)
      const otherCurrency = field ? currencies[0] : currencies[1]
      if (otherCurrency?.equals(newAmount.currency)) {
        onChangeCurrencies([currencies[1], currencies[0]])
        setAmounts((a) => [a[0], a[1]])

        // SWITCH DERIVE AMOUNTS

        derive(field, newAmount, [currencies[1], currencies[0]])
        return
      }

      const newCurrencies = updateArr<typeof currencies>({
        ...currencies,
        [field]: newAmount.currency,
      })
      onChangeCurrencies(newCurrencies)
      derive(field, newAmount, newCurrencies)
    },
    [currencies, derive, onChangeCurrencies],
  )

  return {
    currencies,
    amounts: [toAmount(amounts[0], currencies[0]), toAmount(amounts[1], currencies[1])],
    onChangeField,
    switchCurrencies,
  }
}
