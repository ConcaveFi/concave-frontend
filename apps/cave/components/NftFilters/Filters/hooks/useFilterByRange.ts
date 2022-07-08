import { StakingPosition } from '@concave/marketplace'
import { utils } from 'ethers'

export type RangeFilter = { min?: number; max?: number }
export const useFilterByRange = ({ min, max }: RangeFilter) => ({
  filterByRange: (nftPosition: StakingPosition) => {
    const allValuesEmpty = !min && !max
    const filterByOnlyOneValue = (!!min && !max) || (!min && !!max)

    if (allValuesEmpty) return true
    if (filterByOnlyOneValue) {
      if (min) return +utils.formatEther(nftPosition.initialValue) >= min
      if (max) return +utils.formatEther(nftPosition.initialValue) <= max
    }
    return (
      +utils.formatEther(nftPosition.initialValue) >= min &&
      +utils.formatEther(nftPosition.initialValue) <= max
    )
  },
})
