import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { listPositions, StakingPosition } from '@concave/marketplace'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { request } from 'http'
import { useQuery } from 'react-query'
import { useAccount, useProvider } from 'wagmi'

export const useStakePositions = () => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const provider = useProvider()
  const {
    data: stakingPositions,
    isLoading,
    refetch,
  } = useQuery(
    ['listUserPositions', address, chainId],
    () => listPositions({ owner: address, excludeRedeemed: true, provider }),
    { enabled: !!address && !!chainId },
  )
  const totalLocked = getTotalLocked(stakingPositions, CNV[chainId])

  const indexPositions = useQuery(
    [`indexPositions`, address],
    async () => {
      const syncRequest = await fetch(`https://cnv-txevent.vercel.app/api/stakingv1`)
      await syncRequest.json()
      refetch()
    },
    {
      enabled: false,
    },
  )

  return {
    reIndex: () => {
      indexPositions.refetch()
    },
    isLoading: isLoading || indexPositions.isLoading,
    totalLocked,
    userNonFungibleTokensInfo: stakingPositions || [],
    netWorkId: chainId,
  }
}
function getTotalLocked(nonFungibleTokens: StakingPosition[], currency: Currency) {
  const totalLocked = (nonFungibleTokens || []).reduce(
    (amount, current) => amount.add(current.currentValue),
    BigNumber.from(0),
  )
  return CurrencyAmount.fromRawAmount(currency, totalLocked.toString())
}
