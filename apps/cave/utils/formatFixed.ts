import { utils } from 'ethers'
import { BigNumber } from 'ethers'

export const formatFixed = (bigNumber: BigNumber, { decimals = 18, places = 2 } = {}) => {
  const input = +utils.formatUnits(bigNumber, decimals)
  return precision(input, places)
}

export const precision = (input: number, places = 4) => {
  const _ = 10 ** places
  const result = Math.abs(input * _) / _ || 0
  return result.toLocaleString('en-US', {
    maximumFractionDigits: places,
  })
}
