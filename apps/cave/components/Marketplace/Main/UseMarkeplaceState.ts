import {
  FixedOrderMarketContract,
  listListedPositions,
  StakingPool,
  stakingPools,
} from '@concave/marketplace'
import { filterStakePool } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { NftSort, usePositionSorter } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useProvider } from 'wagmi'

export const useMarketplaceDashbord = () => {
  const chainId = useCurrentSupportedNetworkId()
  const provider = useProvider()
  const positions = useQuery(
    ['sales', chainId],
    async () => {
      const marketplace = new FixedOrderMarketContract(provider)
      const itens = await listListedPositions({ provider })
      const nonExecutedItens = await Promise.all(
        itens.map(async (i) => {
          const isExecuted = await marketplace.isExecuted(i.market)
          if (isExecuted) return undefined
          return i
        }),
      )
      return nonExecutedItens.filter(Boolean)
    },
    {
      enabled: !!chainId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: true,
      refetchOnMount: false,
    },
  )
  const positionSorter = usePositionSorter()
  const salePositions = positions.data || []
  const [tokenIdFilter, setTokenIdFilter] = useState<number>()
  const [sort, setSort] = useState<NftSort>({ sort: 'REDEEM_DATE', order: 'ASC' })
  const sortFunction = sort ? positionSorter.data?.[sort.sort][sort.order] : () => 0

  const [stakeFilters, setStakeFilters] = useState<number[]>(stakingPools.map(i => i.poolId))
  const now = BigNumber.from(Date.now()).div(1000)
  const { filterByStakePool } = filterStakePool(stakeFilters)
  const nftPositions = salePositions
    .filter((stakingPosition) => {
      if (!tokenIdFilter) return true
      return stakingPosition.tokenId === tokenIdFilter
    })
    .filter((stakingPosition) => stakingPosition.market.deadline.gt(now))
    .filter((stakingPosition) => filterByStakePool(stakingPosition))
    .sort((current, previous) => sortFunction(current, previous))

  return {
    tokenIdFilter,
    sort,
    nftPositions,
    stakeFilters,
    setStakeFilters,
    setSort,
    setTokenIdFilter,
    isLoading: positions.isLoading,
    isFetching: positions.isFetching,
  }
}
