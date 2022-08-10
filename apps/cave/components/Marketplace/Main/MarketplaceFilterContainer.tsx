import { Flex, HStack, Text } from '@concave/ui'
import { StakePoolFilterEnum } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { SortCard } from 'components/NftFilters/Sorters/SortCard'

export function MarketplaceFilterContainer({
  stakeFilters,
  onChangeSort,
  onChangeStakeFilters,
}: {
  stakeFilters: StakePoolFilterEnum[]
  onChangeStakeFilters: (stakeFilters: StakePoolFilterEnum[]) => void
  onChangeSort: (sorter: NftSort) => void
}) {
  return (
    <HStack
      width="full"
      direction={'column'}
      bg={{ base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)', md: 'transparent' }}
      justify={'center'}
      align="center"
      rounded={'2xl'}
      position="relative"
      shadow={{ base: 'up', md: 'none' }}
    >
      <Flex align="center " gap={2} fontWeight={'bold'}>
        <Text textColor="text.low">Filter by:</Text>
        <StakePoolFilterCard
          onResetFilter={onChangeStakeFilters}
          stakePoolFilters={stakeFilters}
          onDisableFilter={(removedFilter) =>
            onChangeStakeFilters(stakeFilters.filter((filter) => filter !== removedFilter))
          }
          onEnableFilter={(addedFilter) => onChangeStakeFilters([...stakeFilters, addedFilter])}
        />
      </Flex>
      <Flex ml={2} align={'center'} gap={2} fontWeight={'bold'}>
        <Text textColor="text.low">Sort by:</Text>
        <SortCard onChangeSort={onChangeSort} />
      </Flex>
    </HStack>
  )
}
