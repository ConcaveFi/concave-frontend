import { Flex, useBreakpointValue } from '@concave/ui'
import StakePoolFilterCard from 'components/Marketplace/Filters/StakePoolFilterCard'
import { MetalBox } from 'components/MetalBox'
import SimplePriceFilterCard from 'components/SearchFilters/SimplePriceFilterCard'
import SimpleSorterCard from 'components/SearchFilters/SimpleSorterCard'
import { NftPositionDaysFilterType, NftPositionFilters } from 'hooks/useNftPositionFilter'
import { NftPositionSortType } from 'hooks/useNftPositionSort'
import { useState } from 'react'

interface DashboardFilterContainerProps {
  onChangeFilters?: (filterProps: NftPositionFilters) => void
  onChangeSorter: (sorter: NftPositionSortType) => void
  currentSorter: NftPositionSortType
  currentFilters: NftPositionFilters
}

export default function DashboardFilterContainer(props: DashboardFilterContainerProps) {
  const [dayFilterType, setDayFilterType] = useState(NftPositionDaysFilterType.NONE)
  const { onChangeFilters, onChangeSorter, currentSorter, currentFilters } = props

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
          currentSorter={currentSorter}
          onChangeSorter={onChangeSorter}
          onApplyFilters={(filterByDay) => onChangeFilters({ ...currentFilters, filterByDay })}
          onResetFilters={() =>
            onChangeFilters({ ...currentFilters, filterByDay: NftPositionDaysFilterType.NONE })
          }
        />
        <SimpleSorterCard
          title="Redeem In"
          icon="RedeemIcon"
          currentSorter={currentSorter}
          onChangeSorter={onChangeSorter}
          highestFirst={NftPositionSortType.REDEEM_HIGHEST_FIRST}
          lowestFirst={NftPositionSortType.REDEEM_LOWEST_FIRST}
        />
        <SimpleSorterCard
          title="Token Id"
          currentSorter={currentSorter}
          onChangeSorter={onChangeSorter}
          highestFirst={NftPositionSortType.TOKEN_ID_HIGHEST_FIRST}
          lowestFirst={NftPositionSortType.TOKEN_ID_LOWEST_FIRST}
        />
        <SimplePriceFilterCard
          onApplyFilter={(min, max) => onChangeFilters({ ...currentFilters, gained: { min, max } })}
          onResetFilter={() => onChangeFilters({ ...currentFilters, gained: undefined })}
          currentSorter={currentSorter}
          highestFirst={NftPositionSortType.GAINED_HIGHEST_FIRST}
          lowestFirst={NftPositionSortType.GAINED_LOWEST_FIRST}
          onChangeSorter={onChangeSorter}
          title="Gained"
        />
        <SimplePriceFilterCard
          currentSorter={currentSorter}
          onApplyFilter={(min, max) =>
            onChangeFilters({ ...currentFilters, initial: { min, max } })
          }
          onResetFilter={() => onChangeFilters({ ...currentFilters, initial: undefined })}
          highestFirst={NftPositionSortType.INITIAL_HIGHEST_FIRST}
          lowestFirst={NftPositionSortType.INITIAL_LOWEST_FIRST}
          onChangeSorter={onChangeSorter}
          title="Initial"
        />
      </Flex>
    </MetalBox>
  )
}
