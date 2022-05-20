import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useIsMounted } from 'hooks/useIsMounted'
import { listUserNonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/Fetcher'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export type UseDashBoardState = ReturnType<typeof useDashBoardState>

export const useDashBoardState = () => {
  const { data: account, error: accountError } = useAccount()
  const netWorkId = useCurrentSupportedNetworkId()
  const { data: userNonFungibleTokensInfo, isLoading } = useQuery(
    ['listUserNonFungibleTokenInfo', account?.address, netWorkId],
    () => listUserNonFungibleTokenInfo(account.address, netWorkId),
    { enabled: !!account?.address && !!netWorkId },
  )
  const totalLocked = getTotalLocked(userNonFungibleTokensInfo)

  const isMounted = useIsMounted()

  return {
    isLoading: !isMounted || isLoading,
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
