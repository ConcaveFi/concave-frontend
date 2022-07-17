import { ChainId, Currency, NATIVE } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { isAddress } from 'ethers/lib/utils'
import { concaveProvider } from 'lib/providers'
import Router, { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getQueryValue } from 'utils/getQueryValue'
import { useNetwork } from 'wagmi'

const getAddressOrSymbol = (currency: Currency) => {
  if (!currency) return undefined
  return currency.isNative ? currency.symbol : currency.wrapped.address
}

const fetchTokenOrNativeData = (
  addressOrSymbol: string,
  chainId: ChainId,
): Promise<Currency> | Currency => {
  if (!addressOrSymbol) return
  if (isAddress(addressOrSymbol))
    return Fetcher.fetchTokenData(addressOrSymbol, concaveProvider(+chainId))
  if (NATIVE[chainId].symbol === addressOrSymbol) return NATIVE[chainId]
  return undefined
}

type UpdateCurrenciesQuery = {
  chainId?: ChainId
  currency0?: Currency
  currency1?: Currency
}

const updateQuery = ({ currency0, currency1, chainId }: UpdateCurrenciesQuery) => {
  const query = { chainId: chainId || currency0?.chainId || currency1?.chainId } as any
  if (currency0) query.currency0 = getAddressOrSymbol(currency0)
  if (currency1) query.currency1 = getAddressOrSymbol(currency1)
  Router.replace({ query }, undefined, { shallow: true })
}

const getQueryCurrenciesKey = () => `${Router.pathname} query currencies`

type CurrencyChainMap = { [chain in ChainId]?: [Currency, Currency] }
const defaultCurrencies: Record<string, CurrencyChainMap> = {}
export const setRouteDefaultCurrencies = (pathname: `/${string}`, currencies: CurrencyChainMap) =>
  (defaultCurrencies[pathname] = currencies)

// https://react-query.tanstack.com/guides/ssr#caveat-for-nextjs-rewrites
export const useQueryCurrencies = () => {
  const { query, pathname } = useRouter()
  const { chain } = useNetwork()

  const chainId = (getQueryValue(query, 'chainId') || chain?.id || ChainId.ETHEREUM) as ChainId

  const queryClient = useQueryClient()

  const queryHasCurrency = query.currency0 || query.currency1

  const { data: currencies, isFetching } = useQuery<[Currency, Currency]>(
    getQueryCurrenciesKey(),
    async () => {
      const currency0 = getQueryValue(query, 'currency0')
      const currency1 = getQueryValue(query, 'currency1')
      // we're letting the token fetcher do the caching
      return [
        await fetchTokenOrNativeData(currency0, chainId),
        await fetchTokenOrNativeData(currency1, chainId),
      ]
    },
    {
      enabled: !!queryHasCurrency,
      initialData: defaultCurrencies[pathname]?.[chainId] ||
        defaultCurrencies[pathname]?.[ChainId.ETHEREUM] || [undefined, undefined],
      staleTime: 0,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  )

  const onChangeCurrencies = useCallback(
    (currencies: [Currency, Currency]) => {
      updateQuery({ currency0: currencies[0], currency1: currencies[1] })
      queryClient.setQueryData(getQueryCurrenciesKey(), currencies)
    },
    [queryClient],
  )

  // run on network change
  useEffect(() => {
    if (!queryHasCurrency && chain?.id) updateQuery({ chainId: chain.id })
    /* if the query has currencies, wait for a user action to change it
        (so that he won't loose his input by mistake) */
  }, [chain?.id, queryHasCurrency])

  return useMemo(
    () => ({ currencies, onChangeCurrencies, isLoading: isFetching }),
    [currencies, onChangeCurrencies, isFetching],
  )
}
