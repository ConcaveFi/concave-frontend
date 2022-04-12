import { Flex, HStack, Text } from '@concave/ui'
import { Balance } from './Balance'
import { useCurrencyBalance } from './hooks/useCurrencyBalance'
import { useFiatPrice } from './hooks/useFiatPrice'
import { TokenInput } from './TokenInput'
import { computeFiatValuePriceImpact } from './utils/computeFiatValuePriceImpact'

export const OutputField = ({
  currencyAmountIn,
  currencyOut,
  currencyAmountOut,
  updateOutputValue,
  updateCurrencyOut,
}) => {
  const inputFiat = useFiatPrice(currencyAmountIn?.currency.wrapped)
  const outputFiat = useFiatPrice(currencyOut.wrapped)

  const inputFiatValue = currencyAmountIn && inputFiat.price?.quote(currencyAmountIn)
  const outputFiatValue = currencyAmountOut && outputFiat.price?.quote(currencyAmountOut)

  const priceImpact = computeFiatValuePriceImpact(inputFiatValue, outputFiatValue)

  const [{ data: outputCurrencyBalance }] = useCurrencyBalance(currencyOut)

  return (
    <TokenInput
      currency={currencyOut}
      currencyAmount={currencyAmountOut}
      onChangeValue={updateOutputValue}
      onSelectCurrency={updateCurrencyOut}
    >
      <HStack justify="space-between" align="center" textColor="text.low" w="full">
        <Flex mr={2} align="center">
          <Text isTruncated fontWeight="bold" fontSize="sm" mr={1}>
            {!!outputFiatValue && `$${outputFiatValue.toFixed(2, { groupSeparator: ',' })}`}
          </Text>
          <Text fontSize="xs" opacity={0.7}>
            {priceImpact && `(${priceImpact?.toFixed(2)}%)`}{' '}
          </Text>
        </Flex>
        {outputCurrencyBalance && <Balance value={outputCurrencyBalance.formatted} />}
      </HStack>
    </TokenInput>
  )
}
