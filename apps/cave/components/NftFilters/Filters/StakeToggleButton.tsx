import { Flex, Text } from '@chakra-ui/react'
import { ToggleButton } from 'components/ToggleButton'
import { StakePoolFilter } from './hooks/useFilterByStakePool'
type StakeToggleButton = {
  filter: StakePoolFilter
  onEnableFilter: (filter: StakePoolFilter) => void
  onDisableFilter: (filter: StakePoolFilter) => void
}

export const StakeToggleButton: React.FC<StakeToggleButton> = ({
  filter,
  onDisableFilter,
  onEnableFilter,
}) => {
  return (
    <Flex textColor={'gray.300'} fontWeight="bold" width={'full'} justify="space-between" px={4}>
      <Text textAlign={'end'} width="70px">
        {nameByFilter[filter]}
      </Text>
      <ToggleButton
        onActivate={() => onEnableFilter(filter)}
        onDisable={() => onDisableFilter(filter)}
      />
    </Flex>
  )
}

const nameByFilter = {
  3: '45 Days',
  2: '90 Days',
  1: '180 Days',
  0: '360 Days',
}
