import { Button, Menu, MenuButton, MenuItem, MenuList } from '@concave/ui'
import { SnapshotOptions } from './SnapshotOptions'

export function DashboardNavMenu({ currentSnapshot, changeSnapshot }) {
  return (
    <Menu matchWidth>
      <MenuButton
        rounded={'3xl'}
        as={Button}
        w="full"
        h="60px"
        fontSize={'xl'}
        shadow={'up'}
        bg="bg.primary"
      >
        {currentSnapshot}
      </MenuButton>
      <MenuList zIndex={100}>
        {Object.values(SnapshotOptions).map((option) => (
          <MenuItem
            key={option}
            justifyContent="center"
            fontSize={'xl'}
            fontWeight="semibold"
            textColor={'text.low'}
            _hover={{ textColor: 'white' }}
            transition="all .4s ease-out"
            onClick={() => changeSnapshot(option)}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

const navList = ['Liquid Staking', 'Dynamic Bonds', 'Marketplace', 'AMM', 'Delta Neutral']
