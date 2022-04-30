import { HStack, Text } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { Balance } from './Balance'
import { useFiatValue } from './hooks/useFiatPrice'
import { CurrencyAmountField } from './CurrencyAmountField'
import { parseAmount } from './utils/parseAmount'

type InputFieldProps = {
  currencyAmountIn: CurrencyAmount<Currency>
  onChangeAmount: (value: CurrencyAmount<Currency>) => void
}

export const InputField = ({ currencyAmountIn, onChangeAmount }: InputFieldProps) => {
  const inputFiat = useFiatValue(currencyAmountIn)
  const balance = useCurrencyBalance(currencyAmountIn?.currency)

  return (
    <CurrencyAmountField currencyAmount={currencyAmountIn} onChangeAmount={onChangeAmount}>
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Text isTruncated fontWeight="bold" fontSize="sm" mr={2}>
          {!!inputFiat.value?.greaterThan(0) &&
            `$${inputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
        </Text>
        {balance.isSuccess && (
          <Balance
            value={balance.data.formatted}
            onClick={() =>
              onChangeAmount(parseAmount(balance.data.formatted, currencyAmountIn.currency))
            }
          />
        )}
      </HStack>
    </CurrencyAmountField>
  )
}
