import { Flex, HStack, Text } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { Balance } from './Balance'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useFiatPrice, useFiatValue } from './hooks/useFiatPrice'
import { TokenInput } from './TokenInput'
import { computeFiatValuePriceImpact } from './utils/computeFiatValuePriceImpact'

type OutputFieldProps = {
  currencyOut: Currency
  currencyAmountIn: CurrencyAmount<Currency>
  currencyAmountOut: CurrencyAmount<Currency>
  updateOutputValue: (value: CurrencyAmount<Currency>) => void
  updateCurrencyOut: (currency: Currency) => void
}

export const OutputField = ({
  currencyAmountIn,
  currencyOut,
  currencyAmountOut,
  updateOutputValue,
  updateCurrencyOut,
}: OutputFieldProps) => {
  const inputFiat = useFiatValue(currencyAmountIn)
  const outputFiat = useFiatValue(currencyAmountOut)

  const fiatPriceImpact = computeFiatValuePriceImpact(inputFiat.value, outputFiat.value)

  const balance = useCurrencyBalance(currencyOut)

  return (
    <TokenInput
      currency={currencyOut}
      currencyAmount={currencyAmountOut}
      onChangeAmount={updateOutputValue}
      onSelectCurrency={updateCurrencyOut}
    >
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Flex mr={2} align="center">
          <Text isTruncated fontWeight="bold" fontSize="sm" mr={1}>
            {!!outputFiat.value && `$${outputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
          </Text>
          <Text fontSize="xs" opacity={0.7}>
            {fiatPriceImpact && `(${fiatPriceImpact?.toFixed(2)}%)`}{' '}
          </Text>
        </Flex>
        {balance.isSuccess && <Balance value={balance.data.formatted} />}
      </HStack>
    </TokenInput>
  )
}
