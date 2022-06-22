import { commify } from 'ethers/lib/utils'

const numSplice = (s: string | Number, decimals?: number) => {
  const a = s.toString()
  const _decimals = decimals + 1
  return a.indexOf('.') > -1 ? a.slice(0, a.indexOf('.') + _decimals) : a
}

export const numberMask = (number: Number, decimals?: number) => {
  if (number === 0) {
    return `0`
  }
  if (number < 0.01) {
    return `<.01`
  }
  const _decimals = decimals || 2
  return commify(numSplice(number, _decimals))
}
