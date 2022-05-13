import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { getAddressOrSymbol } from 'hooks/useSyncQueryCurrencies'
import Router from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { toAmount } from 'utils/toAmount'

const updateQuery = ({
  first: currency0,
  second: currency1,
}: {
  first?: Currency
  second?: Currency
}) => {
  const query = { chainId: currency0.chainId || currency1.chainId } as any
  if (currency0) query.currency0 = getAddressOrSymbol(currency0)
  if (currency1) query.currency1 = getAddressOrSymbol(currency1)
  Router.replace({ query }, undefined, { shallow: true })
}

export const useLinkedCurrencyFields = (
  initialFields: { first?: Currency; second?: Currency } = {},
  onChangeAmount: (newAmount: CurrencyAmount<Currency>, field: keyof typeof initialFields) => void,
) => {
  const [currencies, setCurrencies] = useState(initialFields)
  const lastUpdated = useRef<keyof typeof initialFields>('first')

  const switchCurrencies = useCallback(() => {
    setCurrencies((v) => ({ first: v.second, second: v.first }))
    lastUpdated.current = 'second'
  }, [])

  const onChangeField = useCallback(
    (field: keyof typeof initialFields) => (newAmount: CurrencyAmount<Currency>) => {
      lastUpdated.current = field
      if (currencies[field]?.equals(newAmount.currency)) return onChangeAmount(newAmount, field)

      const otherField = field === 'first' ? 'second' : 'first'

      // switch currencies not amounts (1 ETH : 200 DAI -> 1 DAI : 200 ETH)
      if (currencies[otherField]?.equals(newAmount.currency)) {
        setCurrencies({ first: currencies.second, second: currencies.first })
        updateQuery({ first: currencies.second, second: currencies.first })
        lastUpdated.current = otherField
        onChangeAmount(toAmount(newAmount.toExact(), currencies[otherField]), field)
        return
      }

      // change the currency of this field
      setCurrencies({ ...currencies, [field]: newAmount.currency })
      updateQuery({ ...currencies, [field]: newAmount.currency })
      onChangeAmount(newAmount, field)
    },
    [currencies, onChangeAmount],
  )

  return {
    lastUpdated: lastUpdated.current,
    currencies,
    setCurrencies,
    onChangeField,
    switchCurrencies,
  }
}
