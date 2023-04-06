import { ChevronDownIcon, FilterIcon } from '@concave/icons'
import { StakingPool, stakingPools } from '@concave/marketplace'
import {
  Menu,
  Image,
  MenuList,
  Portal,
  MenuOptionGroup,
  MenuItemOption,
  HStack,
  Text,
} from '@concave/ui'
import { ResponsiveMenuButton } from 'components/ResponsiveMenuButton'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { poolImages } from 'utils/poolImages'

export const StakePoolFilterCard = () => {
  const { stakePoolFilters, tooglePoolFilter } = useStakeSettings()

  return (
    <Menu closeOnSelect={false}>
      <ResponsiveMenuButton leftIcon={<FilterIcon />} rightIcon={<ChevronDownIcon />}>
        Filters
      </ResponsiveMenuButton>
      <Portal>
        <MenuList minWidth="240px">
          <MenuOptionGroup
            value={[...stakePoolFilters.keys()].map((i) => i.toString())}
            type="checkbox"
          >
            {Object.values(stakingPools).map((item, i) => {
              const key = item.poolId.toString()
              if (item.poolId === undefined) return <></>
              return (
                <MenuItemOption key={key} value={key} minH="48px">
                  <HStack onClick={() => tooglePoolFilter(item.poolId)}>
                    <Image
                      boxSize="2rem"
                      src={`/assets/marketplace/${poolImages[item.poolId]}`}
                      alt={`${item.days} days`}
                    />
                    <Text>{item.days} days</Text>
                  </HStack>
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
}
