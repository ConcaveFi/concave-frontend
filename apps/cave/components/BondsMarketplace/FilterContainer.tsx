import { Flex } from '@chakra-ui/react'
import { BondFilterButton } from './FilterButton'

export const BondFilterContainer = () => {
  return (
    <Flex>
      <Flex my={'auto'} justify={'space-between'}>
        <BondFilterButton title="Market Cap:" info="1m-20m" />
        <BondFilterButton title="Bond Value:" info="500k-5m" />
        <BondFilterButton title="Sort By:" info="ROI" />
        <BondFilterButton title="Filter:" info="" settingsIcon />
      </Flex>
    </Flex>
  )
}
