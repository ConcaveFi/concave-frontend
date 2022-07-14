<<<<<<< HEAD
import { BigNumberish } from 'ethers'
import { utils } from 'ethers'

export const formatFixed = (
  bigNumber: BigNumberish,
  { decimals = 18, places = 2, minPlaces = 2 } = {},
) => {
  if (!bigNumber) return '0'
  const input = +utils.formatUnits(bigNumber, decimals)
  return floorPrecision(input, { maximumFractionDigits: places, minimumFractionDigits: minPlaces })
}

const floorPrecision = (
  input: number,
  { maximumFractionDigits = 4, minimumFractionDigits = 2 },
=======
import { BigNumberish, utils } from 'ethers'

const fixParams = (params: { decimals?: number; places?: number }) => ({
  places: params.places !== undefined ? params.places : 2,
  decimals: params.decimals !== undefined ? params.decimals : 18,
})

export const formatFixed = (
  bigNumber: BigNumberish,
  params: { decimals?: number; places?: number } = {},
>>>>>>> 487c38971d9fa0eb17e5b5902f30c56b7cd08383
) => {
  const { places, decimals } = fixParams(params)
  const input = utils.formatUnits(bigNumber, decimals)
  const [integerValue, decimalValue] = utils.commify(input).split('.')
  const fixedDecimalValue = (decimalValue || '').padEnd(places, '0').substring(0, places)
  return integerValue + (fixedDecimalValue ? '.' + fixedDecimalValue : '')
}
