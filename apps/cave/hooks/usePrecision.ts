import { utils } from 'ethers'
import { BigNumber } from 'ethers'

export const useRoundPrecision = (input: number, places = 4) => {
  const _ = 10 ** places
  const result = Math.round(input * _) / _ || 0
  const formatted = result.toLocaleString('en-US', {
    maximumFractionDigits: places,
  })
  return { result, formatted }
}

export const useFloorPrecision = (input: number, places = 4) => {
  const _ = 10 ** places
  const result = Math.floor(input * _) / _ || 0
  const formatted = result.toLocaleString('en-US', {
    maximumFractionDigits: places,
  })
  return { result, formatted }
}

export const usePrecision = (input: number, places = 4) => {
  const _ = 10 ** places
  const result = Math.abs(input * _) / _ || 0
  const formatted = result.toLocaleString('en-US', {
    maximumFractionDigits: places,
  })
  return { result, formatted }
}
export const precision = (input: number, places = 4) => {
  const _ = 10 ** places
  const result = Math.abs(input * _) / _ || 0
  const formatted = result.toLocaleString('en-US', {
    maximumFractionDigits: places,
  })
  return { result, formatted }
}
export const precisionBignumber = (bigNumber: BigNumber, decimals = 18, places = 4) => {
  const _ = 10 ** places
  const input = +utils.formatUnits(bigNumber, decimals)
  const result = Math.abs(input * _) / _ || 0
  const formatted = result.toLocaleString('en-US', {
    maximumFractionDigits: places,
  })
  return { result, formatted }
}
