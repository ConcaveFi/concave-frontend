import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Flex, NumericInput, Text } from '@concave/ui'
import { InitialCNVFilter } from 'components/NftFilters/Filters/InitialCNVFilter'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { SortCard } from 'components/NftFilters/Sorters/SortCard'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useState } from 'react'

export function FilterContainer() {
  const [value, setValue] = useState<number>()
  const { tokenIdFilter, setTokenIdFilter } = useStakeSettings()
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
        <InitialCNVFilter />
        <StakePoolFilterCard />
        <Flex py={1} gap={2} shadow={'down'} flex={1} rounded="2xl" pl={3} align="center">
          <SearchIcon color={'text.low'} boxSize="18px" />
          <NumericInput
            maxW={{ base: '', lg: tokenIdFilter ? '100px' : '130px' }}
            placeholder={tokenIdFilter?.toString() || 'Enter token id'}
            onValueChange={(value) => setValue(+value.value)}
            onKeyDown={(key) => key.code === 'Enter' && setTokenIdFilter(value)}
          />
          {tokenIdFilter && (
            <CloseIcon
              onClick={() => setTokenIdFilter(undefined)}
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
        <SortCard />
      </Flex>
    </Flex>
  )
}
