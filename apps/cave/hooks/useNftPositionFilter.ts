import { utils } from 'ethers'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'

export enum NftPositionDaysFilterType {
  NONE = 'none',
  FILTER_BY_45 = '3',
  FILTER_BY_90 = '2',
  FILTER_BY_180 = '1',
  FILTER_BY_360 = '0',
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

  const filterByDay = (token: NonFungibleTokenInfo) => {
    return filterDay !== 'none' ? token.poolID === +filterDay : true
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
