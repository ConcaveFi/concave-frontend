import { Flex, Text, VStack } from '@chakra-ui/react'
import { ChevronRightIcon } from '@concave/icons'
import { BoxProps, gradientBorder } from '@concave/ui'
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

  const positions = nftPositions.map((stakingPosition) => (
    <MarketplacePosition
      key={+stakingPosition.tokenId.toString()}
      stakingPosition={stakingPosition}
    />
  ))
  const { push } = useRouter()

  return (
    <VStack apply="background.metal" {...props}>
      <Flex
        mb={-10}
        align={'center'}
        sx={{ ...gradientBorder({ borderWidth: 1 }) }}
        alignSelf={'end'}
        rounded="2xl"
        shadow={'up'}
        px={3}
        py={'2'}
        cursor="pointer"
        onClick={() => push('liquid-stake-positions')}
      >
        <Text userSelect={'none'} color={'text.low'} fontWeight="bold">
          Your positions
        </Text>
        <ChevronRightIcon boxSize={'30px'} color="text.low" />
      </Flex>
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
  )
}
