import { StakingV1Contract } from '@concave/marketplace'
import { Provider } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { useQuery } from 'react-query'
import { useProvider } from 'wagmi'

export const useLiquidValues = (chainId: number, poolId: number) => {
  const provider = useProvider()
  return useQuery(['LiquidValues', chainId, poolId], async () => liquidityValues(poolId, provider))
}

export const liquidityValues = async (poolId: number, provider: Provider) => {
  const stakingV1Contract = new StakingV1Contract(provider)

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
}
