import { JSBI } from '@concave/core'
import { BigNumber } from 'ethers'
import { useCurrencyBalance, UseCurrencyBalanceData } from 'hooks/useCurrencyBalance'

export const truncateNumber = (
  valueToTruncate: number | UseCurrencyBalanceData | JSBI | BigNumber,
  decimal?: number,
) => {
  let decimalPlaces = decimal || 2
  let value = (Number(valueToTruncate.toString()) / 10 ** 18).toString()
  let countAfterDecimal = 0
  const pointIndex = value.indexOf('.')

  let trunctNum
  if (pointIndex > -1) {
    trunctNum = value.slice(0, decimalPlaces + pointIndex + 1).toLocaleString()
    countAfterDecimal = trunctNum.substring(pointIndex).length

    if (decimalPlaces >= countAfterDecimal) {
      let padLength = trunctNum.length - countAfterDecimal + decimalPlaces + 1

      trunctNum = trunctNum.padEnd(padLength, '0')
    }
  } else {
    trunctNum = value.toLocaleString()
    if (decimalPlaces >= countAfterDecimal) {
      let padLength = decimalPlaces + 1

      trunctNum = trunctNum + '.'.padEnd(padLength, '0')
    }
  }
  trunctNum = +trunctNum
  return trunctNum.toLocaleString('en-US', { minimumFractionDigits: decimalPlaces })
}
