import { Flex, Text } from '@concave/ui'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { FC } from 'react'
import { MarketplaceSort } from '../Sort/MarketplaceSort'

type MarketplaceSortConainerProps = { currentSort: NftSort; onChangeSort: (sort: NftSort) => void }
export const MarketplaceSortConainer: FC<MarketplaceSortConainerProps> = ({
  currentSort,
  onChangeSort,
}) => {
  return (
    <Flex align={'center'} justify="start" width={'full'} gap={4}>
      <Text fontSize={'lg'} color="text.low" fontWeight={'bold'}>
        Sort by:
      </Text>
      <MarketplaceSort
        onChangeSort={onChangeSort}
        isSelected={currentSort?.sort === 'STAKE_POOL'}
        nftSort={'STAKE_POOL'}
      />
      {/* <MarketplaceSort
        onChangeSort={onChangeSort}
        isSelected={currentSort?.sort === 'PRICE'}
        nftSort={'PRICE'}
      /> */}
      <MarketplaceSort
        onChangeSort={onChangeSort}
        isSelected={currentSort?.sort === 'REDEEM_DATE'}
        nftSort={'REDEEM_DATE'}
      />
    </Flex>
  )
}
