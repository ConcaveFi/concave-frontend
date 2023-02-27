import { Fetcher } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAddressTokenList } from 'hooks/useTokenList'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useProvider } from 'wagmi'

export const usePositionsState = (initialView?: 'user' | 'all' ) => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const provider = useProvider()
  const allPairs = useQuery(['fetchPairs', chainId], () => {
    return Fetcher.fetchPairs(chainId, provider)
  })
  const { data: tokens, isLoading: userPoolsLoading } = useAddressTokenList(address)
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
    allPairs,
    pairs: view === 'user' ? userPairs : allPairs.data,
    view,
    setView,
  }
}
export type PositionsState = ReturnType<typeof usePositionsState>
