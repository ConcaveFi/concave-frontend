import { Flex, Text, useBreakpointValue } from '@concave/ui'
import { MetalBox } from 'components/MetalBox'
import { InitialFilter } from 'components/NftFilters/Filters/InitialFilter'
import { RedeemDateFilter } from 'components/NftFilters/Filters/RedeemDateFilter'
import { StakePoolFilter } from 'components/NftFilters/Filters/StakePoolFilter'
import { SorterCard } from 'components/NftFilters/Sorters/SorterCard'

interface FilterContainerProps {}

export function FilterContainer(props: FilterContainerProps) {
  const mobileUI = useBreakpointValue({ base: true, md: false })
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
            <StakePoolFilter />
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
