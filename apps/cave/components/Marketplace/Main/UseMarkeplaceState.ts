import { listListedPositions } from '@concave/marketplace'
import {
  StakePoolFilterEnum,
  useFilterByStakePool,
} from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { NftSort, NftSortMethod } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export const useMarketplaceDashbord = () => {
  const chainId = useCurrentSupportedNetworkId()
  const { data, isLoading, isFetching } = useQuery(
    ['sales', chainId],
    async () => {
      const provider = concaveProvider(chainId)
      return listListedPositions({ provider })
    },
    { enabled: !!chainId, refetchOnWindowFocus: false },
  )
  const salePositions = data || []
  const { address: currentUserAddress } = useAccount()
  const [sort, setSort] = useState<NftSort>({ sort: 'REDEEM_DATE', order: 'ASC' })
  const sortFunction = sort ? NftSortMethod[sort.sort][sort.order] : () => 0
  const [stakeFilters, setStakeFilters] = useState([
    StakePoolFilterEnum.FILTER_BY_45_DAYS,
    StakePoolFilterEnum.FILTER_BY_90_DAYS,
    StakePoolFilterEnum.FILTER_BY_180_DAYS,
    StakePoolFilterEnum.FILTER_BY_360_DAYS,
  ])
  const { filterByStakePool } = useFilterByStakePool(stakeFilters)
  const nftPositions = salePositions
    .filter((position) => position.market.seller != currentUserAddress)
    .filter((stakingPosition) => filterByStakePool(stakingPosition))
    .sort((current, previous) => sortFunction(current, previous))

  return {
    nftPositions,
    stakeFilters,
    setStakeFilters,
    setSort,
    isLoading,
    isFetching,
  }
}
