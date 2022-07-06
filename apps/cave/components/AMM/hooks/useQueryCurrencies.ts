import { isAddress } from 'ethers/lib/utils'
import { ChainId, Currency, NATIVE } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import Router, { useRouter } from 'next/router'
import { useNetwork } from 'wagmi'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getQueryValue } from 'utils/getQueryValue'

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
  return NATIVE[chainId]
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

const queryCurrenciesQueryKey = 'query currencies'

// https://react-query.tanstack.com/guides/ssr#caveat-for-nextjs-rewrites
export const useQueryCurrencies = (defaultCurrencies?: {
  [chain in ChainId]?: [Currency, Currency]
}) => {
  const { query } = useRouter()
  const { activeChain } = useNetwork()

  const chainId = (getQueryValue(query, 'chainId') || activeChain?.id) as ChainId

  const queryClient = useQueryClient()

  const { data: currencies } = useQuery<[Currency, Currency]>(
    queryCurrenciesQueryKey,
    async () => {
      const currency0 = getQueryValue(query, 'currency0')
      const currency1 = getQueryValue(query, 'currency1')
      return [
        await fetchTokenOrNativeData(currency0, chainId),
        await fetchTokenOrNativeData(currency1, chainId),
      ]
    },
    {
      enabled: Boolean(query.currency0 || query.currency1),
      initialData: defaultCurrencies?.[chainId] || defaultCurrencies?.[ChainId.ETHEREUM],
      // placeholderData: defaultCurrencies?.[chainId] || defaultCurrencies?.[ChainId.ETHEREUM],
      // cacheTime: 0,
      staleTime: 0,
    },
  )

  const queryHasCurrency = query.currency0 || query.currency1
  // run on network change
  useEffect(() => {
    if (!queryHasCurrency && activeChain?.id) updateQuery({ chainId: activeChain.id })
    /* if the query has currencies, wait for a user action to change it
        (so that he won't loose his input by mistake) */
  }, [activeChain?.id, queryHasCurrency])

  return useMemo(
    () => ({
      currencies,
      onChangeCurrencies: (currencies: [Currency, Currency]) => {
        updateQuery({ currency0: currencies[0], currency1: currencies[1] })
        queryClient.setQueryData(queryCurrenciesQueryKey, currencies)
      },
    }),
    [currencies, queryClient],
  )
}
