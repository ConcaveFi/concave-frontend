import { isAddress } from 'ethers/lib/utils'
import { ChainId, Currency, Fetcher, NATIVE, Token } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import Router, { useRouter } from 'next/router'
import { useNetwork } from 'wagmi'
import { LinkedCurrencyFields } from 'components/CurrencyAmountField/useLinkedCurrencyFields'
import { useCallback, useEffect, useMemo } from 'react'

const getAddressOrSymbol = (currency: Currency) => {
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

export const currencyFromJson = (c: Currency | undefined): Currency => {
  if (!c) return
  if (c.isNative) return NATIVE[c.chainId]
  return new Token(c.chainId, c.wrapped.address, c.decimals, c.symbol, c.name)
}

const fetchTokenOrNativeData = (addressOrSymbol: string, chainId: ChainId) => {
  if (!addressOrSymbol) return
  if (isAddress(addressOrSymbol))
    return Fetcher.fetchTokenData(addressOrSymbol, concaveProvider(+chainId))
  return NATIVE[chainId]
}

export const fetchQueryCurrencies = async (query) => {
  const { currency0, currency1, chainId } = query
  if (!chainId) return []
  const currencies = [...new Set<string>([currency0, currency1])]
  return Promise.all(currencies.map((c) => fetchTokenOrNativeData(c, chainId))).catch(() => [])
}

type UpdateCurrenciesQuery = {
  chainId?: ChainId
  currency0?: Currency
  currency1?: Currency
}

const updateQuery = ({ currency0, currency1, chainId }: UpdateCurrenciesQuery, { shallow }) => {
  const query = { chainId: chainId || currency0?.chainId || currency1?.chainId } as any
  if (currency0) query.currency0 = getAddressOrSymbol(currency0)
  if (currency1) query.currency1 = getAddressOrSymbol(currency1)
  Router.replace({ query }, undefined, { shallow })
}

const getQueryValue = (query, key) => (Array.isArray(query[key]) ? query[key][0] : query[key])

export const useQueryCurrencies = () => {
  const [{ data: network }] = useNetwork()
  const { query } = useRouter()

  const currentChainId = network.chain?.id
  const queryChainId = getQueryValue(query, 'chainId')

  const isNetworkMismatch = +queryChainId && currentChainId && +queryChainId !== currentChainId
  const queryHasCurrency = !!query.currency0 || !!query.currency1

  // run on network change
  useEffect(() => {
    if (!queryHasCurrency && currentChainId)
      updateQuery({ chainId: currentChainId }, { shallow: false })
    /* if the query has currencies, wait for a user action to change it
      (so that he won't loose his input by mistake) */
  }, [currentChainId, queryHasCurrency])

  const onChangeCurrencies = useCallback(
    ({ first, second }: LinkedCurrencyFields) => {
      if (first && second && first.chainId !== second.chainId) {
        updateQuery(
          { chainId: currentChainId, currency0: first, currency1: second },
          { shallow: false },
        )
      }
      updateQuery({ currency0: first, currency1: second }, { shallow: true })
    },
    [currentChainId],
  )

  return {
    onChangeCurrencies,
    isNetworkMismatch,
    queryHasCurrency,
    currentChainId,
    queryChainId,
  }
}
