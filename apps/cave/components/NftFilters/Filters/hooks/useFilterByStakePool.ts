import { StakingPosition } from '@concave/marketplace'

export enum StakePoolFilterEnum {
  '45_DAYS' = 3,
  '90_DAYS' = 2,
  '180_DAYS' = 1,
  '360_DAYS' = 0,
}

export const useFilterByStakePool = (filters: StakePoolFilterEnum[]) => ({
  filterByStakePool: (current: StakingPosition) =>
    filters.some((value) => current.poolID === value),
})
