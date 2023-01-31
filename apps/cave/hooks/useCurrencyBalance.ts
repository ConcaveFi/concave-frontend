import { Currency, CurrencyAmount } from '@concave/core'
import { useMemo } from 'react'
import { toAmount } from 'utils/toAmount'
import { Address, useAccount, useBalance } from 'wagmi'

export type UseCurrencyBalanceData = Omit<ReturnType<typeof useBalance>, 'data'> & {
  data: CurrencyAmount<Currency>
}

export const useCurrencyBalance = (
  currency: Currency,
  { watch = false } = {},
): UseCurrencyBalanceData => {
  const { address } = useAccount()
  return useCurrencyBalanceOfAddress(currency, address, { watch })
}

export const useCurrencyBalanceOfAddress = (
  currency: Currency,
  address: Address,
  { watch = false } = {},
): UseCurrencyBalanceData => {
  const enabled = !!currency && !!address
  const balance = useBalance({
    address: address,
    chainId: currency?.chainId,
    formatUnits: currency?.decimals,
    ...(currency?.isToken && { token: currency.wrapped.address }),
    watch,
    enabled,
    staleTime: 500,
  })

  return useMemo(
    () => ({
      ...balance,
      data: toAmount(balance.data?.formatted, currency),
    }),
    [balance, currency],
  )
}
