import { Currency, CurrencyAmount } from '@concave/core'
import { HStack, Text } from '@concave/ui'
import { useFiatValue } from 'components/AMM/hooks/useFiatPrice'
import {
  CurrencySelector as DisabledCurrencySelector,
  CurrencySelectorProps,
} from 'components/CurrencySelector/CurrencySelector'
import { ComponentType } from 'react'
import { toAmount } from 'utils/toAmount'
import { CurrencyAmountField } from '../CurrencyAmountField'
import { Balance } from './Balance'

type CurrencyInputFieldProps = {
  currencyAmountIn: CurrencyAmount<Currency>
  isCurrencyLoading?: boolean
  onChangeAmount: (value: CurrencyAmount<Currency>) => void
  CurrencySelector?: ComponentType<CurrencySelectorProps>
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
        <Balance
          currency={currencyAmountIn?.currency}
          onMax={(balance) => onChangeAmount(maxAmount(balance))}
        />
      </HStack>
    </CurrencyAmountField>
  )
}
