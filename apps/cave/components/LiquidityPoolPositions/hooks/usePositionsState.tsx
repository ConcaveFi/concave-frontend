import { Fetcher } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAddressTokenList } from 'hooks/useTokenList'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'

export const usePositionsState = (props: { initialView?: 'user' | 'all' }) => {
  // const { address } = useAccount()
  const address = '0xdd11ae83b49ee68b37ff3e6442f994fc037bb4a1'
  const chainId = useCurrentSupportedNetworkId()
  const allPairs = useQuery(['fetchPairs', chainId], () => {
    return Fetcher.fetchPairs(chainId, concaveProvider(chainId))
  })
  const { data: tokens, isLoading: userPoolsLoading } = useAddressTokenList(address)
  const userPairs = (allPairs?.data || []).filter((p) =>
    tokens?.find((t) => p.liquidityToken.address === t.address),
  )
  const [view, setView] = useState<'user' | 'all'>(
    props?.initialView || userPairs.length ? 'user' : 'all',
  )

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
