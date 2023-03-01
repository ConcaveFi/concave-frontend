import { StakingPosition } from '@concave/marketplace'

export const filterStakePool = (filters: number[]) => ({
  filterByStakePool: (current: StakingPosition) =>
    filters.some((value) => current.poolID === value),
})
