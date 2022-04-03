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
import { twoDecimals } from './SwapCard'
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
  value,
  currency,
  balance,
  stable,
  disabled = false,
  onChangeValue,
  onChangeCurrency,
  onClickMaxBalance,
}: {
  value: string
  currency?: Currency
  balance: string
  stable: string
  disabled: boolean
  onChangeValue: (value: string) => void
  onChangeCurrency: (token: Currency) => void
  onClickMaxBalance?: (value: string) => void
} & FlexProps) {
  const styles = useMultiStyleConfig('Input', { variant: 'primary', size: 'large' })
  const stableValue = +stable * +value

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
        <TokenSelect onSelect={onChangeCurrency} selected={currency} />
      </HStack>
      <HStack justify="space-between" align="center" textColor="text.low" w="full">
        <Text isTruncated maxW="100px" fontWeight="bold" fontSize="sm">
          {!!+stableValue && `$${twoDecimals(stableValue)}`}
        </Text>
        {balance && <Balance value={balance} onClick={onClickMaxBalance} />}
      </HStack>
    </Stack>
  )
}
