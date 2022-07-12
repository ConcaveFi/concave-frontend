import { Flex, Text } from '@chakra-ui/react'
import { ToggleButton } from 'components/ToggleButton'
import { poolIdToDays } from 'utils/contants'
import { StakePoolFilterEnum } from './hooks/useFilterByStakePool'
type StakeToggleButton = {
  filter: StakePoolFilterEnum
  enabled: boolean
  onEnableFilter: (filter: StakePoolFilterEnum) => void
  onDisableFilter: (filter: StakePoolFilterEnum) => void
}

export const StakeToggleButton: React.FC<StakeToggleButton> = ({
  filter,
  enabled,
  onDisableFilter,
  onEnableFilter,
}) => {
  return (
    <Flex textColor={'white'} fontWeight="bold" width={'full'} justify="space-between" px={4}>
      <Text textAlign={'end'} width="70px">
        {poolIdToDays[filter] + ' days'}
      </Text>
      <ToggleButton
        enabled={enabled}
        onToggle={(enabled) => {
          if (enabled) onEnableFilter(filter)
          else onDisableFilter(filter)
        }}
      />
    </Flex>
  )
}
