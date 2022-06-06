import { Flex, useBreakpointValue } from '@concave/ui'
import StakePoolFilterCard from 'components/SearchFilters/StakePoolFilterCard'
import { MetalBox } from 'components/MetalBox'
import SimplePriceFilterCard from 'components/SearchFilters/SimplePriceFilterCard'
import SimpleSorterCard from 'components/SearchFilters/SimpleSorterCard'
import { NftPositionDaysFilterType, NftPositionFilters } from 'hooks/useNftPositionFilter'
import { NftSorter, NftSortOrder } from 'hooks/useNftPositionSort'
import { useState } from 'react'

interface DashboardFilterContainerProps {
  onChangeFilters?: (filterProps: NftPositionFilters) => void
  onAddSorter: (sorter: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sorter: NftSorter) => void
}

export default function DashboardFilterContainer(props: DashboardFilterContainerProps) {
  const { onChangeFilters, onAddSorter, onRemoveSorter } = props

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
          // onApplyFilter={(min, max) => onChangeFilters({ ...currentFilters, gained: { min, max } })}
          // onResetFilter={() => onChangeFilters({ ...currentFilters, gained: undefined })}
          onChangeSorter={onAddSorter}
          onRemoveSorter={onRemoveSorter}
          sortType={NftSorter.GAINED}
          title="Gained"
        />
        <SimplePriceFilterCard
          // onApplyFilter={(min, max) =>
          //   onChangeFilters({ ...currentFilters, initial: { min, max } })
          // }
          // onResetFilter={() => onChangeFilters({ ...currentFilters, initial: undefined })}
          onChangeSorter={onAddSorter}
          onRemoveSorter={onRemoveSorter}
          sortType={NftSorter.INITIAL}
          title="Initial"
        />
      </Flex>
    </MetalBox>
  )
}
