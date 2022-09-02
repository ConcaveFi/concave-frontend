import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { listPositons, StakingPosition, StakingV1Abi } from '@concave/marketplace'
import { BigNumber, ethers } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export type UseStakePositionsState = ReturnType<typeof useStakePositions>
export const useStakePositions = () => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()

  const { data: unlockedTokenIds, isLoading: loadingTokens } = useQuery(
    ['listUnlockedIds', chainId, address],
    async () => {
      const provider = new ethers.providers.EtherscanProvider(chainId)
      const history = await provider.getHistory(address)
      const iface = new ethers.utils.Interface(StakingV1Abi)
      const unlockedFuncHash = '0x7eee288d'
      return history
        .filter((data) => data.data.includes(unlockedFuncHash))
        .map((data) => {
          const transaction = iface.parseTransaction({ data: data.data, value: data.value })
          return +transaction.args.tokenId
        })
    },
  )

  const { data: stakingPositions, isLoading } = useQuery(
    ['listUserPositions', address, chainId, unlockedTokenIds],
    () => listPositons({ owner: address, provider: concaveProvider(chainId) }),
    { enabled: !!address && !!chainId },
  )
  const totalLocked = getTotalLocked(stakingPositions, CNV[chainId])
  const filteredPositions = stakingPositions?.filter(
    ({ tokenId }) => !unlockedTokenIds?.includes(+tokenId.toString()),
  )

  return {
    isLoading: isLoading,
    totalLocked,
    userNonFungibleTokensInfo: filteredPositions || [],
    netWorkId: chainId,
  }
}
function getTotalLocked(nonFungibleTokens: StakingPosition[], currency: Currency) {
  const totalLocked = (nonFungibleTokens || []).reduce((amount, current) => {
    return amount.add(current.currentValue)
  }, BigNumber.from(0))
  return CurrencyAmount.fromRawAmount(currency, totalLocked.toString())
}
