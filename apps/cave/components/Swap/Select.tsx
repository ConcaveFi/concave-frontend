import { DownIcon, TokenIcon } from '@concave/icons'
import { Button, Menu, MenuButton, MenuItem, MenuItemProps, MenuList, Text } from '@concave/ui'
import React from 'react'

const selectItemStyles = {
  borderRadius: 'full',
  py: 2,
  px: 3,
  height: 'auto',
  fontWeight: 600,
}

const SelectItem = ({ name, ...props }: { name: string } & MenuItemProps) => (
  <MenuItem sx={selectItemStyles} {...props}>
    <TokenIcon size={'25px'} tokenName={name} />
    <Text ml={2}>{name}</Text>
  </MenuItem>
)

const bringToBeginning = (arr: string[], elem: string) =>
  arr.sort((x, y) => (x == elem ? -1 : y == elem ? 1 : 0))

export const Select = ({
  tokens,
  selected,
  onSelect,
}: {
  tokens: string[]
  selected: typeof tokens[number]
  onSelect: (tokenName: string) => void
}) => {
  return (
    <Menu placement="bottom-end" autoSelect>
      <MenuButton
        boxShadow={'outsideDown'}
        _focus={{ boxShadow: 'outsideDown' }}
        p={2}
        w={'115px'}
        as={Button}
        bgColor="rgba(156, 156, 156, 0.01);"
        sx={selectItemStyles}
        leftIcon={<TokenIcon size="25px" tokenName={selected} />}
        rightIcon={<DownIcon />}
      >
        {selected}
      </MenuButton>
      <MenuList borderRadius="2xl" minW="min" px={1}>
        {bringToBeginning(tokens, selected).map((name) => (
          <SelectItem key={name} name={name} onClick={() => onSelect(name)} />
        ))}
      </MenuList>
    </Menu>
  )
}
