
import { Box, Flex, Text } from '@concave/ui'
import { StakePoolFilterEnum } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { NftSort } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { SortCard } from 'components/NftFilters/Sorters/SortCard'

export function MarketplaceFilterContainer({
  address,
  stakeFilters,
  setAddress,
  onChangeSort,
  onChangeStakeFilters,
}: {
  address: string
  stakeFilters: StakePoolFilterEnum[]
  onChangeStakeFilters: (stakeFilters: StakePoolFilterEnum[]) => void
  setAddress: (address: string) => void
  onChangeSort: (sorter: NftSort) => void
}) {
  return (
    <Flex
      width="full"
      direction={'column'}
      bg={{ base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)', md: 'transparent' }}
      justify={'center'}
      align="center"
      rounded={'2xl'}
      position="relative"
      shadow={{ base: 'up', md: 'none' }}
    >
      <Box
        display={{ base: 'block', md: 'none' }}
        position={'absolute'}
        height="full"
        width={'full'}
        bgImage={'/assets/textures/metal.png'}
        bgSize="40% 50%"
        rounded={'2xl'}
      />
      <Flex
        rounded={'2xl'}
        py="6"
        shadow={{ base: 'up', md: 'none' }}
        width="full"
        direction={{ base: 'column', md: 'row' }}
        justify={'space-between'}
        px={4}
        gap={{ base: 4 }}
        my={2}
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
      </Flex>
    </Flex>
  )
}
