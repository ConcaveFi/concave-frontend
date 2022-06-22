import { commify } from 'ethers/lib/utils'

/**
 * Adds decimals if '.' character is found
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
export const numberMask = (number: Number, decimals?: number): string => {
  if (number === 0) {
    return `0`
  }
  if (number < 0.01) {
    return `<.01`
  }
  const decimalCount = decimals || 2
  return commify(numSplice(number, decimalCount))
}
