import { Flex, useBreakpointValue } from '@concave/ui'
import StakePoolFilterCard from 'components/SearchFilters/StakePoolFilterCard'
import { MetalBox } from 'components/MetalBox'
import SimplePriceFilterCard from 'components/SearchFilters/SimplePriceFilterCard'
import SimpleSorterCard from 'components/SearchFilters/SimpleSorterCard'
import { NftSorter, NftSortOrder } from 'hooks/useNftPositionSort'
import { useState } from 'react'
import { NftRangeFilter } from 'hooks/useNftPositionFilter'

interface DashboardFilterContainerProps {
  onAddFilter?: (filter: NftRangeFilter, { min, max }: { min: number; max: number }) => void
  onAddSorter: (sorter: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sorter: NftSorter) => void
}

export default function DashboardFilterContainer(props: DashboardFilterContainerProps) {
  const { onAddFilter, onAddSorter, onRemoveSorter } = props

  const mobileUI = useBreakpointValue({ base: true, md: false })
  return (
    <MetalBox
      height={'75px'}
      width="full"
      justify={'center'}
      align="center"
      shadow={mobileUI ? 'up' : 'none'}
      disableMetal={!mobileUI}
      bgVariant={mobileUI ? 'dark' : 'empty'}
    >
      <Flex transform={{ base: 'scale(0.8)', md: 'scale(1)' }} gap={1}>
        <StakePoolFilterCard
          onChangeSorter={onAddSorter}
          onRemoveSorter={onRemoveSorter}
          onApplyFilters={(filterByDay) => {}}
          onResetFilters={() => {}}
        />
        <SimpleSorterCard
          title="Redeem In"
          icon="RedeemIcon"
          onChangeSorter={onAddSorter}
          sorterType={NftSorter.REDEEM}
          onRemoveSorter={onRemoveSorter}
        />
        <SimpleSorterCard
          title="Token Id"
          onChangeSorter={onAddSorter}
          sorterType={NftSorter.TOKEN_ID}
          onRemoveSorter={onRemoveSorter}
        />

        <SimplePriceFilterCard
          onChangeSorter={onAddSorter}
          onRemoveSorter={onRemoveSorter}
          onApply={onAddFilter}
          sortType={NftSorter.GAINED}
          filter={NftRangeFilter.GAINED}
          title="Gained"
        />
        <SimplePriceFilterCard
          onApply={onAddFilter}
          filter={NftRangeFilter.INITIAL}
          onChangeSorter={onAddSorter}
          onRemoveSorter={onRemoveSorter}
          sortType={NftSorter.INITIAL}
          title="Initial"
        />
      </Flex>
    </MetalBox>
  )
}
