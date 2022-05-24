import { JSBI } from '@concave/gemswap-sdk'
import { UseCurrencyBalanceData } from 'hooks/useCurrencyBalance'

export const truncateNumber = (valueToTruncate: number | UseCurrencyBalanceData | JSBI) => {
  const truncatedBalance = parseFloat(
    (+valueToTruncate.toString() / 10 ** 18).toString().match(/^-?\d+(?:.\d{0,2})?/)[0],
  ).toLocaleString()

  return truncatedBalance
}
