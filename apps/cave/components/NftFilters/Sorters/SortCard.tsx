import { ChevronDownIcon, SortIcon } from '@concave/icons'
import { Menu, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Portal } from '@concave/ui'
import { ResponsiveMenuButton } from 'components/ResponsiveMenuButton'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { PositionFilters } from './hooks/useNftSort'

const sortTypes: { title: string; sort: keyof PositionFilters }[] = [
  { title: 'Stake pool', sort: 'STAKE_POOL' },
  { title: 'Redeem date', sort: 'REDEEM_DATE' },
  { title: 'Initial CNV', sort: 'INITIAL' },
]

const ORDERS = { Ascending: 'ASC', Descending: 'DESC' } as const

export const SortButton = () => {
  const { setSorter, sorter } = useStakeSettings()

  return (
    <Menu closeOnSelect={false}>
      <ResponsiveMenuButton leftIcon={<SortIcon />} rightIcon={<ChevronDownIcon />}>
        Sorter
      </ResponsiveMenuButton>
      <Portal>
        <MenuList minWidth="240px">
          <MenuOptionGroup value={sorter.order} title="Order" type="radio">
            {Object.entries(ORDERS).map(([key, order]) => {
              return (
                <MenuItemOption
                  key={key}
                  onClick={() => {
                    setSorter((prev) => ({ ...prev, order }))
                  }}
                  value={order}
                >
                  {key}
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup defaultValue={sortTypes[0].sort} title="Sorter" type="radio">
            {sortTypes.map((option) => {
              return (
                <MenuItemOption
                  key={option.sort}
                  value={option.sort}
                  onClick={() => {
                    setSorter((prev) => ({ ...prev, ...option }))
                  }}
                >
                  {option.title}
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
}
