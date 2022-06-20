import { Currency, CurrencyAmount, JSBI, Percent } from '@concave/core'

export const ONE_HUNDRED_PERCENT = new Percent('1')

export function percentDifference(
  amount0: CurrencyAmount<Currency> | undefined | null,
  amount1: CurrencyAmount<Currency> | undefined | null,
): Percent | undefined {
  if (!amount0 || !amount1) return undefined
  if (JSBI.equal(amount0.quotient, JSBI.BigInt(0))) return undefined
  const pct = ONE_HUNDRED_PERCENT.subtract(amount1.divide(amount0))
  return new Percent(pct.numerator, pct.denominator).multiply(-1)
}
