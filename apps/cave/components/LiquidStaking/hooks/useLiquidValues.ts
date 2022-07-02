import { StakingV1Contract } from '@concave/marketplace'
import { utils } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'

export const useLiquidValues = (chainId: number, poolId: number) => {
  const { data, isLoading } = useQuery(['LiquidValues', chainId, poolId], async () => {
    const stakingV1Contract = new StakingV1Contract(concaveProvider(+chainId))
    const stakingV1Pools = await stakingV1Contract.pools(String(poolId))
    const stakingV1Cap = await stakingV1Contract.viewStakingCap(String(poolId))
    const stakingPoolFormatted = utils.formatEther(stakingV1Pools?.balance || '0')
    const stakingCapFormatted = utils.formatEther(stakingV1Cap || '0')
    return {
      stakingV1Pools,
      stakingV1Cap,
      stakingPoolFormatted,
      stakingCapFormatted,
    }
  })
  console.log(data?.stakingPoolFormatted)
  return { data, isLoading }
}
