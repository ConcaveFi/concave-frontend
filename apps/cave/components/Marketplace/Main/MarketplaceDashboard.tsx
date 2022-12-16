import { Flex, Text, VStack } from '@chakra-ui/react'
import { StakingPosition } from '@concave/marketplace'
import { BoxProps, HStack, useBreakpointValue } from '@concave/ui'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from 'components/Marketplace/Main/MarketplaceFilterContainer'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { MarketplacePosition } from './MarketplacePosition'
import { MarketplaceSortConainer } from './MarketplaceSortContainer'
import { TokenIdSearchBar } from './TokenIdSearchBar'
import { useMarketplaceDashbord } from './UseMarkeplaceState'

export const MarketplaceDashboard = (props: BoxProps | any) => {
  const {
    isFetching,
    nftPositions,
    stakeFilters,
    sort,
    setTokenIdFilter,
    setSort,
    setStakeFilters,
  } = useMarketplaceDashbord()
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const [activePosition, setActivePosition] = useState('')
  const { address } = useAccount()

  let nftPositionsArray: StakingPosition[]
  if (props.filterUserPositions) {
    nftPositionsArray = nftPositions.filter((stakingPosition) => {
      if (stakingPosition.market?.seller.toUpperCase() === address.toUpperCase())
        return stakingPosition
    })
  } else {
    nftPositionsArray = nftPositions
  }

  const positions = nftPositionsArray.map((stakingPosition) => (
    <MarketplacePosition
      key={stakingPosition.tokenId.toString()}
      stakingPosition={stakingPosition}
      onMouseEnter={() => setActivePosition(stakingPosition.tokenId.toString())}
      onMouseLeave={() => setActivePosition('')}
      isActive={stakingPosition.tokenId.toString() === activePosition}
    />
  ))

  return (
    <VStack
      bg="bg.primary"
      shadow={'up'}
      p={4}
      gap={4}
      borderRadius={'3xl'}
      w={props.w || props.width}
      h={props.h || props.height}
      maxH={'1000px'}
    >
      <MarketplaceFilterContainer
        stakeFilters={stakeFilters}
        onChangeStakeFilters={setStakeFilters}
      />
      <HStack
        w={'full'}
        flex={1}
        gap={2}
        flexWrap={'wrap'}
        justifyContent={props.justifyContentSort || 'space-around'}
      >
        <MarketplaceSortConainer onChangeSort={setSort} currentSort={sort} />
        {!isMobile && <TokenIdSearchBar onApplyFilter={setTokenIdFilter} />}
      </HStack>

      <Flex flexGrow={100} w="full" shadow="down" rounded={'16px'} p={2} overflow="hidden">
        <Flex
          onScroll={() => setActivePosition('')}
          isLoading={isFetching}
          apply="scrollbar.big"
          textAlign={`center`}
          overflowY={'scroll'}
          rounded={'inherit'}
          direction="column"
          justify="start"
          as={Loading}
          h={'auto'}
          rLabel=""
          size="md"
          w="full"
          gap={4}
          p={2}
        >
          {positions.length == 0 ? (
            <>
              <Text size={'lg'} w={`full`} fontWeight={'bold'}>
                No results found
              </Text>
              <Text>Check your filters</Text>
            </>
          ) : (
            <>{positions}</>
          )}
        </Flex>
      </Flex>
    </VStack>
  )
}
