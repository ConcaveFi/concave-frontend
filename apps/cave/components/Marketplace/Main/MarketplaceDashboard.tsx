import { Flex, Text, VStack } from '@chakra-ui/react'
import { BoxProps, HStack, useBreakpointValue } from '@concave/ui'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from 'components/Marketplace/Main/MarketplaceFilterContainer'
import { useState } from 'react'
import { MarketplacePosition } from './MarketplacePosition'
import { MarketplaceSortConainer } from './MarketplaceSortContainer'
import { TokenIdSearchBar } from './TokenIdSearchBar'
import { useMarketplaceDashbord } from './UseMarkeplaceState'

export const MarketplaceDashboard = (props: BoxProps) => {
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
  const positions = nftPositions.map((stakingPosition) => (
    <MarketplacePosition
      key={stakingPosition.tokenId.toString()}
      stakingPosition={stakingPosition}
      onMouseEnter={() => setActivePosition(stakingPosition.tokenId.toString())}
      onMouseLeave={() => setActivePosition('')}
      isActive={stakingPosition.tokenId.toString() === activePosition}
    />
  ))

  return (
    <VStack bg="bg.primary" shadow={'up'} p={4} gap={4} borderRadius={'3xl'} maxH={'1000px'}>
      <MarketplaceFilterContainer
        stakeFilters={stakeFilters}
        onChangeStakeFilters={setStakeFilters}
      />
      <HStack w={'full'} flex={1} gap={2} flexWrap={'wrap'} justifyContent={'space-around'}>
        <MarketplaceSortConainer onChangeSort={setSort} currentSort={sort} />
        {!isMobile && <TokenIdSearchBar onApplyFilter={setTokenIdFilter} />}
      </HStack>

      <Flex w="full" shadow="down" rounded={'16px'} p={2} overflow="hidden">
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
