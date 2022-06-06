import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'

export enum NftSorter {
  REDEEM = 'maturity',
  DISCOUNT = 'discount',
  PRICE = 'price',
  TOKEN_ID = 'tokenId',
  GAINED = 'gained',
  INITIAL = 'initialValue',
  CURRENT_VALUE = 'currentValue',
  STAKE = 'poolID',
}
export type NftSortOrder = 'highest' | 'lowest' | 'none'

export type NftSorters = { [key: string]: NftSortOrder }
export const useNftPositionSort = (sorters: NftSorters) => ({
  sorter: () => 1,
})
