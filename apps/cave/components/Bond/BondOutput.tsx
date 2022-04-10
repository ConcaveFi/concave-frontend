import {
  Button,
  FlexProps,
  HStack,
  NumericInput,
  Stack,
  Text,
  useMultiStyleConfig,
} from '@concave/ui'
import { Currency } from '@uniswap/sdk-core'
import React from 'react'
import { BondOutputSelect } from './BondOutputSelect'

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

export function BondOutput({
  currency,
  disabled = true,
  value,
}: {
  value: string
  currency?: Currency
  disabled?: true
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} align="end" justify="space-between" spacing={0}>
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
        <BondOutputSelect selected={currency} />
      </HStack>
    </Stack>
  )
}
