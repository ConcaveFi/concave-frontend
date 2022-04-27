import {
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@concave/ui'
import SearchFilterCard from './SearchFilterCard'
import NftPositionCard from './NftPositionCard'
import { SearchIcon, SwapSettingsIcon } from '@concave/icons'
import { Dispatch, SetStateAction, useState } from 'react'
import StakePeriodCard from './StakePeriodCard'
import PriceCard from './PriceCard'
import RedeemCard from './RedeemCard'
import DiscountCard from './DiscountCard'
interface MarketplaceSearchCardProps {
  active?: boolean
  onClick?: (any: Dispatch<SetStateAction<boolean>>) => void
}

const MarketplaceSearchCard = (props: MarketplaceSearchCardProps) => {
  const filters = [
    { title: 'Redeem In', icon: 'RedeemIcon', card: <RedeemCard />, offsetX: 0 },
    { title: 'Price', icon: 'PriceIcon', card: <PriceCard />, offsetX: -120 },
    { title: 'Discount', icon: 'DiscountIcon', card: <DiscountCard />, offsetX: 0 },
    {
      title: 'Stake Period',
      icon: 'StakeIcon',
      card: <StakePeriodCard />,
      offsetX: -100,
    },
  ]
  const nftPositions = [
    { stakePeriod: 1, price: 102, redeemIn: 20, discount: 2.1 },
    { stakePeriod: 12, price: 12, redeemIn: 1, discount: 20 },
    { stakePeriod: 2, price: 50, redeemIn: 12, discount: 1.2 },
    { stakePeriod: 10, price: 229, redeemIn: 4, discount: 14 },
    { stakePeriod: 23, price: 112, redeemIn: 7, discount: 12 },
    { stakePeriod: 5, price: 522, redeemIn: 12, discount: 5 },
  ]

  const nftPositionsComp = nftPositions
    .sort(sortByStakePeriod)
    .map((value, index) => (
      <NftPositionCard
        price={value.price}
        redeemIn={value.redeemIn}
        stakePeriod={value.stakePeriod}
        discount={value.discount}
      />
    ))

  const filterCards = filters.map((e, k) => {
    return (
      <Popover offset={[e.offsetX, 10]}>
        {/* Chakra type bug, related to just released react 18, should be fixed soon 
        // @ts-ignore  */}
        <PopoverTrigger>
          <Button>
            <SearchFilterCard key={k} title={e.title} icon={e.icon}></SearchFilterCard>
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

  const [active, setActive] = useState(false)
  function onClose(): void {}
  return (
    <Card p={3} gap={2} variant="primary" h="945px" shadow="down" w="640px">
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
        __css={{
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
        }}
      >
        {nftPositionsComp}
      </Box>
    </Card>
  )
}

const sortByDiscount = (current, before) => {
  if (current.discount > before.discount) return 1
  else return -1
}
const sortByPrice = (current, before) => {
  if (current.price > before.price) return 1
  else return -1
}
const sortByRedeenIn = (current, before) => {
  if (current.redeemIn > before.redeemIn) return 1
  else return -1
}
const sortByStakePeriod = (current, before) => {
  if (current.stakePeriod > before.stakePeriod) return 1
  else return -1
}

export default MarketplaceSearchCard
