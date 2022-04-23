import { HStack, Text } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { Balance } from './Balance'
import { useCurrencyBalance } from './hooks/useCurrencyBalance'
import { useFiatPrice } from './hooks/useFiatPrice'
import { TokenInput } from './TokenInput'

type InputFieldProps = {
  currencyIn: Currency
  currencyAmountIn: CurrencyAmount<Currency>
  updateInputValue: (value: string) => void
  updateCurrencyIn: (currency: Currency) => void
}

export const InputField = ({
  currencyIn,
  currencyAmountIn,
  updateInputValue,
  updateCurrencyIn,
}: InputFieldProps) => {
  const inputFiat = useFiatPrice(currencyIn.wrapped)
  const inputFiatValue = currencyAmountIn && inputFiat.price?.quote(currencyAmountIn)
  const balance = useCurrencyBalance(currencyIn)

  return (
    <TokenInput
      currency={currencyIn}
      currencyAmount={currencyAmountIn}
      onChangeValue={updateInputValue}
      onSelectCurrency={updateCurrencyIn}
    >
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Text isTruncated fontWeight="bold" fontSize="sm" mr={2}>
          {!!inputFiatValue && `$${inputFiatValue.toFixed(2, { groupSeparator: ',' })}`}
        </Text>
        {balance.isSuccess && (
          <Balance
            value={balance.data.formatted}
            onClick={() => updateInputValue(balance.data.formatted)}
          />
        )}
      </HStack>
    </TokenInput>
  )
}
