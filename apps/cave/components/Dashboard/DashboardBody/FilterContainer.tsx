import { Flex, Text, useBreakpointValue } from '@concave/ui'
import { MetalBox } from 'components/MetalBox'
import { StakePoolFilter } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { InitialFilter } from 'components/NftFilters/Filters/InitialFilter'
import { RedeemDateFilter } from 'components/NftFilters/Filters/RedeemDateFilter'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { SorterCard } from 'components/NftFilters/Sorters/SorterCard'
import { useState } from 'react'

interface FilterContainerProps {
  onEnableFilter: (filter: StakePoolFilter) => void
  onDisableFilter: (filter: StakePoolFilter) => void
}

export function FilterContainer({ onDisableFilter, onEnableFilter }: FilterContainerProps) {
  const mobileUI = useBreakpointValue({ base: true, md: false })
  const [stakeFilters, setStakeFilters] = useState([])

  return (
    <MetalBox
      height={'45px'}
      width="full"
      justify={'center'}
      align="center"
      shadow={mobileUI ? 'up' : 'none'}
      disableMetal={!mobileUI}
      bgVariant={mobileUI ? 'dark' : 'empty'}
      my={2}
    >
      <Flex zIndex={2} justify="space-around" width={'full'}>
        <Flex align="center " gap={2}>
          <Text fontWeight={'bold'} textColor="text.low">
            Filter by:
          </Text>
          <Flex gap={3}>
            <RedeemDateFilter />
            <InitialFilter />
            <StakePoolFilterCard
              onDisableFilter={onDisableFilter}
              onEnableFilter={onEnableFilter}
            />
          </Flex>
        </Flex>
        <Flex align={'center'} gap={2}>
          <Text fontWeight={'bold'} textColor="text.low">
            Sorter by:
          </Text>
          <SorterCard />
        </Flex>
      </Flex>
    </MetalBox>
  )
}
