// import { Currency, CurrencyAmount, Fraction, Price } from 'gemswap-sdk'
import { Currency, CurrencyAmount, Fraction, Price } from 'gemswap-sdk'
import JSBI from 'jsbi'

export function formatCurrencyAmount(
  amount: CurrencyAmount<Currency> | Price<Currency, Currency>,
  sigFigs: number,
  fixedDecimals?: number,
): string {
  if (!amount) return '-'
  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) return '0'

  if (parseFloat(amount.toFixed(sigFigs)) < 0.0001) return `<0.00001`

  return parseFloat(amount.toSignificant(sigFigs)).toFixed(fixedDecimals)
}
