import { Currency, CurrencyAmount } from '@concave/core'
import { useAccount, useBalance } from 'wagmi'
import { toAmount } from '../utils/toAmount'
import { useMemo } from 'react'

export const useCurrencyBalance = (
  currency: Currency,
  { watch = false } = {},
): Omit<ReturnType<typeof useBalance>, 'data'> & { data: CurrencyAmount<Currency> } => {
  const { address } = useAccount()
  return useCurrencyBalanceOfAddress(currency, address, { watch })
}

export const useCurrencyBalanceOfAddress = (
  currency: Currency,
  address: string,
  { watch = false } = {},
): Omit<ReturnType<typeof useBalance>, 'data'> & { data: CurrencyAmount<Currency> } => {
  const enabled = !!currency && !!address
  const balance = useBalance({
    addressOrName: address,
    chainId: currency?.chainId,
    formatUnits: currency?.decimals,
    token: currency?.isToken && currency?.wrapped.address,
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

export type UseCurrencyBalanceData = ReturnType<typeof useCurrencyBalance>
