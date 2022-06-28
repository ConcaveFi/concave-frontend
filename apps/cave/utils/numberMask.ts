import { BigNumber } from 'ethers'
import { commify, formatEther } from 'ethers/lib/utils'
import { formatFixed } from './formatFixed'

/**
 * Adds decimals if '.' character is found, otherwise returns number string without modification
 * @param number - number to modify
 * @param decimalCount - amount of decimal places
 * @returns a number in string format
 */
const numSplice = (number: string | Number, decimalCount?: number): string => {
  const numStr = number.toString()
  const decimalIndex = decimalCount + 1
  return numStr.indexOf('.') > -1 ? numStr.slice(0, numStr.indexOf('.') + decimalIndex) : numStr
}

/**
 * Format normal numbers to `X` decimal places to make them readable.
 * @param number - a number to be formatted
 * @param decimals - the number of decimal places to use
 * @returns a number in string format
 */
export const numberMask = (number: Number | BigNumber, decimals?: number): string => {
  if (BigNumber.isBigNumber(number)) {
    if (number.eq(0)) {
      return `0`
    }
    if (+formatEther(number) < 0.01) {
      return `<.01`
    }
    return formatFixed(number)
  } else {
    if (number === 0) {
      return `0`
    }
    if (number < 0.01) {
      return `<.01`
    }
    const decimalCount = decimals || 2
    return commify(numSplice(number, decimalCount))
  }
}


