import { parseUnits } from '@ethersproject/units'
import { Currency, CurrencyAmount, JSBI } from 'c-sdk'

// try to parse a user entered amount for a given token
export const tryParseAmount = <T extends Currency>(
  value?: string,
  currency?: T,
): CurrencyAmount<T> | undefined => {
  if (!value || !currency) return undefined
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0')
      return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed))
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
}
