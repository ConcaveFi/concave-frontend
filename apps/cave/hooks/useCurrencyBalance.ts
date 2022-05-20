import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { useAccount, useBalance } from 'wagmi'
import { toAmount } from 'utils/toAmount'
import { useMemo } from 'react'

export const useCurrencyBalance = (
  currency: Currency,
  { watch = false } = {},
): Omit<ReturnType<typeof useBalance>, 'data'> & { data: CurrencyAmount<Currency> } => {
  const { data: account } = useAccount()

  const enabled = !!currency && !!account?.address

  const balance = useBalance({
    addressOrName: account?.address,
    // chainId: currency?.chainId,
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
