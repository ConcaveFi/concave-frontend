import { Search2Icon } from '@concave/icons'
import { Box, Flex, Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import DiscountFilterCard from './Filters/DiscountFilterCard'
import PriceFilterCard from './Filters/PriceFilterCard'
import RedeemFilterCard from './Filters/RedeemFilterCard'
import StakePoolFilterCard from './Filters/StakePoolFilterCard'
import { MarketPlaceFilterType, NftPositionDaysFilterType } from './hooks/useNftPositionFilter'
import { NftPositionSortType } from './hooks/useNftPositionSort'

interface MarketplaceFilterContainerProps {
  sortType: NftPositionSortType
  onChangeSorter: (sorterType: NftPositionSortType) => void
  onChangeFilter: (filterProps: MarketPlaceFilterType) => void
}

export default function MarketplaceFilterContainer(props: MarketplaceFilterContainerProps) {
  const { sortType, onChangeSorter } = props
  const [filterByPrice, setFilterByPrice] = useState(false)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)
  const [dayFilterType, setDayFilterType] = useState(NftPositionDaysFilterType.NONE)

  useEffect(() => {
    props.onChangeFilter({
      filterByDay: dayFilterType,
      filterByPrice: filterByPrice,
      from,
      to,
    })
  }, [dayFilterType, filterByPrice, from, to])

  const setPriceValues = (from: number, to: number) => {
    setFrom(from)
    setTo(to)
    setFilterByPrice(true)
  }

  const resetPriceValues = () => {
    setFrom(0)
    setTo(0)
    setFilterByPrice(false)
  }

  return (
    <Flex
      height={{ base: '140px', md: '100px' }}
      width="full"
      direction={'column'}
      mt={4}
      bg={{ base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)', md: 'transparent' }}
      justify={'center'}
      align="center"
      rounded={'2xl'}
      position="relative"
      gap={{ base: 4, md: 0 }}
    >
      <Box
        display={{ base: 'block', md: 'none' }}
        position={'absolute'}
        height="full"
        width={'full'}
        bgImage={'/assets/textures/metal.png'}
        bgSize="40% 50%"
        rounded={'2xl'}
      />
      {/* Search Container */}
      <Flex flex={{ base: 0, md: 1 }} justify="center">
        <Flex width={{ md: '380px', base: '280px' }} height="30px" rounded={'full'} shadow="down">
          <Search2Icon color="text.low" boxSize={'20px'} my="auto" ml={2} />
          <Text my={'auto'} fontWeight="bold" textColor={'text.low'} ml={3}>
            {/* Coming soon! */}
          </Text>
        </Flex>
      </Flex>

      {/* Filters Container */}
      <Flex justify={'center'} align="center" flex={{ base: 0, md: 1 }} gap={{ base: 0, md: 4 }}>
        <StakePoolFilterCard
          currentSorter={sortType}
          onChangeSorter={onChangeSorter}
          onApplyFilters={setDayFilterType}
          onResetFilters={() => setDayFilterType(NftPositionDaysFilterType.NONE)}
        />
        <RedeemFilterCard currentSorter={sortType} onChangeSorter={onChangeSorter} />
        <DiscountFilterCard currentSorter={sortType} onChangeSorter={onChangeSorter} />
        <PriceFilterCard
          onApplyFilter={setPriceValues}
          onResetFilter={resetPriceValues}
          currentSorter={sortType}
          onChangeSorter={onChangeSorter}
        />
      </Flex>
    </Flex>
  )
}
