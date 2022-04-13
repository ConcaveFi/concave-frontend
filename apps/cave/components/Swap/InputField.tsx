import { HStack, Text } from '@concave/ui'
import { useCurrencyBalance } from './hooks/useCurrencyBalance'
import { useFiatPrice } from './hooks/useFiatPrice'
import { Balance } from './Balance'
import { TokenInput } from './TokenInput'

export const InputField = ({
  currencyIn,
  currencyAmountIn,
  updateInputValue,
  updateCurrencyIn,
}) => {
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
      <HStack justify="space-between" align="center" textColor="text.low" w="full">
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
