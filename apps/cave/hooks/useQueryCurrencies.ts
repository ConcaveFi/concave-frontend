import { isAddress } from 'ethers/lib/utils'
import { ChainId, Currency, Fetcher, NATIVE, Token } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import { queryTypes, useQueryStates } from 'next-usequerystate'

const getAddressOrSymbol = (currency: Currency) => {
  if (!currency) return undefined
  return currency.isNative ? currency.symbol : currency.wrapped.address
}

const currencyToJson = ({ chainId, wrapped, decimals, symbol, name, isNative }: Currency) =>
  chainId && {
    chainId,
    wrapped: {
      address: wrapped.address,
    },
    decimals,
    symbol,
    name,
    isNative,
  }

const currencyFromJson = ({ chainId, wrapped, decimals, symbol, name, isNative }: Currency) => {
  if (isNative) return NATIVE[chainId]
  return new Token(chainId, wrapped.address, decimals, symbol, name)
}

const fetchTokenOrNativeData = (addressOrSymbol: string, chainId: ChainId) => {
  if (!addressOrSymbol) return
  if (isAddress(addressOrSymbol))
    return Fetcher.fetchTokenData(addressOrSymbol, concaveProvider(chainId))
  return NATIVE[chainId]
}

export const fetchCurrenciesFromQuery = async (query) => {
  const { token0, token1, chainId = 1 } = query
  const _chainId: ChainId = [ChainId.ETHEREUM, ChainId.ROPSTEN].includes(chainId) ? chainId : 1

  const [_token0, _token1] = await Promise.all([
    fetchTokenOrNativeData(token0, _chainId),
    fetchTokenOrNativeData(token1, _chainId),
  ])

  return [_token0, _token1].map(currencyToJson)
}

/*
  keeps track of two tokens using the url query params
  currency0=<address or symbol if native>
  currency1=<address or symbol if native>
  chainId=<1 for mainnet 3 for ropsten...>
*/
export const useQueryCurrencies = (initialCurrencies: [Currency, Currency]) => {
  const [query, setQuery] = useQueryStates({
    chainId: queryTypes.integer.withDefault(1),
    currencies: {
      parse: () => null,
      serialize: (currencies) => {
        console.log(currencies)
        return currencies.map(getAddressOrSymbol)
      },
      defaultValue: initialCurrencies.map(currencyFromJson),
    },
  })

  const onChangeCurrencies = (currencies: [Currency, Currency]) => {
    console.log(currencies)
    const chainId = [ChainId.ETHEREUM, ChainId.ROPSTEN].includes(currencies[0].chainId)
      ? currencies[0].chainId
      : ChainId.ETHEREUM
    setQuery({ chainId, currencies }, { shallow: true })
  }

  return { currencies: query.currencies, onChangeCurrencies }
}
