import { ChevronDownIcon2, TokenIcon } from '@concave/icons'
import {
  Button,
  ButtonProps,
  Flex,
  Input,
  InputProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  Text,
} from '@concave/ui'
import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

export const BaseInput = (props: InputProps & NumberFormatProps) => (
  <Input
    as={NumberFormat}
    thousandSeparator
    variant="unstyled"
    placeholder="0.0"
    fontFamily="heading"
    fontWeight={700}
    fontSize={24}
    _placeholder={{ color: 'text.high' }}
    {...props}
  />
)

export const InputContainer = (props) => (
  <Flex
    mx={-5}
    px={5}
    py={3}
    maxW={400}
    h={90}
    borderRadius="2xl"
    bgGradient="linear(to-tr, secondary.150, secondary.100)"
    align="start"
    {...props}
  />
)

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

const bringToBeginning = (arr, elem) => arr.sort((x, y) => (x == elem ? -1 : y == elem ? 1 : 0))

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
        style={{
          boxShadow:
            '0px 4px 4px rgba(0, 0, 0, 0.25), inset -1px 1px 2px rgba(128, 186, 255, 0.05)',
        }}
        p={2}
        w={'115px'}
        as={Button}
        bgColor="rgba(156, 156, 156, 0.01);"
        sx={selectItemStyles}
        leftIcon={<TokenIcon size="25px" tokenName={selected} />}
        rightIcon={<ChevronDownIcon2 />}
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

export const MaxAmount = ({
  max,
  label,
  ...props
}: { max?: number; label: string } & ButtonProps) => (
  <Button
    borderRadius="full"
    py={1}
    px={3}
    gap={1}
    fontSize={12}
    fontWeight={500}
    backgroundColor="transparent"
    height="auto"
    textColor="grey.700"
    whiteSpace="nowrap"
    {...props}
  >
    <Text textColor={'text.low'}>
      {label} {max}
    </Text>
    <Text textColor={'text.highlight'}>Max</Text>
  </Button>
)
