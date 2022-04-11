import { parseUnits } from '@ethersproject/units'
import { Currency, CurrencyAmount, JSBI } from 'gemswap-sdk'

// try to parse a user entered amount for a given token
export const parseInputAmount = <T extends Currency>(
  value?: string,
  currency?: T,
): CurrencyAmount<T> | undefined => {
  if (!currency) return undefined
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed))
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
}
