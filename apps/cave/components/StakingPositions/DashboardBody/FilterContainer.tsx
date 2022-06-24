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
  onChangeSorter: (sorter: NftSort) => void
  onDisableStakeFilter: (filter: StakePoolFilterEnum) => void
}

export function FilterContainer({
  onDisableStakeFilter,
  onEnableStakeFilter,
  onChangeSorter,
  onApplyInitalCNVFilter,
  onResetInitialCNVFilter,
}: FilterContainerProps) {
  const mobileUI = useBreakpointValue({ base: true, md: false })
  const [stakeFilters, setStakeFilters] = useState([])

  return (
    <Flex height={'45px'} width="full" justify={'center'} align="center" my={2}>
      <Flex zIndex={2} px={5} justify="space-between" width={'full'}>
        <Flex align="center " gap={2}>
          <Text fontWeight={'bold'} textColor="text.low">
            Filter by:
          </Text>
          <Flex gap={3}>
            {/* <RedeemDateFilter /> */}
            <InitialCNVFilter
              onResetFilter={onResetInitialCNVFilter}
              onApplyFilter={onApplyInitalCNVFilter}
            />
            <StakePoolFilterCard
              onDisableFilter={onDisableStakeFilter}
              onEnableFilter={onEnableStakeFilter}
            />
          </Flex>
        </Flex>
        <Flex align={'center'} gap={2}>
          <Text fontWeight={'bold'} textColor="text.low">
            Sort by:
          </Text>
          <SortCard onChangeSorter={onChangeSorter} />
        </Flex>
      </Flex>
    </Flex>
  )
}
