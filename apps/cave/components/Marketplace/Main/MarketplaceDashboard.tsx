import { Flex, Text, VStack } from '@chakra-ui/react'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from 'components/Marketplace/Main/MarketplaceFilterContainer'
import { MarketplacePosition } from './MarketplacePosition'
import { MarketplaceSortConainer } from './MarketplaceSortContainer'
import { useMarketplaceDashbord } from './UseMarkeplaceState'

export const MarketplaceDashboard = () => {
  const { isFetching, nftPositions, stakeFilters, sort, setSort, setStakeFilters } =
    useMarketplaceDashbord()

  const positions = nftPositions.map((stakingPosition) => (
    <MarketplacePosition
      key={+stakingPosition.tokenId.toString()}
      stakingPosition={stakingPosition}
    />
  ))

  return (
    <VStack
      width={'full'}
      rounded={'2xl'}
      apply="background.metalBrighter"
      shadow={'up'}
      p={4}
      gap={4}
    >
      <MarketplaceFilterContainer
        stakeFilters={stakeFilters}
        onChangeStakeFilters={setStakeFilters}
      />
      <MarketplaceSortConainer onChangeSort={setSort} currentSort={sort} />
      <Flex
        as={Loading}
        size="md"
        isLoading={isFetching}
        rLabel=""
        rounded={'inherit'}
        shadow="down"
        w="full"
        h={'full'}
        maxW="900px"
        p={4}
        py={6}
        justify="start"
        overflowY={'auto'}
        direction="column"
        apply="scrollbar.big"
        bg={'linear-gradient(238.35deg, #19394C 9.11%, #0A161F 92.45%)'}
        gap={4}
      >
        {positions.length == 0 ? (
          <>
            <Text size={'lg'} fontWeight={'bold'}>
              Not found results
            </Text>
            <Text>Check your filters</Text>
          </>
        ) : (
          <>{positions}</>
        )}
      </Flex>
    </VStack>
  )
}
