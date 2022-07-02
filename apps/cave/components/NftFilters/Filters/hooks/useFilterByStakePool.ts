import { StakingPosition } from '@concave/marketplace'

export enum StakePoolFilterEnum {
  FILTER_BY_45_DAYS = 3,
  FILTER_BY_90_DAYS = 2,
  FILTER_BY_180_DAYS = 1,
  FILTER_BY_360_DAYS = 0,
}

export const useFilterByStakePool = (filters: StakePoolFilterEnum[]) => ({
  filterByStakePool: (current: StakingPosition) =>
    filters.some((value) => current.poolID === value),
})
