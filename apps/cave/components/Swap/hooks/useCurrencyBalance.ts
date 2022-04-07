import { useAuth } from 'contexts/AuthContext'
import { Currency } from 'gemswap-sdk'
import { useBalance } from 'wagmi'

export const useCurrencyBalance = (currency: Currency) => {
  const { user } = useAuth()
  return useBalance({
    addressOrName: user.address,
    token: currency?.isToken && currency?.address, // if it's not a token, it's native, n we don't need to pass the address
    formatUnits: currency?.decimals,
    skip: !currency || !user.address,
  })
}
