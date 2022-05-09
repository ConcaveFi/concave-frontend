import { isAddress } from 'ethers/lib/utils'
import { ChainId, Currency, Fetcher, NATIVE, Token } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useNetwork } from 'wagmi'
import { useQueryState } from 'next-usequerystate'

const getAddressOrSymbol = (currency: Currency) => {
  if (!currency) return undefined
  return currency.isNative ? currency.symbol : currency.wrapped.address
}

/*
  keeps track of two tokens using the url query params
  token0=<address or symbol if native>
  token1=<address or symbol if native>
  chainId=<like 1 for mainnet 3 for ropsten...>
*/
export const useQueryCurrencies = (currency0: Currency, currency1: Currency) => {
  const router = useRouter()
  // const [currencies, setCurrencies] = useQueryState('currencies', {  })
  // const [chainId, setChainId] = useQueryState('chainId', {  })
  const [{ data: network }] = useNetwork()
  useEffect(() => {
    router.replace(
      {
        query: {
          ...(currency0 && { token0: getAddressOrSymbol(currency0) }),
          ...(currency1 && { token1: getAddressOrSymbol(currency1) }),
          chainId: network.chain?.id || 1,
        },
      },
      undefined,
      { shallow: true },
    )
  }, [currency0, currency1, network.chain?.id, router])
}

type JsonCurrency = {
  isNative: boolean
  chainId: ChainId
  name: string
  symbol: string
  decimals: number
  wrapped: {
    address: string
  }
}

const currencyToJson = (currency: Currency): JsonCurrency => {
  if (!currency) return null
  return {
    isNative: currency.isNative,
    chainId: currency.chainId,
    name: currency.name,
    symbol: currency.symbol,
    decimals: currency.decimals,
    wrapped: { address: currency.wrapped.address },
  }
}

export const currencyFromJson = (jsonCurrency: JsonCurrency) => {
  if (!jsonCurrency) return undefined
  if (jsonCurrency.isNative) return NATIVE[jsonCurrency.chainId]
  return new Token(
    jsonCurrency.chainId,
    jsonCurrency.wrapped.address,
    jsonCurrency.decimals,
    jsonCurrency.symbol,
    jsonCurrency.name,
  )
}

const fetchTokenOrNativeData = (addressOrSymbol: string, chainId: ChainId) => {
  if (!addressOrSymbol) return
  if (isAddress(addressOrSymbol))
    return Fetcher.fetchTokenData(addressOrSymbol, concaveProvider(chainId))
  return NATIVE[chainId]
}

export const fetchCurrenciesFromQuery = async (query) => {
  const { token0, token1, chainId = 1 } = query

  const [_token0, _token1] = await Promise.all([
    fetchTokenOrNativeData(token0, chainId),
    fetchTokenOrNativeData(token1, chainId),
  ])

  return [currencyToJson(_token0), currencyToJson(_token1)]
}
