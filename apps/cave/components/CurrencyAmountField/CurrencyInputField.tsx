import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { HStack, Text } from '@concave/ui'
import { useFiatValue } from 'components/AMM/hooks/useFiatPrice'
import {
  CurrencySelectorComponent,
  CurrencySelector as DisabledCurrencySelector,
} from 'components/CurrencySelector/CurrencySelector'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { toAmount } from 'utils/toAmount'
import { CurrencyAmountField } from '../CurrencyAmountField'
import { Balance } from './Balance'
import { truncateNumber } from 'utils/truncateNumber'

type CurrencyInputFieldProps = {
  currencyAmountIn: CurrencyAmount<Currency>
  onChangeAmount: (value: CurrencyAmount<Currency>) => void
  CurrencySelector?: CurrencySelectorComponent
  debounce?: number
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
  CurrencySelector = DisabledCurrencySelector,
  debounce,
}: CurrencyInputFieldProps) => {
  const inputFiat = useFiatValue(currencyAmountIn)
  const balance = useCurrencyBalance(currencyAmountIn?.currency, { watch: true })

  return (
    <CurrencyAmountField
      currencyAmount={currencyAmountIn}
      onChangeAmount={onChangeAmount}
      CurrencySelector={CurrencySelector}
      debounce={debounce}
    >
      <HStack justify="space-between" align="end" textColor="text.low" w="full">
        <Text noOfLines={1} fontWeight="bold" fontSize="sm" mr={2}>
          {!!inputFiat.value?.greaterThan(0) &&
            `$${inputFiat.value.toFixed(2, { groupSeparator: ',' })}`}
        </Text>
        {balance.isSuccess && (
          <Balance
            value={truncateNumber(balance?.data?.numerator,2)}
            onMax={() => onChangeAmount(maxAmount(balance.data))}
          />
        )}
      </HStack>
    </CurrencyAmountField>
  )
}
