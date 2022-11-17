import { Flex, Text, VStack } from '@chakra-ui/react'
import { BoxProps, HStack, useBreakpointValue } from '@concave/ui'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from 'components/Marketplace/Main/MarketplaceFilterContainer'
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

  const positions = nftPositions.map((stakingPosition) => (
    <MarketplacePosition
      key={+stakingPosition.tokenId.toString()}
      stakingPosition={stakingPosition}
    />
  ))

  const isMobile = useBreakpointValue({ base: true, sm: false })

  return (
    <VStack apply="background.metal" p={4} gap={4} borderRadius={'3xl'} maxH={'1000px'}>
      <>
        <MarketplaceFilterContainer
          stakeFilters={stakeFilters}
          onChangeStakeFilters={setStakeFilters}
        />
        <HStack w={'full'} flex={1} gap={2} flexWrap={'wrap'} justifyContent={'space-around'}>
          <MarketplaceSortConainer onChangeSort={setSort} currentSort={sort} />
          {!isMobile && <TokenIdSearchBar onApplyFilter={setTokenIdFilter} />}
        </HStack>
      </>
      <Flex
        as={Loading}
        size="md"
        isLoading={isFetching && !nftPositions.length}
        rLabel=""
        rounded={'inherit'}
        shadow="down"
        w="full"
        textAlign={`center`}
        justify="start"
        p={4}
        overflow={'scroll'}
        direction="column"
      >
        <Flex
          mt={-2}
          mx={-2}
          pt={4}
          pr={2}
          borderRadius={'2xl'}
          overflowY={'scroll'}
          h={'auto'}
          direction="column"
          apply="scrollbar.big"
          gap={4}
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
