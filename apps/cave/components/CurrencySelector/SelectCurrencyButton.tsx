import { Currency } from '@concave/core'
import { DownIcon } from '@concave/icons'
import { Button, ButtonProps } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import React from 'react'
import { defaultChains } from 'wagmi'

export const SelectCurrencyButton = ({
  selected,
  onClick,
  ...props
}: ButtonProps & {
  selected: Currency
  onClick: () => void
}) => (
  <Button
    variant="select"
    sx={{ ...(!selected?.symbol && { bgGradient: 'linear(to-r, primary.1, primary.2)' }) }}
    bgColor="blackAlpha.100"
    py={1.5}
    px={3}
    fontWeight="bold"
    alignSelf="end"
    fontSize={{ base: '12px', md: 'lg' }}
    rightIcon={!props.isDisabled && <DownIcon w="16px" />}
    leftIcon={selected?.symbol && <CurrencyIcon size="xs" currency={selected} />}
    onClick={onClick}
    {...props}
  >
    {defaultChains.findIndex((c) => c.id === selected.chainId) ? 't' : ''}
    {selected?.symbol || `Select a token`}
  </Button>
)
