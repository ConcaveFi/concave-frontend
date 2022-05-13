import { isAddress } from 'ethers/lib/utils'
import { ChainId, Currency, Fetcher, NATIVE, Token } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'

export const getAddressOrSymbol = (currency: Currency) => {
  if (!currency) return undefined
  return currency.isNative ? currency.symbol : currency.wrapped.address
}

export const currencyToJson = (c: Currency | undefined) => {
  if (!c) return null
  return {
    chainId: c.chainId,
    wrapped: {
      address: c.wrapped.address,
    },
    decimals: c.decimals,
    symbol: c.symbol,
    name: c.symbol,
    isNative: c.isNative,
  }
}

export const currencyFromJson = (c: Currency | undefined) => {
  if (!c) return
  if (c.isNative) return NATIVE[c.chainId]
  return new Token(c.chainId, c.wrapped.address, c.decimals, c.symbol, c.name)
}

const fetchTokenOrNativeData = (addressOrSymbol: string, chainId: ChainId) => {
  if (!addressOrSymbol) return
  if (isAddress(addressOrSymbol))
    return Fetcher.fetchTokenData(addressOrSymbol, concaveProvider(chainId))
  return NATIVE[chainId]
}

export const fetchCurrenciesFromQuery = async (query) => {
  const { currency0, currency1, chainId = 1 } = query
  const _chainId: ChainId = [ChainId.ETHEREUM, ChainId.ROPSTEN].includes(+chainId) ? chainId : 1

  const [_currency0, _currency1] = await Promise.all([
    fetchTokenOrNativeData(currency0, _chainId),
    fetchTokenOrNativeData(currency1, _chainId),
  ])

  return [_currency0, _currency1]
}
