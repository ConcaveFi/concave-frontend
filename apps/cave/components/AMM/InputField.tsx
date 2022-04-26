import { HStack, Text } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { Balance } from './Balance'
import { useFiatValue } from './hooks/useFiatPrice'
import { TokenInput } from './TokenInput'
import { parseInputAmount } from './utils/parseInputAmount'

type InputFieldProps = {
  currencyIn: Currency
  currencyAmountIn: CurrencyAmount<Currency>
  updateInputValue: (value: CurrencyAmount<Currency>) => void
  updateCurrencyIn: (currency: Currency) => void
}

export const InputField = ({
  currencyIn,
  currencyAmountIn,
  updateInputValue,
  updateCurrencyIn,
}: InputFieldProps) => {
  const inputFiat = useFiatValue(currencyAmountIn)
  const balance = useCurrencyBalance(currencyIn)
  const isEqual = inputFiat.price?.baseCurrency['address'] === currencyAmountIn?.currency['address']
  let inputFiatValue
  try {
    inputFiatValue = currencyAmountIn && !isEqual && inputFiat.price?.quote(currencyAmountIn)
  } catch (e) {
    console.log(currencyAmountIn.currency)
    console.log(currencyAmountIn.currency)
    console.error(e)
  }

  return (
    <TokenInput
      currency={currencyIn}
      currencyAmount={currencyAmountIn}
      onChangeAmount={updateInputValue}
      onSelectCurrency={updateCurrencyIn}
    >
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Text isTruncated fontWeight="bold" fontSize="sm" mr={2}>
          {!!inputFiat.value && `$${inputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
        </Text>
        {balance.isSuccess && (
          <Balance
            value={balance.data.formatted}
            onClick={() => updateInputValue(parseInputAmount(balance.data.formatted, currencyIn))}
          />
        )}
      </HStack>
    </TokenInput>
  )
}
