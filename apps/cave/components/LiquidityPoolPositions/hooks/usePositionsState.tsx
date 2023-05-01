import { Fetcher } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAddressTokenList } from 'hooks/useTokenList'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useProvider } from 'wagmi'

export const usePositionsState = (initialView?: 'user' | 'all') => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const provider = useProvider()
  const allPairs = useQuery(['fetchPairs', chainId], async () =>
    Fetcher.fetchPairs(chainId, provider),
  )
  const userTokens = useAddressTokenList(address)
  const { data: tokens, isLoading: userPoolsLoading } = userTokens
  const userPairs = (allPairs?.data || []).filter((p) =>
    tokens?.find((t) => p.liquidityToken.address === t.address),
  )
  const [view, setView] = useState<'user' | 'all'>(initialView || userPairs.length ? 'user' : 'all')

  const loading = (() => {
    if (userPoolsLoading) {
      return `Loading user pools`
    }
    if (allPairs.isLoading) {
      return `Loading pools`
    }
  })()

  return {
    loading,
    user: address,
    error: allPairs.error,
    isLoading: allPairs.isLoading || userTokens.isLoading,
    isFetching: allPairs.isFetching || userTokens.isFetching,
    refetch: () => {
      allPairs.refetch()
      userTokens.refetch()
    },
    allPairs,
    pairs: view === 'user' ? userPairs : allPairs.data,
    view,
    setView,
  }
}
export type PositionsState = ReturnType<typeof usePositionsState>
