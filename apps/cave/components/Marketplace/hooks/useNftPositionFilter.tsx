import { propNames } from '@concave/ui'

export enum NftPositionDaysFilterType {
  NONE = 'none',
  FILTER_BY_45 = '45',
  FILTER_BY_90 = '90',
  FILTER_BY_180 = '180',
  FILTER_BY_360 = '360',
}
export type MarketPlaceFilterType = {
  filterByPrice: boolean
  from: number
  to: number
  filterByDay: NftPositionDaysFilterType
}

export default function useNftPositionFilter(filter: MarketPlaceFilterType) {
  const filterDay = filter.filterByDay
  const { from, to } = filter

  const filterByDay = (value) => {
    if (filterDay === 'none') return true
    else return value.stakePool === +filterDay
  }

  const filterByPrice = (value) => {
    if (!filter.filterByPrice || (!from && !to)) return true
    else return value.price >= from && value.price <= to
  }

  return {
    filterByDay,
    filterByPrice,
  }
}
