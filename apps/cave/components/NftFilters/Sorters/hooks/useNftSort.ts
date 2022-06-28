import { StakingPosition } from '@concave/marketplace'
import { utils } from 'ethers'

export enum NftSortMethod {
  STAKE_POOL = 'poolID',
  REDEEM_DATE = 'maturity',
  INITIAL = 'initialValue',
  NONE = 'None',
}

export type NftOrder = 'ASC' | 'DESC'
export type NftSort = { sort: NftSortMethod; order: NftOrder }

export const useNftSort = (sorter: NftSort) => {
  if (sorter.sort === NftSortMethod.NONE) return () => 0
  return (current, before) => {
    const currentFormatted = +utils.formatEther(current[sorter.sort])
    const beforeFormatted = +utils.formatEther(before[sorter.sort])
    if (currentFormatted === beforeFormatted) return 0
    return sortByOrder(currentFormatted, beforeFormatted)[sorter.order] || -1
  }
}
const sortByOrder = (first, second) => ({
  DESC: first < second && 1,
  ASC: first > second && 1,
})
