import { Flex, Text } from '@concave/ui'
import { StakingPool, stakingPools } from '@concave/marketplace'
import { ToggleButton } from 'components/ToggleButton'
type StakeToggleButton = {
  filter: StakingPool
  enabled: boolean
  onEnableFilter: (filter: StakingPool) => void
  onDisableFilter: (filter: StakingPool) => void
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
        {filter.days + ' days'}
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
