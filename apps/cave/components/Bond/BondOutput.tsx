import { Currency } from '@concave/core'
import { FlexProps, HStack, NumericInput, Stack, useMultiStyleConfig } from '@concave/ui'
import { SelectCurrencyButton } from 'components/CurrencySelector/SelectCurrencyButton'

export function BondOutput({
  currency,
  disabled = true,
  value,
}: {
  value: string
  currency?: Currency
  disabled?: true
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', {
    variant: 'primary',
    size: 'large',
  })

  return (
    <Stack
      sx={{ ...styles.field, bg: 'none', shadow: 'Up Big' }}
      align="end"
      justify="space-between"
      spacing={0}
    >
      <HStack justify="space-between" align="start">
        <NumericInput decimalScale={5} disabled={disabled} w="100%" value={value} />
        <SelectCurrencyButton selected={currency} onClick={() => null} isDisabled />
      </HStack>
    </Stack>
  )
}
