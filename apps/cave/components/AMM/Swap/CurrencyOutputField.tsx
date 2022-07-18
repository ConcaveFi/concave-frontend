import { Currency, CurrencyAmount, Percent } from '@concave/core'
import { Flex, HStack, Text } from '@concave/ui'
import { CurrencyAmountField } from 'components/CurrencyAmountField'
import { Balance } from 'components/CurrencyAmountField/Balance'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { useFiatValue } from '../hooks/useFiatPrice'
import { PriceImpact } from './PriceImpact'

type CurrencyOutputFieldProps = {
  currencyAmountOut: CurrencyAmount<Currency>
  priceImpact: Percent
  updateOutputValue: (value: CurrencyAmount<Currency>) => void
}

const _01 = new Percent(1, 10000) // 0.01%

export const CurrencyOutputField = ({
  currencyAmountOut,
  updateOutputValue,
  priceImpact,
}: CurrencyOutputFieldProps) => {
  const outputFiat = useFiatValue(currencyAmountOut)

  return (
    <CurrencyAmountField
      currencyAmount={currencyAmountOut}
      onChangeAmount={updateOutputValue}
      CurrencySelector={SelectAMMCurrency}
    >
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Flex mr={2} align="center">
          <Text noOfLines={1} fontWeight="bold" fontSize="sm" mr={1}>
            {!!outputFiat.value?.greaterThan(0) &&
              `$${outputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
          </Text>
          <>
            {(priceImpact?.greaterThan(_01) || priceImpact?.lessThan(_01.multiply(-1))) && (
              <PriceImpact fontSize={'sm'} opacity={0.5} priceImpact={priceImpact} />
            )}
          </>
        </Flex>
        <Balance currency={currencyAmountOut?.currency} />
      </HStack>
    </CurrencyAmountField>
  )
}
