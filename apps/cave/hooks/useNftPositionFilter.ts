import { utils } from 'ethers'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'

export enum NftPositionDaysFilterType {
  NONE = 'none',
  FILTER_BY_45 = '45',
  FILTER_BY_90 = '90',
  FILTER_BY_180 = '180',
  FILTER_BY_360 = '360',
}
export interface NftPositionFilters {
  price?: { min: number; max: number }
  gained?: { min: number; max: number }
  initial?: { min: number; max: number }
  filterByDay: NftPositionDaysFilterType
}

export default function useNftPositionFilter(filters: NftPositionFilters) {
  const filterDay = filters.filterByDay
  const { gained, initial } = filters

  const filterByDay = (value) => {
    if (filterDay === 'none') return true
    else return value.stakePool === +filterDay
  }

  const filterByGained = (token: NonFungibleTokenInfo) => {
    const gainedValue = +utils.formatEther(token.gained)
    return gained ? gainedValue >= gained.min && gainedValue <= gained.max : true
  }

  const filterByInitial = (token: NonFungibleTokenInfo) => {
    const initialValue = +utils.formatEther(token.initialValue)
    return initial ? initialValue >= initial.min && initialValue <= initial.max : true
  }
  return {
    filterByDay,
    filterByGained,
    filterByInitial,
  }
}
