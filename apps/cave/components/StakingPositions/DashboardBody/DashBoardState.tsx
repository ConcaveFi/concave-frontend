import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { listPositions, StakingPosition, StakingV1Abi } from '@concave/marketplace'
import { BigNumber, ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQuery } from 'react-query'
import { useAccount, useProvider } from 'wagmi'

export const useStakePositions = () => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const provider = useProvider()

  const { data: stakingPositions, isLoading } = useQuery(
    ['listUserPositions', address, chainId],
    () => listPositions({ owner: address, excludeRedeemed: true, provider }),
    { enabled: !!address && !!chainId },
  )
  const totalLocked = getTotalLocked(stakingPositions, CNV[chainId])

  return {
    isLoading: isLoading,
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
