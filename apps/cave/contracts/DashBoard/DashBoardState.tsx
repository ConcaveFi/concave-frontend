import { listUserNonFungibleTokenInfo, NonFungibleTokenInfo } from '@concave/marketplace'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { NEXT_PUBLIC_ALCHEMY_ID } from 'lib/env.conf'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export type UseDashBoardState = ReturnType<typeof useDashBoardState>
export const useDashBoardState = () => {
  const { data: account } = useAccount()
  const netWorkId = useCurrentSupportedNetworkId()
  const { data: userNonFungibleTokensInfo, isLoading } = useQuery(
    ['listUserNonFungibleTokenInfo', account?.address, netWorkId],
    () =>
      listUserNonFungibleTokenInfo(
        account.address,
        concaveProvider(netWorkId),
        NEXT_PUBLIC_ALCHEMY_ID,
      ),
    { enabled: !!account?.address && !!netWorkId },
  )
  const totalLocked = getTotalLocked(userNonFungibleTokensInfo)
  return {
    isLoading,
    totalLocked,
    userNonFungibleTokensInfo: userNonFungibleTokensInfo || [],
    account,
    netWorkId,
  }
}
function getTotalLocked(nonFungibleTokens: NonFungibleTokenInfo[]) {
  return (nonFungibleTokens || []).reduce((amount, current) => {
    const currentValue = current.userReward.totalRewards

    return amount.add(currentValue)
  }, BigNumber.from(0))
}
