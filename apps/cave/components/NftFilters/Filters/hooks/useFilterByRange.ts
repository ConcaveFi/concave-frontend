import { NonFungibleTokenInfo } from '@concave/marketplace'
import { utils } from 'ethers'

export type RangeFilter = { min?: number; max?: number }
export const useFilterByRange = ({ min, max }: RangeFilter) => ({
  filterByRange: (nftPosition: NonFungibleTokenInfo) =>
    !!min || !!max
      ? +utils.formatEther(nftPosition.initialValue) >= min &&
        +utils.formatEther(nftPosition.initialValue) <= max
      : () => true,
})
