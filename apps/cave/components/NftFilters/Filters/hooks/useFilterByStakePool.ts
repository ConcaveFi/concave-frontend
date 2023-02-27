import { StakingPool, stakingPools, StakingPosition } from '@concave/marketplace'

export const useFilterByStakePool = (filters: StakingPool[]) => ({
  filterByStakePool: (current: StakingPosition) =>
    filters.some((value) => current.poolID === value.poolId),
})
