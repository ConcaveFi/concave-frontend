import {
  Button,
  FlexProps,
  HStack,
  NumericInput,
  Stack,
  Text,
  useMultiStyleConfig,
} from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useCurrencyFormatter } from 'hooks/useCurrencyFormatter'
import React from 'react'
import { useCurrencyBalance } from './hooks/useCurrencyBalance'
import { useFiatPrice } from './hooks/useFiatPrice'
import { TokenSelect } from './TokenSelect'

const Balance = ({ value, onClick }) => (
  <Button
    fontSize="xs"
    ml="auto"
    onClick={onClick}
    rightIcon={!!onClick && <Text textColor="#2E97E2">Max</Text>}
    leftIcon={<Text>Balance:</Text>}
    iconSpacing={1}
  >
    <Text isTruncated maxW="50px">
      {value}
    </Text>
  </Button>
)

export function TokenInput({
  currencyAmount,
  disabled = false,
  onChangeValue,
  onSelectCurrency,
}: {
  currencyAmount: CurrencyAmount<Currency>
  disabled?: boolean
  onChangeValue: (value: string) => void
  onSelectCurrency: (token: Currency) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })
  const currencyFormater = useCurrencyFormatter()

  const priceInFiat = useFiatPrice(currencyAmount?.currency)
  const fiatValue = priceInFiat.price?.quote(currencyAmount)

  const { data: currencyBalance } = useCurrencyBalance(currencyAmount?.currency)

  return (
    <Stack sx={{ ...styles.field, bg: 'none' }} justify="space-between" spacing={0}>
      <HStack justify="space-between" align="start">
        <NumericInput
          decimalScale={5}
          disabled={disabled}
          w="100%"
          value={currencyAmount?.toSignificant(6)}
          onValueChange={({ value }, { source }) => source === 'event' && onChangeValue(value)}
        />
        <TokenSelect onSelect={onSelectCurrency} selected={currencyAmount?.currency} />
      </HStack>
      <HStack justify="space-between" align="center" textColor="text.low" w="full">
        <Text isTruncated maxW="100px" fontWeight="bold" fontSize="sm">
          {!!fiatValue && `$${fiatValue.toFixed(2)}`}
        </Text>
        {currencyBalance && (
          <Balance
            value={currencyFormater.format(+currencyBalance.formatted)}
            onClick={() => onChangeValue(currencyBalance.formatted)}
          />
        )}
      </HStack>
    </Stack>
  )
}
