import { Flex, Text, useBreakpointValue } from '@concave/ui'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { FC } from 'react'
import { MarketplaceSort } from '../Sort/MarketplaceSort'

type MarketplaceSortConainerProps = { currentSort: NftSort; onChangeSort: (sort: NftSort) => void }
export const MarketplaceSortConainer: FC<MarketplaceSortConainerProps> = ({
  currentSort,
  onChangeSort,
}) => {
  const hideLabel = useBreakpointValue({ base: false, md: false, xl: false, '2xl': false })

  return (
    <Flex justifyContent={'space-between'} flexWrap={'wrap'} width={'full'} gap={4}>
      {hideLabel && (
        <Text color={'text.low'} noOfLines={1} fontWeight={`bold`}>
          Sort by:
        </Text>
      )}
      <MarketplaceSort
        onChangeSort={onChangeSort}
        isSelected={currentSort?.sort === 'STAKE_POOL'}
        nftSort={'STAKE_POOL'}
      />
      <MarketplaceSort
        onChangeSort={onChangeSort}
        isSelected={currentSort?.sort === 'DISCOUNT'}
        nftSort={'DISCOUNT'}
      />
      <MarketplaceSort
        onChangeSort={onChangeSort}
        isSelected={currentSort?.sort === 'PRICE'}
        nftSort={'PRICE'}
      />
      <MarketplaceSort
        onChangeSort={onChangeSort}
        isSelected={currentSort?.sort === 'REDEEM_DATE'}
        nftSort={'REDEEM_DATE'}
      />
    </Flex>
  )
}
