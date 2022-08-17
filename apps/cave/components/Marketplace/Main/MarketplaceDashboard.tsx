import { Flex, Text, VStack } from '@chakra-ui/react'
import { BoxProps } from '@concave/ui'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from 'components/Marketplace/Main/MarketplaceFilterContainer'
import { useRouter } from 'next/router'
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
  const { push } = useRouter()

  const positions = nftPositions.map((stakingPosition) => (
    <MarketplacePosition
      key={+stakingPosition.tokenId.toString()}
      stakingPosition={stakingPosition}
    />
  ))

  return (
    <>
      <VStack
        apply="background.metal"
        width={['100%', '100%', '100%', '100%', `800px`]}
        maxH={'1000px'}
        p={4}
        borderRadius={'3xl'}
        w={'full'}
      >
        <MarketplaceFilterContainer
          stakeFilters={stakeFilters}
          onChangeStakeFilters={setStakeFilters}
        />
        <Flex width={'full'}>
          <MarketplaceSortConainer onChangeSort={setSort} currentSort={sort} />
          <TokenIdSearchBar onApplyFilter={setTokenIdFilter} />
        </Flex>
        <Flex
          as={Loading}
          size="md"
          isLoading={isFetching}
          rLabel=""
          rounded={'inherit'}
          shadow="down"
          w="full"
          p={4}
          py={6}
          justify="start"
          overflowY={'scroll'}
          h={'auto'}
          direction="column"
          apply="scrollbar.big"
          gap={4}
        >
          {positions.length == 0 ? (
            <>
              <Text size={'lg'} fontWeight={'bold'}>
                No results found
              </Text>
              <Text>Check your filters</Text>
            </>
          ) : (
            <>{positions}</>
          )}
        </Flex>
      </VStack>
    </>
  )
}
