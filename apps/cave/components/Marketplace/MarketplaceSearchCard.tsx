import { Box, Card, Flex, Text } from '@concave/ui'
import SearchFilterCard from './SearchFilterCard'
import NftPositionCard from './NftPositionCard'
import { AddIcon, SearchIcon } from '@concave/icons'
import { Dispatch, SetStateAction, useState } from 'react'

const MarketplaceSearchCard = () => {
  // const {v, g, t, data} = props;
  const filters = [
    { title: 'Redeem In', icon: 'RedeemIcon' },
    { title: 'Price', icon: 'PriceIcon' },
    { title: 'Discount', icon: 'DiscountIcon' },
    { title: 'Stake Period', icon: 'StakeIcon' },
  ]
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
            // filter="drop-shadow(0px 0px 27px #81b3ff4f)"
          >
            <SearchIcon height={6} />
            {/* <Text fontSize="xs" color="text.low" fontWeight="medium" justifyItems={'end'} flex={1}>
              Search
            </Text> */}
          </Flex>
          <Flex direction="row" gap={4} position="relative" mt={4}>
            {filters.map((e) => {
              return <SearchFilterCard title={e.title} icon={e.icon} />
            })}
          </Flex>
        </Box>
      </Flex>
      <Box
        // border={"1px solid red"}
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
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
        <NftPositionCard />
      </Box>
    </Card>
  )
}

export default MarketplaceSearchCard
