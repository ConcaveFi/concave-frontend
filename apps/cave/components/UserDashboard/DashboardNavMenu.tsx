import { Button, Menu, MenuButton, MenuItem, MenuList } from '@concave/ui'
import { SnapshotOptions } from './SnapshotOptions'

export function DashboardNavMenu({ currentSnapshot, changeSnapshot }) {
  return (
    <Menu matchWidth>
      <MenuButton rounded={'3xl'} w="full" h="60px" fontSize={'xl'} shadow={'up'} bg="bg.primary">
        {currentSnapshot.replace('-', ' ')}
      </MenuButton>
      <MenuList zIndex={100}>
        {Object.values(SnapshotOptions).map((option) => (
          <MenuItem
            key={option}
            justifyContent="center"
            fontSize={'xl'}
            fontWeight="semibold"
            textColor={'text.low'}
            transition="all .4s ease-out"
            onClick={() => changeSnapshot(option)}
          >
            {option.replace('-', ' ')}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

const navList = ['Liquid Staking', 'Dynamic Bonds', 'Marketplace', 'AMM', 'Delta Neutral']
