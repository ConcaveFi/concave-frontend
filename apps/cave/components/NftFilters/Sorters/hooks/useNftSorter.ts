import { NonFungibleTokenInfo } from '@concave/marketplace'
import { utils } from 'ethers'

export enum NftSorterType {
  STAKE_POOL = 'poolID',
  REDEEM_DATE = 'maturity',
  INITIAL = 'initialValue',
}

export type NftOrder = 'ASC' | 'DESC'
export type NftSorter = { sorter: NftSorterType; order: NftOrder }

export const useNFtSorter = (sorter: NftSorter) => ({
  sorter: sorter
    ? (current, before) => {
        const currentFormatted = +utils.formatEther(current[sorter.sorter])
        const beforeFormatted = +utils.formatEther(before[sorter.sorter])
        if (currentFormatted === beforeFormatted) return 0
        return sortByOrder(currentFormatted, beforeFormatted)[sorter.order] || -1
      }
    : () => 0,
})
const sortByOrder = (first, second) => ({
  DESC: first < second && 1,
  ASC: first > second && 1,
})
