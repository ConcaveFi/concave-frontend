import { utils } from 'ethers'
import { BigNumber } from 'ethers'

export const formatFixed = (
  bigNumber: BigNumber,
  { decimals = 18, places = 2, minPlaces = 2 } = {},
) => {
  const input = +utils.formatUnits(bigNumber, decimals)
  return floorPrecision(input, { maximumFractionDigits: places, minimumFractionDigits: minPlaces })
}

const floorPrecision = (
  input: number,
  { maximumFractionDigits = 4, minimumFractionDigits = 2 },
) => {
  const _ = 10 ** maximumFractionDigits
  const result = Math.floor(input * _) / _ || 0
  return result.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  })
}
