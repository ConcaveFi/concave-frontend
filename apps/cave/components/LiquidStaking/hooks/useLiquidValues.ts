import { StakingV1Contract } from '@concave/marketplace'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'

export const useLiquidValues = (chainId: number, poolId: number) => {
  const { data, isLoading } = useQuery(['LiquidValues', chainId, poolId], async () => {
    const stakingV1Contract = new StakingV1Contract(concaveProvider(chainId))
    const stakingV1Pools = await stakingV1Contract.pools(poolId)
    const stakingV1Cap = await stakingV1Contract.viewStakingCap(poolId)
    return {
      stakingV1Pools,
      stakingV1Cap,
    }
  })
  return { data, isLoading }
}
