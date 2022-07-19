import { Flex, Text, VStack } from '@chakra-ui/react'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from 'components/Marketplace/MarketplaceFilterContainer'
import { useMarketplaceDashbord } from 'components/Marketplace/UseMarkeplaceState'
import {
  StakePoolFilterEnum,
  useFilterByStakePool,
} from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { NftSort, NftSortMethod } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useState } from 'react'
import { MarketplacePosition } from './MarketplacePosition'

export const MarketplaceDashboard = () => {
  const { isFetching, salePositions, owner, setOwner } = useMarketplaceDashbord()
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
    .filter((marketItem) => filterByStakePool(marketItem.position))
    .sort((current, previous) => sortFunction(current.position, previous.position))
    .map((marketItem) => (
      <MarketplacePosition key={+marketItem.position.tokenId.toString()} marketItem={marketItem} />
    ))

  return (
    <VStack
      width={'640px'}
      maxHeight="940px"
      rounded={'2xl'}
      apply="background.metalBrighter"
      shadow={'up'}
      gap={5}
      p={5}
    >
      <MarketplaceFilterContainer
        stakeFilters={stakeFilters}
        address={owner}
        setAddress={setOwner}
        onChangeSort={setSort}
        onChangeStakeFilters={setStakeFilters}
      />
      {/* Positions Container */}
      <Flex
        as={Loading}
        size="md"
        isLoading={isFetching}
        rLabel=""
        rounded={'inherit'}
        shadow="down"
        w="full"
        maxW="900px"
        m={4}
        p={4}
        overflowY={'auto'}
        direction="column"
        apply="scrollbar.big"
        bg={'linear-gradient(238.35deg, #19394C 9.11%, #0A161F 92.45%)'}
      >
        {!!nftPositions.length && nftPositions}
        {!nftPositions.length && (
          <>
            <Text size={'lg'} fontWeight={'bold'}>
              Not found results
            </Text>
            <Text>Check your filters</Text>
          </>
        )}
      </Flex>
    </VStack>
  )
}
