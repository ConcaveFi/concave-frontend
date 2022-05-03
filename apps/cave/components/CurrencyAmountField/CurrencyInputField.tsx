import { HStack, Text } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { Balance } from './Balance'
import { useFiatValue } from 'components/AMM/hooks/useFiatPrice'
import { CurrencyAmountField } from '../CurrencyAmountField'
import { toAmount } from 'utils/toAmount'
import { CurrencySelectorComponent } from 'components/CurrencySelector/CurrencySelector'

type CurrencyInputFieldProps = {
  currencyAmountIn: CurrencyAmount<Currency>
  onChangeAmount: (value: CurrencyAmount<Currency>) => void
  CurrencySelector: CurrencySelectorComponent
}

const MIN_FOR_GAS = '0.01'
const maxAmount = (userBalance: CurrencyAmount<Currency>) => {
  if (userBalance.currency.isNative) {
    const gasAmount = toAmount(MIN_FOR_GAS, userBalance.currency)
    return userBalance.greaterThan(gasAmount)
      ? userBalance.subtract(gasAmount)
      : toAmount('0', userBalance.currency)
  }
  return userBalance
}

export const CurrencyInputField = ({
  currencyAmountIn,
  onChangeAmount,
  CurrencySelector,
}: CurrencyInputFieldProps) => {
  const inputFiat = useFiatValue(currencyAmountIn)
  const balance = useCurrencyBalance(currencyAmountIn?.currency)

  return (
    <CurrencyAmountField
      currencyAmount={currencyAmountIn}
      onChangeAmount={onChangeAmount}
      CurrencySelector={CurrencySelector}
    >
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Text isTruncated fontWeight="bold" fontSize="sm" mr={2}>
          {!!inputFiat.value?.greaterThan(0) &&
            `$${inputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
        </Text>
        {balance.isSuccess && (
          <Balance
            value={balance.data.toFixed(2, { groupSeparator: ',' })}
            onMax={() => onChangeAmount(maxAmount(balance.data))}
          />
        )}
      </HStack>
    </CurrencyAmountField>
  )
}
