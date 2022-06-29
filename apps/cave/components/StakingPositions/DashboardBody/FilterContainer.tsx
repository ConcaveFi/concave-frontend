import { Flex, Text, useBreakpointValue } from '@concave/ui'
import { RangeFilter } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { StakePoolFilterEnum } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { InitialCNVFilter } from 'components/NftFilters/Filters/InitialCNVFilter'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { SortCard } from 'components/NftFilters/Sorters/SortCard'
import { useState } from 'react'

interface FilterContainerProps {
  onEnableStakeFilter: (filter: StakePoolFilterEnum) => void
  onApplyInitalCNVFilter: (rangeFilter: RangeFilter) => void
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
  stakePoolFilters,
  currentInitalCNVFilter,
}: FilterContainerProps) {
  const mobileUI = useBreakpointValue({ base: true, md: false })
  return (
    <Flex
      rounded={'2xl'}
      py="6"
      shadow={'up'}
      width="full"
      direction={'column'}
      justify={'space-between'}
      px={4}
      align="start"
      gap={1}
      my={2}
      apply="background.metal"
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
