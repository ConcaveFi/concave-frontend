import { Flex, useBreakpointValue } from '@concave/ui'
import { MetalBox } from 'components/MetalBox'
import { NftRangeFilter } from 'components/NftFilters/hooks/useNftFilter'
import { NftSorter, NftSortOrder } from 'components/NftFilters/hooks/useNftSort'
import PriceFilterCard from 'components/NftFilters/PriceFilterCard'
import SorterCard from 'components/NftFilters/SorterCard'
import StakePoolFilterCard from 'components/NftFilters/StakePoolFilterCard'

type NewType = NftSorter

interface FilterContainerProps {
  onAddFilter?: (filter: NftRangeFilter, { min, max }: { min: number; max: number }) => void
  onAddSorter: (sorter: NftSorter, order: NftSortOrder) => void
  onRemoveSorter: (sorter: NewType) => void
}

export default function FilterContainer(props: FilterContainerProps) {
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
      my={2}
    >
      <Flex transform={{ base: 'scale(0.8)', md: 'scale(1)' }} gap={1}>
        <StakePoolFilterCard
          onChangeSorter={onAddSorter}
          onRemoveSorter={onRemoveSorter}
          onApplyFilters={(filterByDay) => {}}
          onResetFilters={() => {}}
        />
        <SorterCard
          title="Redeem In"
          icon="RedeemIcon"
          onChangeSorter={onAddSorter}
          sorterType={NftSorter.REDEEM}
          onRemoveSorter={onRemoveSorter}
        />
        <SorterCard
          title="Token Id"
          onChangeSorter={onAddSorter}
          sorterType={NftSorter.TOKEN_ID}
          onRemoveSorter={onRemoveSorter}
        />

        <PriceFilterCard
          onChangeSorter={onAddSorter}
          onRemoveSorter={onRemoveSorter}
          onApply={onAddFilter}
          sortType={NftSorter.GAINED}
          filter={NftRangeFilter.GAINED}
          title="Gained"
        />
        <PriceFilterCard
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
