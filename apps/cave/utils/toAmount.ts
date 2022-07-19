import { Currency, CurrencyAmount, JSBI } from '@concave/core'
import { parseUnits } from '@ethersproject/units'

// try to parse a user entered amount for a given token
export const toAmount = <T extends Currency>(
  value: string | number = 0,
  currency: T,
): CurrencyAmount<T> | undefined => {
  if (!currency) return undefined
  try {
    if (!value) return CurrencyAmount.fromRawAmount(currency, 0)
    const typedValueParsed = parseUnits(value.toString(), currency.decimals).toString()
    return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed))
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    return CurrencyAmount.fromRawAmount(currency, 0)
  }
}
