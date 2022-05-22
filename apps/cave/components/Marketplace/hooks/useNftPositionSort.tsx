export enum NftPositionSortType {
  NONE = 'none',
  REDEEM_LOWEST_FIRST = 'redeemIn.lowest',
  REDEEM_HIGHEST_FIRST = 'redeemIn.highest',
  STAKE_LOWEST_FIRST = 'stakePeriod.lowest',
  STAKE_HIGHEST_FIRST = 'stakePeriod.highest',
  DISCOUNT_LOWEST_FIRST = 'discount.lowest',
  DISCOUNT_HIGHEST_FIRST = 'discount.highest',
  PRICE_LOWEST_FIRST = 'price.lowest',
  PRICE_HIGHEST_FIRST = 'price.highest',
}

export default function useNftPositionSort(sortType: NftPositionSortType) {
  const type = sortType !== NftPositionSortType.NONE ? sortType.split('.')[0] : 'none'
  const order = sortType !== NftPositionSortType.NONE ? sortType.split('.')[1] : 'none'

  const sorterFunction = (current, before) => {
    if (type === 'none') return 1
    else if (current[type] < before[type] && order === 'highest') return 1
    else if (current[type] > before[type] && order === 'lowest') return 1
    else return -1
  }
  return {
    type,
    sorterFunction,
  }
}
