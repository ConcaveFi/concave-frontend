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
        />
        <BondOutputSelect selected={currency} />
      </HStack>
    </Stack>
  )
}
