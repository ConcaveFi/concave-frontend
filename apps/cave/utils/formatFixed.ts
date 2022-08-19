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

const formatter = Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 4 })
export const compactFormat = (bigNumber: BigNumberish, params: { decimals?: number } = {}) => {
  const { decimals } = fixParams(params)
  const input = utils.formatUnits(bigNumber, decimals)
  if (+input < 0.01 && +input > 0) {
    return `< 0.01`
  }
  return formatter.format(+input)
}
