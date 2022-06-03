import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'

export enum NftPositionSortType {
  NONE = 'none',
  REDEEM_LOWEST_FIRST = 'maturity.lowest',
  REDEEM_HIGHEST_FIRST = 'maturity.highest',
  STAKE_LOWEST_FIRST = 'stakePeriod.lowest',
  STAKE_HIGHEST_FIRST = 'stakePeriod.highest',
  DISCOUNT_LOWEST_FIRST = 'discount.lowest',
  DISCOUNT_HIGHEST_FIRST = 'discount.highest',
  PRICE_LOWEST_FIRST = 'price.lowest',
  PRICE_HIGHEST_FIRST = 'price.highest',
  TOKEN_ID_LOWEST_FIRST = 'tokenId.lowest',
  TOKEN_ID_HIGHEST_FIRST = 'tokenId.highest',
  GAINED_LOWEST_FIRST = 'gained.lowest',
  GAINED_HIGHEST_FIRST = 'gained.highest',
  POOLID_LOWEST_FIRST = 'poolID.highest',
  POOLID_HIGHEST_FIRST = 'poolID.lowest',
  INITIAL_LOWEST_FIRST = 'initialValue.lowest',
  INITIAL_HIGHEST_FIRST = 'initialValue.highest',
  CURRENT_VALUE_LOWEST_FIRST = 'currentValue.lowest',
  CURRENT_VALUE_HIGHEST_FIRST = 'currentValue.highest',
}
// The logic is inverted for pool id, because it's return 0, 1, 2 ,3 instead of 45, 90, 180 ...
// 0 = 360, 1 =180, 2 = 90, 3 =45

export default function useNftPositionSort(sortType: NftPositionSortType) {
  const type = sortType !== NftPositionSortType.NONE ? sortType.split('.')[0] : 'none'
  const order = sortType !== NftPositionSortType.NONE ? sortType.split('.')[1] : 'none'

  const sorterFunction = (current: NonFungibleTokenInfo, before: NonFungibleTokenInfo) => {
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
