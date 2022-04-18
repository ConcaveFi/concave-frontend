import {
  Button,
  FlexProps,
  HStack,
  NumericInput,
  Stack,
  Text,
  useMultiStyleConfig,
} from '@concave/ui'
import { Currency } from 'gemswap-sdk'
import React from 'react'
import { SelectCurrency } from './SelectCurrency'

const Balance = ({ value, onClick }) => (
  <Button
    fontSize="xs"
    ml="auto"
    onClick={onClick}
    // many bugs need to be resolved with this button
    // rightIcon={!!onClick && <Text textColor="#2E97E2">Max</Text>}
    leftIcon={<Text>Balance:</Text>}
    iconSpacing={1}
  >
    <Text isTruncated maxW="50px">
      {value}
    </Text>
  </Button>
)

export function BondInput({
  value,
  currency,
  balance,
  disabled = false,
  onChangeValue,
  onClickMaxBalance,
}: {
  value: string
  currency?: Currency
  balance: string
  disabled?: boolean
  onChangeValue: (value: string) => void
  onClickMaxBalance?: (value: string) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          decimalScale={5}
          disabled={disabled}
          w="100%"
          value={value}
          onValueChange={({ value }, eventSrc) =>
            eventSrc.source === 'event' && onChangeValue(value)
          }
        />
        <SelectCurrency selected={currency} onSelect={(token: Currency) => currency} />
      </HStack>
      <HStack justify="space-between" align="center" textColor="text.low" w="full">
        <Text isTruncated maxW="100px" fontWeight="bold" fontSize="sm"></Text>
        {balance && <Balance value={balance} onClick={onClickMaxBalance} />}
      </HStack>
    </Stack>
  )
}
