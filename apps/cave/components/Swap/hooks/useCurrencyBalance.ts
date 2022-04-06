import { Currency } from 'c-sdk'
import { useBalance } from 'wagmi'

export const useCurrencyBalance = (currency: Currency, userAddress: string) =>
  useBalance({
    addressOrName: userAddress,
    token: currency?.isToken && currency?.address, // if it's not a token, it's native, n we don't need to pass the address
    formatUnits: currency?.decimals,
    skip: !currency || !userAddress,
  })
