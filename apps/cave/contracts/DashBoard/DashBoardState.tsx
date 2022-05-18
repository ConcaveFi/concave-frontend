import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { fetchUserNonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/Fetcher'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useConnect } from 'wagmi'

export type UseDashBoardState = ReturnType<typeof useDashBoardState>
export const useDashBoardState = () => {
  const [{ data: wallet, loading }, connect] = useConnect()
  const [{ data: account, error: accountError }] = useAccount()
  const netWorkId = useCurrentSupportedNetworkId()
  const [totalLocked, setTotalLocked] = useState<BigNumber>()
  const [status, setStatus] = useState<'loading' | 'notConnected' | 'loaded'>('loading')

  const { data: userNonFungibleTokensInfo, isLoading: loadingPositions } = useQuery(
    ['fetchUserNonFungibleTokenInfo', account?.address, netWorkId],
    () => {
      return fetchUserNonFungibleTokenInfo(account.address, netWorkId)
    },
    { enabled: !!account?.address && !!netWorkId },
  )

  useEffect(() => {
    if (loadingPositions) {
      return setStatus('loading')
    }
    setTotalLocked(getTotalLocked(userNonFungibleTokensInfo))
    return setStatus('loaded')
  }, [loadingPositions, userNonFungibleTokensInfo])

  const isLoading = status === 'loading'
  const notConnected = status === 'notConnected'

  const statusData = {
    isLoading,
    notConnected,
  }

  return {
    status: statusData,
    totalLocked,
    userNonFungibleTokensInfo: userNonFungibleTokensInfo || [],
    account,
    netWorkId,
  }
}

function getTotalLocked(nonFungibleTokens: NonFungibleTokenInfo[]) {
  return (nonFungibleTokens || []).reduce((amount, current) => {
    return amount.add(current.shares)
  }, BigNumber.from(0))
}
