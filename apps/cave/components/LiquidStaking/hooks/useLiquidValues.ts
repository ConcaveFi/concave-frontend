import { StakingV1Contract } from '@concave/marketplace'
import { BigNumber } from 'ethers'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'

export const useLiquidValues = (chainId: number, poolId: number) => {
  const { data, isLoading } = useQuery(['LiquidValues', chainId, poolId], async () => {
    const stakingV1Contract = new StakingV1Contract(concaveProvider(chainId))
    const contractReads = await Promise.all([
      stakingV1Contract.pools(poolId),
      stakingV1Contract.viewStakingCap(poolId).catch(() => {
        return BigNumber.from(poolId)
      }),
    ])

    const stakingV1Pools = contractReads[0]
    const stakingV1Cap = contractReads[1]
    return {
      stakingV1Pools,
      stakingV1Cap,
    }
  })
  return { data, isLoading }
}
