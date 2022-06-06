import { utils } from 'ethers'

export enum NftRangeFilter {
  GAINED = 'gained',
  INITIAL = 'initialValue',
}
export type NftRangeFilters = { [key: string]: { min?: number; max?: number } }

export const useNftPositionFilter = (filters: NftRangeFilters) => ({
  filterByRange: Object.entries(filters)
    .map(mapToFilterFunction)
    .reduce(reduceToOneFunction, () => true),
})

const mapToFilterFunction =
  ([type, { min, max }]: [NftRangeFilter, { min: number; max: number }]) =>
  (current) => {
    const currentFormatted = +utils.formatEther(current[type])
    return currentFormatted >= min && currentFormatted <= max
  }

const reduceToOneFunction = (currentFilter, filterBefore) => currentFilter && filterBefore
