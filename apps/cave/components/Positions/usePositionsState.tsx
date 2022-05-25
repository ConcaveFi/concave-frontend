import { Fetcher } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAddressTokenList } from 'hooks/useTokenList'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export const usePositionsState = () => {
  const [view, setView] = useState<'user' | 'all'>('user')
  const [{ data: account, loading: loadingAccount }] = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const allPairs = useQuery(['fetchPairs', chainId], () => {
    return Fetcher.fetchPairs(chainId, concaveProvider(chainId))
  })
  const { data: tokens, isLoading: userPoolsLoading } = useAddressTokenList(account?.address)
  const userPairs = (allPairs?.data || []).filter((p) =>
    tokens?.find((t) => p.liquidityToken.address === t.address),
  )

  const loading = (() => {
    if (loadingAccount) {
      return `Loading Account`
    }
    if (userPoolsLoading) {
      return `Loading user pools`
    }
    if (allPairs.isLoading) {
      return `Loading pools`
    }
  })()

  return {
    loading,
    error: allPairs.error,
    allPairs,
    pairs: view === 'user' ? userPairs : allPairs.data,
    account,
    view,
    setView,
  }
}
export type PositionsState = ReturnType<typeof usePositionsState>
