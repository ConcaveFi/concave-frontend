import { Currency } from '@concave/gemswap-sdk'
import { DownIcon } from '@concave/icons'
import { Button, ButtonProps } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useIsMounted } from 'hooks/useIsMounted'
import React from 'react'

export const SelectCurrencyButton = ({
  selected,
  onClick,
  ...props
}: ButtonProps & {
  selected: Currency
  onClick: () => void
}) => {
  const isMounted = useIsMounted()
  return (
    <Button
      variant="select"
      sx={{ ...(!selected?.symbol && { bgGradient: 'linear(to-r, primary.1, primary.2)' }) }}
      bgColor="blackAlpha.100"
      py={1.5}
      px={3}
      fontWeight="bold"
      alignSelf="end"
      fontSize="lg"
      rightIcon={!props.isDisabled && <DownIcon w="16px" />}
      leftIcon={selected?.symbol && <CurrencyIcon size="xs" currency={selected} />}
      onClick={onClick}
      {...props}
    >
      {isMounted && selected?.chainId === 3 ? 't' : ''}
      {selected?.symbol || `Select a token`}
    </Button>
  )
}
