import { utils } from 'ethers'

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
  sorter: Object.entries(sorters)
    .map(mapToSorterFunction)
    .reduce(reduceAllFunctionsInOne, () => 0),
})

const mapToSorterFunction =
  ([type, order]: [NftSorter, NftSortOrder]) =>
  (current, before) => {
    const currentFormatted = +utils.formatEther(current[type])
    const beforeFormatted = +utils.formatEther(before[type])
    if (currentFormatted === beforeFormatted) return 0
    return sortOrder(currentFormatted, beforeFormatted)[order] || -1
  }
const reduceAllFunctionsInOne = (currentSorter, sorterBefore) => (firstValue, secondValue) =>
  currentSorter(firstValue, secondValue) || sorterBefore(firstValue, secondValue)

const sortOrder = (first, second) => ({
  highest: first < second && 1,
  lowest: first > second && 1,
})
