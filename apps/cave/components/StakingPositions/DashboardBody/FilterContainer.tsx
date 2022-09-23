import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Flex, NumericInput, Text } from '@concave/ui'
import { RangeFilter } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { StakePoolFilterEnum } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { InitialCNVFilter } from 'components/NftFilters/Filters/InitialCNVFilter'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { SortCard } from 'components/NftFilters/Sorters/SortCard'
import { useState } from 'react'

interface FilterContainerProps {
  onChangeInitialCNVFilter: (rangeFilter?: RangeFilter) => void
  onResetStakeFilters: (filters: StakePoolFilterEnum[]) => void
  onChangeSort: (sorter: NftSort) => void
  onToggleStakeFilter: (filter: StakePoolFilterEnum, type: 'enable' | 'disable') => void
  onChangeTokenIdFilter: (filter: number) => void
  tokenIdFilter: number
  stakePoolFilters: StakePoolFilterEnum[]
  currentInitalCNVFilter: RangeFilter
}

export function FilterContainer({
  onChangeInitialCNVFilter,
  onToggleStakeFilter,
  onChangeSort,
  onResetStakeFilters,
  onChangeTokenIdFilter,
  stakePoolFilters,
  currentInitalCNVFilter,
  tokenIdFilter,
}: FilterContainerProps) {
  const [value, setValue] = useState<number>()
  return (
    <Flex
      rounded={'2xl'}
      width="full"
      direction={{ base: 'column-reverse', md: 'row-reverse' }}
      justify={'space-between'}
      px={4}
      gap={{ base: 4 }}
      mt={4}
      mb={2}
    >
      <Flex align="center " gap={2} fontWeight={'bold'} wrap="wrap">
        <Text textColor="text.low">Filter by:</Text>
        {/* <RedeemDateFilter /> */}
        <InitialCNVFilter
          currentFilter={currentInitalCNVFilter}
          onResetFilter={() => onChangeInitialCNVFilter({})}
          onApplyFilter={onChangeInitialCNVFilter}
        />
        <StakePoolFilterCard
          onResetFilter={onResetStakeFilters}
          stakePoolFilters={stakePoolFilters}
          onDisableFilter={(filter) => onToggleStakeFilter(filter, 'disable')}
          onEnableFilter={(filter) => onToggleStakeFilter(filter, 'enable')}
        />
        <Flex py={1} gap={2} shadow={'down'} flex={1} rounded="2xl" pl={3} align="center">
          <SearchIcon color={'text.low'} boxSize="18px" />
          <NumericInput
            maxW={{ base: '', lg: tokenIdFilter ? '100px' : '130px' }}
            placeholder={tokenIdFilter?.toString() || 'Enter token id'}
            onValueChange={(value) => setValue(+value.value)}
            onKeyDown={(key) => {
              if (key.code !== 'Enter') return
              onChangeTokenIdFilter(value)
            }}
          />
          {tokenIdFilter && (
            <CloseIcon
              onClick={() => {
                onChangeTokenIdFilter(undefined)
              }}
              cursor="pointer"
              mt={1}
              color="red.400"
              boxSize={'12px'}
              mr={3}
            />
          )}
        </Flex>
      </Flex>
      <Flex ml={2} align={'center'} gap={2} fontWeight={'bold'}>
        <Text textColor="text.low">Sort by:</Text>
        <SortCard onChangeSort={onChangeSort} />
      </Flex>
    </Flex>
  )
}
