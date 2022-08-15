import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { listPositons, StakingPosition } from '@concave/marketplace'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export type UseStakePositionsState = ReturnType<typeof useStakePositions>
export const useStakePositions = () => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const { data: stakingPositions, isLoading } = useQuery(
    ['listUserPositions', address, chainId],
    () => listPositons({ owner: address, provider: concaveProvider(chainId) }),
    { enabled: !!address && !!chainId },
  )
  const totalLocked = getTotalLocked(stakingPositions, CNV[chainId])
  return {
    isLoading,
    totalLocked,
    userNonFungibleTokensInfo: stakingPositions || [],
    netWorkId: chainId,
  }
}
function getTotalLocked(nonFungibleTokens: StakingPosition[], currency: Currency) {
  const totalLocked = (nonFungibleTokens || []).reduce((amount, current) => {
    return amount.add(current.currentValue)
  }, BigNumber.from(0))
  return CurrencyAmount.fromRawAmount(currency, totalLocked.toString())
}
