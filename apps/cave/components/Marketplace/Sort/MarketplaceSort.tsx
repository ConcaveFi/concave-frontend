import { LinesIcon } from '@concave/icons'
import { Flex, gradientBorder, Text } from '@concave/ui'
import { NftOrder, NftSort, NftSortType } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { FC, useEffect, useState } from 'react'

type MarketplaceSortProps = {
  isSelected: boolean
  onChangeSort: (nftSort: NftSort) => void
  nftSort: NftSortType
}
export const MarketplaceSort: FC<MarketplaceSortProps> = ({
  isSelected,
  onChangeSort,
  nftSort,
}) => {
  const [order, setOrder] = useState<NftOrder>('ASC')

  useEffect(() => {
    if (!isSelected) setOrder('ASC')
  }, [isSelected])
  return (
    <Flex
      h={'30px'}
      px={4}
      rounded="full"
      shadow={'up'}
      align="center"
      cursor={'pointer'}
      sx={isSelected && { ...gradientBorder({ borderWidth: 2 }) }}
      onClick={() => {
        if (!isSelected) {
          onChangeSort({ sort: nftSort, order })
          return
        } else if (isSelected && order === 'ASC') {
          setOrder('DESC')
          onChangeSort({ sort: nftSort, order: 'DESC' })
          return
        } else if (isSelected && order === 'DESC') {
          setOrder('ASC')
          onChangeSort(undefined)
        }
      }}
    >
      <Text fontSize={'sm'} userSelect={'none'} color={!isSelected && 'text.low'}>
        {sortName[nftSort]}
      </Text>
      <LinesIcon
        fill={isSelected ? '#fff' : '#5F7A99'}
        my={'auto'}
        mx={1}
        boxSize="14px"
        transform={iconRotateByOrder[order]}
      />
    </Flex>
  )
}
const iconRotateByOrder = {
  ASC: 'Rotate(0deg)',
  DESC: 'Rotate(180deg)',
}
const sortName = {
  STAKE_POOL: 'Stake period',
  PRICE: 'Price',
  REDEEM_DATE: 'Redeem in',
  DISCOUNT: 'Discount',
}
