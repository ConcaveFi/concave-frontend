import { Box, Card, Flex, Image } from '@concave/ui'
import { log } from 'console'
import { useState } from 'react'
import useNftPositionFilter, {
  MarketPlaceFilterType,
  NftPositionDaysFilterType,
} from './hooks/useNftPositionFilter'
import useNftPositionSort, { NftPositionSortType } from './hooks/useNftPositionSort'
import MarketplaceFilterContainer from './MarketplaceFilterContainer'
import NftPositionCard from './NftPositionCard'

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
    .map((value, index) => (
      <NftPositionCard
        key={index}
        stakePool={value.stakePool}
        redeemIn={value.redeemIn}
        price={value.price}
        discount={value.discount}
      />
    ))

  return (
    <Box
      bg={{
        base: '',
        md: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
      }}
      width={{ base: '330px', md: '440px', lg: '640px' }}
      height="950px"
      mt={'10px'}
      rounded="2xl"
      boxShadow={{ base: '', md: 'up' }}
      position="relative"
    >
      {/* This box is just to add the metal image on component */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position={'absolute'}
        height="full"
        width={'full'}
        bgImage={'/assets/textures/metal.png'}
        bgSize="16% 16%"
        rounded={'2xl'}
      />
      <MarketplaceFilterContainer
        onChangeFilter={setMarketPlaceFilter}
        sortType={sortType}
        onChangeSorter={setSortType}
      />
      <Flex
        flex={1}
        pt={3}
        maxHeight="795px"
        mx={'auto'}
        mt={{ base: 0, md: 5 }}
        height={'full'}
        shadow={{ base: '', md: 'down' }}
        rounded={'2xl'}
        overflowX="hidden"
        overflowY="scroll"
        __css={scrollBar}
        direction="column"
        width={{ base: '330px', md: '420px', lg: '600px' }}
        position={'relative'}
        // px={'10px'}
      >
        {nftPositions}
      </Flex>
    </Box>
  )
}

const invisibleScrollBar = {
  '&::-webkit-scrollbar': {
    display: { base: 'none', md: '' },
  },
}

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: { base: '0px', md: '15px' },
    display: { base: 'none', md: 'flex' },
    // boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
    borderRadius: '10px',
    mt: '30px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
    boxShadow:
      '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
    rounded: 'lg',
  },
}
