import { BigNumberish, utils } from 'ethers'

const fixParams = (params: { decimals?: number; places?: number }) => ({
  places: params.places !== undefined ? params.places : 2,
  decimals: params.decimals !== undefined ? params.decimals : 18,
})

export const formatFixed = (
  bigNumber: BigNumberish,
  params: { decimals?: number; places?: number } = {},
) => {
  const { places, decimals } = fixParams(params)
  const input = utils.formatUnits(bigNumber, decimals)
  const [integerValue, decimalValue] = utils.commify(input).split('.')
  const fixedDecimalValue = (decimalValue || '').padEnd(places, '0').substring(0, places)
  return integerValue + (fixedDecimalValue ? '.' + fixedDecimalValue : '')
}