import { BigNumber } from 'ethers'
import { compactFormat, formatFixed } from '../../utils/bigNumberMasks'

describe('test numberMask', () => {
  it('test with string', async () => {
    expect(formatFixed('1000000000000000000')).toBe('1.00')
  })
  it('test with BigNumber', async () => {
    expect(formatFixed(BigNumber.from('1000000000000000000'))).toBe('1.00')
  })
  it('test round floor places', async () => {
    expect(formatFixed('0199900000000000000', { places: 0 })).toBe('0')
    expect(formatFixed('0199900000000000000', { places: 1 })).toBe('0.1')
    expect(formatFixed('0199900000000000000', { places: 2 })).toBe('0.19')
    expect(formatFixed('0199900000000000000', { places: 3 })).toBe('0.199')
  })
  it('test round floor places', async () => {
    expect(formatFixed('0199900000000000000', { places: 2, decimals: 17 })).toBe('1.99')
    expect(formatFixed('0199900000000000000', { places: 2, decimals: 16 })).toBe('19.99')
    expect(formatFixed('10', { places: 2, decimals: 0 })).toBe('10.00')
  })
})

describe('compactFormat K, M, B ...', () => {
  it('Test K, M, B', async () => {
    expect(compactFormat('9000', { decimals: 1 })).toBe('900')
    expect(compactFormat('1000', { decimals: 0 })).toBe('1K')
    expect(compactFormat('1000000', { decimals: 0 })).toBe('1M')
    expect(compactFormat('1000000000', { decimals: 0 })).toBe('1B')
    expect(compactFormat('1100', { decimals: 0 })).toBe('1.1K')
  })

  it('Small number', async () => {
    expect(compactFormat('0000001', { decimals: 6 })).toBe('< 0.01')
  })
})
