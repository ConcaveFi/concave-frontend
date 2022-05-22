import { Box, Card, Flex, Image } from '@concave/ui'
import { log } from 'console'
import { useState } from 'react'
import useNftPositionFilter, {
  MarketPlaceFilterType,
  NftPositionDaysFilterType,
} from './hooks/useNftPositionFilter'
import useNftPositionSort, { NftPositionSortType } from './hooks/useNftPositionSort'
import MarketplaceFilterContainer from './MarketplaceFilterContainer'

export default function MarketplaceSearchCard() {
  const [sortType, setSortType] = useState(NftPositionSortType.NONE)
  const [marketPlaceFilter, setMarketPlaceFilter] = useState<MarketPlaceFilterType>({
    filterByDay: NftPositionDaysFilterType.NONE,
    filterByPrice: false,
    from: 0,
    to: 0,
  })

  const { type, sorterFunction } = useNftPositionSort(sortType)
  const { filterByDay, filterByPrice } = useNftPositionFilter(marketPlaceFilter)

  const nftPositions = [
    { stakePool: 45, price: 102, redeemIn: 20, discount: 2.1 },
    { stakePool: 360, price: 12, redeemIn: 1, discount: 20 },
    { stakePool: 90, price: 50, redeemIn: 12, discount: 1.2 },
    { stakePool: 360, price: 229, redeemIn: 4, discount: 14 },
    { stakePool: 90, price: 112, redeemIn: 7, discount: 12 },
    { stakePool: 180, price: 522, redeemIn: 12, discount: 5 },
    { stakePool: 90, price: 102, redeemIn: 20, discount: 2.1 },
    { stakePool: 180, price: 12, redeemIn: 1, discount: 20 },
    { stakePool: 90, price: 50, redeemIn: 12, discount: 1.2 },
    { stakePool: 360, price: 229, redeemIn: 4, discount: 14 },
    { stakePool: 360, price: 112, redeemIn: 7, discount: 12 },
    { stakePool: 45, price: 522, redeemIn: 12, discount: 5 },
  ]
    .filter(filterByDay)
    .filter(filterByPrice)
    .sort(sorterFunction)

  console.log(nftPositions)

  return (
    <Box
      bg="linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)"
      width={{ base: '340px', md: '440px', lg: '640px' }}
      height="950px"
      mt={'10px'}
      rounded="2xl"
      boxShadow={'up'}
    >
      <Flex
        height={'full'}
        width="full"
        bg="url(assets/textures/metal.png)"
        position={'absolute'}
        bgSize="30%"
      />
      <MarketplaceFilterContainer
        onChangeFilter={setMarketPlaceFilter}
        sortType={sortType}
        onChangeSorter={setSortType}
      />
    </Box>
  )
}
