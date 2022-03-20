export const useRoundPrecision = (input: number, places = 4) => {
  const _ = 10 ** places
  const result = Math.round(input * _) / _
  const formatted = result.toLocaleString('en-US')
  return { result, formatted }
}

export const useFloorPrecision = (input: number, places = 4) => {
  const _ = 10 ** places
  const result = Math.floor(input * _) / _
  const formatted = result.toLocaleString('en-US')
  return { result, formatted }
}
