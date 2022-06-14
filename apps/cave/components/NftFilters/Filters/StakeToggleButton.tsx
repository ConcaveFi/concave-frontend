import { Flex, Text } from '@chakra-ui/react'
import { ToggleButton } from 'components/ToggleButton'
import { StakePoolFilter } from './hooks/useFilterByStakePool'
type StakeToggleButton = {
  filter: StakePoolFilter
}

export const StakeToggleButton: React.FC<StakeToggleButton> = ({ filter }) => {
  console.log(filter)

  return (
    <Flex textColor={'gray.300'} fontWeight="bold" width={'full'} justify="space-between" px={4}>
      <Text textAlign={'end'} width="70px">
        {nameByFilter[filter]}
      </Text>
      <ToggleButton onActivate={() => {}} onDisable={() => {}} />
    </Flex>
  )
}

const nameByFilter = {
  3: '45 Days',
  2: '90 Days',
  1: '180 Days',
  0: '360 Days',
}
