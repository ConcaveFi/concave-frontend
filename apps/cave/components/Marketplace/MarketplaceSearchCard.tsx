import {
  Box,
  Button,
  Card,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useMediaQuery,
} from '@concave/ui'
import SearchFilterCard from './SearchFilterCard'
import NftPositionCard from './NftPositionCard'
import { SearchIcon, SwapSettingsIcon } from '@concave/icons'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import StakePeriodCard from './StakePeriodCard'
import PriceCard from './PriceCard'
import RedeemCard from './RedeemCard'
import DiscountCard from './DiscountCard'
interface MarketplaceSearchCardProps {
  active?: boolean
  onClick?: (any: Dispatch<SetStateAction<boolean>>) => void
}

const MarketplaceSearchCard = (props: MarketplaceSearchCardProps) => {
  const [sortType, setSortType] = useState(SortType.NONE)
  const [activeRedeemButton, setActiveRedeemButton] = useState(0)
  const [activePriceButton, setActivePriceButton] = useState(0)
  const [activeDiscountButton, setActiveDiscountButton] = useState(0)
  const [activeStakeSortButton, setActiveStakeSortButton] = useState(0)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)
  const [filterByPrice, setFilterByPrice] = useState(false)
  const [filter12Month, setFilter12Month] = useState(false)
  const [filter6Month, setFilter6Month] = useState(false)
  const [filter3Month, setFilter3Month] = useState(false)
  const [filter1Month, setFilter1Month] = useState(false)
  const [isLargerThan770] = useMediaQuery('(min-width: 770px)')
  const sortFunctionType = sortByType(sortType)

  const filtersButton = [
    {
      title: 'Redeem In',
      icon: 'RedeemIcon',
      card: <RedeemCard initialActive={activeRedeemButton} onChange={switchRedeemButtons} />,
      hasFilter: activeRedeemButton !== 0,
      offsetX: 0,
    },
    {
      title: 'Price',
      icon: 'PriceIcon',
      card: (
        <PriceCard
          onReset={() => onReset('price')}
          onApply={(from, to) => onApplyFilterPrice(from, to)}
          activeButton={activePriceButton}
          onChange={switchPriceButtons}
        />
      ),
      hasFilter: activePriceButton !== 0 || filterByPrice,
      offsetX: -120,
    },
    {
      title: 'Discount',
      icon: 'DiscountIcon',
      hasFilter: activeDiscountButton !== 0,
      card: <DiscountCard activeButton={activeDiscountButton} onChange={switchDiscountButtons} />,
      offsetX: 0,
    },
    {
      title: 'Stake Period',
      icon: 'StakeIcon',
      hasFilter:
        activeStakeSortButton !== 0 ||
        filter12Month ||
        filter6Month ||
        filter3Month ||
        filter1Month,
      card: (
        <StakePeriodCard
          onReset={() => onReset('period')}
          onApply={onApplyStakePeriod}
          activeSortButton={activeStakeSortButton}
          onChange={switchStakeButtons}
        />
      ),
      offsetX: isLargerThan770 ? -100 : -200,
    },
  ]
  const nftPositions = [
    { stakePeriod: 45, price: 102, redeemIn: 20, discount: 2.1 },
    { stakePeriod: 360, price: 12, redeemIn: 1, discount: 20 },
    { stakePeriod: 90, price: 50, redeemIn: 12, discount: 1.2 },
    { stakePeriod: 360, price: 229, redeemIn: 4, discount: 14 },
    { stakePeriod: 90, price: 112, redeemIn: 7, discount: 12 },
    { stakePeriod: 180, price: 522, redeemIn: 12, discount: 5 },
    { stakePeriod: 90, price: 102, redeemIn: 20, discount: 2.1 },
    { stakePeriod: 180, price: 12, redeemIn: 1, discount: 20 },
    { stakePeriod: 90, price: 50, redeemIn: 12, discount: 1.2 },
    { stakePeriod: 360, price: 229, redeemIn: 4, discount: 14 },
    { stakePeriod: 360, price: 112, redeemIn: 7, discount: 12 },
    { stakePeriod: 45, price: 522, redeemIn: 12, discount: 5 },
  ]
    .filter((value) => {
      if (!filterByPrice) return true
      else return value.price >= from && value.price <= to
    })
    .filter((value) => {
      if (!filter12Month) return value
      else if (value.stakePeriod == 360) return value
    })
    .filter((value) => {
      if (!filter6Month) return true
      else return value.stakePeriod == 180
    })
    .filter((value) => {
      if (!filter3Month) return true
      else return value.stakePeriod == 90
    })
    .filter((value) => {
      if (!filter1Month) return true
      else return value.stakePeriod == 45
    })

  const nftPositionsComp = nftPositions
    .sort(sortFunctionType)
    .map((value, index) => (
      <NftPositionCard
        key={index}
        price={value.price}
        redeemIn={value.redeemIn}
        stakePeriod={value.stakePeriod}
        discount={value.discount}
      />
    ))

  const filterCards = filtersButton.map((e, k) => {
    return (
      <Popover offset={[e.offsetX, 10]} key={k}>
        {/* Chakra type bug, related to just released react 18, should be fixed soon 
        // @ts-ignore  */}
        <PopoverTrigger>
          <Button>
            <SearchFilterCard
              hasFilter={e.hasFilter}
              title={e.title}
              icon={e.icon}
            ></SearchFilterCard>
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent width={160} border={'none'}>
            {e.card}
          </PopoverContent>
        </Portal>
      </Popover>
    )
  })
  function onReset(type: 'period' | 'price') {
    if (type === 'period') {
      setFilter12Month(false)
      setFilter6Month(false)
      setFilter3Month(false)
      setFilter1Month(false)
    } else {
      setFilterByPrice(false)
    }
  }
  function switchRedeemButtons(clickedButton: number, sortType: SortType) {
    setActiveRedeemButton(clickedButton)
    setSortType(sortType)
    wipeAnotherButtons('redeem')
  }
  function switchPriceButtons(clickedButton: number, sortType: SortType) {
    setActivePriceButton(clickedButton)
    setSortType(sortType)
    wipeAnotherButtons('price')
  }
  function switchDiscountButtons(clickedButton: number, sortType: SortType) {
    setActiveDiscountButton(clickedButton)
    setSortType(sortType)
    wipeAnotherButtons('discount')
  }
  function switchStakeButtons(clickedButton: number, sortType: SortType) {
    setActiveStakeSortButton(clickedButton)
    setSortType(sortType)
    wipeAnotherButtons('stake')
  }
  function wipeAnotherButtons(except: 'redeem' | 'price' | 'discount' | 'stake') {
    if (except !== 'redeem') setActiveRedeemButton(0)
    if (except !== 'price') setActivePriceButton(0)
    if (except !== 'discount') setActiveDiscountButton(0)
    if (except !== 'stake') setActiveStakeSortButton(0)
  }
  function onApplyFilterPrice(from: number, to: number) {
    if (from === 0 && to === 0) return
    setFilterByPrice(true)
    setFrom(from)
    setTo(to)
  }
  function onApplyStakePeriod(
    filter12Month: boolean,
    filter6Month: boolean,
    filter3Month: boolean,
    filter1Month: boolean,
  ) {
    setFilter12Month(filter12Month)
    setFilter6Month(filter6Month)
    setFilter3Month(filter3Month)
    setFilter1Month(filter1Month)
  }

  const [cardWidth, setCardWidth] = useState('640px')

  useEffect(() => {
    setCardWidth(isLargerThan770 ? '640px' : '460px')
  })

  return (
    <Card p={3} gap={2} variant="primary" h="945px" shadow="down" w={cardWidth}>
      <Flex justify="center">
        <Box
          pos="relative"
          h="fit-content"
          px={4}
          pb="4"
          pt="1"
          overflowY={'auto'}
          maxHeight={'500px'}
        >
          <Flex
            grow={1}
            direction="row"
            pos="relative"
            w="380px"
            h="30px"
            shadow="down"
            py={2}
            px="-10"
            borderRadius="2xl"
            zIndex={2}
          >
            <SearchIcon height={6} />
          </Flex>
          <Flex direction="row" gap={4} position="relative" mt={4}>
            {filterCards}
          </Flex>
        </Box>
      </Flex>
      <Box
        pos="relative"
        h="100%"
        overflowY={'auto'}
        maxHeight={'100%'}
        borderRadius="12px"
        px={'0.5rem'}
        py={'0.5rem'}
        css={{
          background: 'rgba(113, 113, 113, 0.01)',
        }}
        shadow="down"
        __css={scrollBar}
      >
        {nftPositionsComp}
      </Box>
    </Card>
  )
}

export enum SortType {
  NONE,
  REDEEMIN_LOWEST_FIRST,
  REDEEMIN_HIGHEST_FIRST,
  PRICE_LOWEST_FIRST,
  PRICE_HIGHEST_FIRST,
  DISCOUNT_HIGHEST_FIRST,
  DISCOUNT_LOWEST_FIRST,
  STAKE_HIGHEST_FIRST,
  STAKE_LOWEST_FIRST,
}
const sortByType = (sortType: SortType) => {
  switch (sortType) {
    case SortType.REDEEMIN_HIGHEST_FIRST:
      return sortByRedeemIn('highest')
    case SortType.REDEEMIN_LOWEST_FIRST:
      return sortByRedeemIn('lowest')
    case SortType.PRICE_LOWEST_FIRST:
      return sortByPrice('lowest')
    case SortType.PRICE_HIGHEST_FIRST:
      return sortByPrice('highest')
    case SortType.DISCOUNT_HIGHEST_FIRST:
      return sortByDiscount('highest')
    case SortType.DISCOUNT_LOWEST_FIRST:
      return sortByDiscount('lowest')
    case SortType.STAKE_HIGHEST_FIRST:
      return sortByStakePeriod('highest')
    case SortType.STAKE_LOWEST_FIRST:
      return sortByStakePeriod('lowest')
    default:
      return (current, before) => {
        return -1
      }
  }
}

const sortByDiscount = (type: 'lowest' | 'highest') => (current, before) => {
  if (current.discount < before.discount && type === 'highest') return 1
  else if (current.discount > before.discount && type === 'lowest') return 1
  else return -1
}
const sortByPrice = (type: 'lowest' | 'highest') => (current, before) => {
  if (current.price < before.price && type === 'highest') return 1
  else if (current.price > before.price && type === 'lowest') return 1
  else return -1
}
const sortByRedeemIn = (type: 'lowest' | 'highest') => (current, before) => {
  if (current.redeemIn < before.redeemIn && type === 'highest') return 1
  else if (current.redeemIn > before.redeemIn && type === 'lowest') return 1
  else return -1
}
const sortByStakePeriod = (type: 'lowest' | 'highest') => (current, before) => {
  if (current.stakePeriod < before.stakePeriod && type === 'highest') return 1
  else if (current.stakePeriod > before.stakePeriod && type === 'lowest') return 1
  else return -1
}

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '20px',
    boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
    boxShadow:
      '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
    rounded: 'lg',
  },
}

export default MarketplaceSearchCard
