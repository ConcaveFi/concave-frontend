import { JSBI } from '@concave/gemswap-sdk'
import { useCurrencyBalance, UseCurrencyBalanceData } from 'hooks/useCurrencyBalance'

export const truncateNumber = (
  valueToTruncate: number | UseCurrencyBalanceData | JSBI,
  decimal?: number,
) => {
  let decimalPlaces = decimal || 2
  let value = (Number(valueToTruncate.toString()) / 10 ** 18).toString()

  const pointIndex = value.indexOf('.')

  let trunctNum = value
    .slice(0, pointIndex > -1 ? decimalPlaces + pointIndex + 1 : undefined)
    .toLocaleString()
  const countAfterDecimal = pointIndex > -1 ? trunctNum.substring(pointIndex).length : 0

  if (decimalPlaces >= countAfterDecimal) {
    const padLength =
      pointIndex > -1 ? trunctNum.length - countAfterDecimal + decimalPlaces + 1 : decimalPlaces + 1

    trunctNum =
      pointIndex > -1 ? trunctNum.padEnd(padLength, '0') : trunctNum + '.'.padEnd(padLength, '0')
  }

  return trunctNum.toLocaleString()
}
