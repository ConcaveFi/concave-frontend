import { ChevronDownIcon } from '@concave/icons'
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
  Stack,
  Text,
} from '@concave/ui'
import Image from 'next/image'
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
    <TokenIcon tokenName={name} />
    <Text ml={2}>{name.toUpperCase()}</Text>
  </MenuItem>
)

const TokenIcon = ({ tokenName }: { tokenName: string }) => (
  <Image src={`/assets/tokens/${tokenName}.svg`} width="18px" height="18px" alt="" />
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
        as={Button}
        bgColor="whiteAlpha.50"
        sx={selectItemStyles}
        leftIcon={<TokenIcon tokenName={selected} />}
        rightIcon={<ChevronDownIcon />}
      >
        {selected.toUpperCase()}
      </MenuButton>
      <MenuList bg="green.500" borderRadius="2xl" minW="min" px={1}>
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
}: { max: number; label: string } & ButtonProps) => (
  <Button
    borderRadius="full"
    py={1}
    px={3}
    bgColor="whiteAlpha.50"
    gap={1}
    fontSize={12}
    fontWeight={500}
    height="auto"
    textColor="grey.700"
    whiteSpace="nowrap"
    {...props}
  >
    {label}: {max}
    <Text textColor={'text.highlight'}>Max</Text>
  </Button>
)

export const ValueEstimation = ({ tokenName, estimationAmount }) => {
  const currency = 'usd'
  // useCurrency() or something like that
  // useFormatCurrency (??) could be cool
  return (
    <Stack align="end" fontWeight={600}>
      <Text fontSize={24}>{tokenName}</Text>
      <Text fontSize={14} color="grey.700">
        ~${estimationAmount[currency]}
      </Text>
    </Stack>
  )
}
