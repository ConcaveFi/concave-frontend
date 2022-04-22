import { Flex, HStack, Text } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { Balance } from './Balance'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useFiatPrice } from './hooks/useFiatPrice'
import { TokenInput } from './TokenInput'
import { computeFiatValuePriceImpact } from './utils/computeFiatValuePriceImpact'

type OutputFieldProps = {
  currencyOut: Currency
  currencyAmountIn: CurrencyAmount<Currency>
  currencyAmountOut: CurrencyAmount<Currency>
  updateOutputValue: (value: string) => void
  updateCurrencyOut: (currency: Currency) => void
}

export const OutputField = ({
  currencyAmountIn,
  currencyOut,
  currencyAmountOut,
  updateOutputValue,
  updateCurrencyOut,
}: OutputFieldProps) => {
  const inputFiat = useFiatPrice(currencyAmountIn?.currency.wrapped)
  const outputFiat = useFiatPrice(currencyOut.wrapped)

  const inputFiatValue = currencyAmountIn && inputFiat.price?.quote(currencyAmountIn)
  const outputFiatValue = currencyAmountOut && outputFiat.price?.quote(currencyAmountOut)

  const fiatPriceImpact = computeFiatValuePriceImpact(inputFiatValue, outputFiatValue)

  const balance = useCurrencyBalance(currencyOut)

  return (
    <TokenInput
      currency={currencyOut}
      currencyAmount={currencyAmountOut}
      onChangeValue={updateOutputValue}
      onSelectCurrency={updateCurrencyOut}
    >
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Flex mr={2} align="center">
          <Text isTruncated fontWeight="bold" fontSize="sm" mr={1}>
            {!!outputFiatValue && `$${outputFiatValue.toFixed(2, { groupSeparator: ',' })}`}
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
