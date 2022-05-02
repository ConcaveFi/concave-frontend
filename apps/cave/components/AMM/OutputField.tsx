import { Flex, HStack, Text } from '@concave/ui'
import { Currency, CurrencyAmount, Fraction, Percent } from 'gemswap-sdk'
import { Balance } from './Balance'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useFiatValue } from './hooks/useFiatPrice'
import { CurrencyAmountField } from './CurrencyAmountField'
import { computeFiatValuePriceImpact } from './utils/computeFiatValuePriceImpact'

type OutputFieldProps = {
  currencyAmountIn: CurrencyAmount<Currency>
  currencyAmountOut: CurrencyAmount<Currency>
  updateOutputValue: (value: CurrencyAmount<Currency>) => void
}

const _01 = new Percent(1, 10000) // 0.01%

export const OutputField = ({
  currencyAmountIn,
  currencyAmountOut,
  updateOutputValue,
}: OutputFieldProps) => {
  const inputFiat = useFiatValue(currencyAmountIn)
  const outputFiat = useFiatValue(currencyAmountOut)

  const fiatPriceImpact = computeFiatValuePriceImpact(inputFiat.value, outputFiat.value)

  const balance = useCurrencyBalance(currencyAmountOut?.currency)

  return (
    <CurrencyAmountField currencyAmount={currencyAmountOut} onChangeAmount={updateOutputValue}>
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Flex mr={2} align="center">
          <Text isTruncated fontWeight="bold" fontSize="sm" mr={1}>
            {!!outputFiat.value?.greaterThan(0) &&
              `$${outputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
          </Text>
          <Text fontSize="xs" opacity={0.7}>
            {fiatPriceImpact?.greaterThan(_01) ||
              (fiatPriceImpact?.lessThan(_01.multiply(-1)) &&
                `(${fiatPriceImpact?.toFixed(2, { groupSeparator: ',' })}%)`)}{' '}
          </Text>
        </Flex>
        {balance.isSuccess && <Balance value={balance.data.formatted} />}
      </HStack>
    </CurrencyAmountField>
  )
}
