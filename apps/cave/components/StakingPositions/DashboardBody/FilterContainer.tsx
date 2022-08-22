import { Flex, Text } from '@concave/ui'
import { RangeFilter } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { StakePoolFilterEnum } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { InitialCNVFilter } from 'components/NftFilters/Filters/InitialCNVFilter'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { SortCard } from 'components/NftFilters/Sorters/SortCard'

interface FilterContainerProps {
  onEnableStakeFilter: (filter: StakePoolFilterEnum) => void
  onApplyInitalCNVFilter: (rangeFilter: RangeFilter) => void
  onResetStakeFilters: (filters: StakePoolFilterEnum[]) => void
  onResetInitialCNVFilter: () => void
  onChangeSort: (sorter: NftSort) => void
  onDisableStakeFilter: (filter: StakePoolFilterEnum) => void
  stakePoolFilters: StakePoolFilterEnum[]
  currentInitalCNVFilter: RangeFilter
}

export function FilterContainer({
  onDisableStakeFilter,
  onEnableStakeFilter,
  onChangeSort,
  onApplyInitalCNVFilter,
  onResetInitialCNVFilter,
  onResetStakeFilters,
  stakePoolFilters,
  currentInitalCNVFilter,
}: FilterContainerProps) {
  return (
    <Flex
      rounded={'2xl'}
      width="full"
      direction={{ base: 'column', md: 'row' }}
      justify={'space-between'}
      px={4}
      gap={{ base: 4 }}
      my={2}
    >
      <Flex align="center " gap={2} fontWeight={'bold'}>
        <Text textColor="text.low">Filter by:</Text>
        {/* <RedeemDateFilter /> */}
        <InitialCNVFilter
          currentFilter={currentInitalCNVFilter}
          onResetFilter={onResetInitialCNVFilter}
          onApplyFilter={onApplyInitalCNVFilter}
        />
        <StakePoolFilterCard
          onResetFilter={onResetStakeFilters}
          stakePoolFilters={stakePoolFilters}
          onDisableFilter={onDisableStakeFilter}
          onEnableFilter={onEnableStakeFilter}
        />
      </Flex>
      <Flex ml={2} align={'center'} gap={2} fontWeight={'bold'}>
        <Text textColor="text.low">Sort by:</Text>
        <SortCard onChangeSort={onChangeSort} />
      </Flex>
    </Flex>
  )
}
