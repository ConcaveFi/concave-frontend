import { BigNumber } from 'ethers'
import { formatFixed } from '../../utils/formatFixed'

describe('test numberMask', () => {
  it('test with string', async () => {
    expect(formatFixed('1000000000000000000')).toBe('1.00')
  })
  it('test with BigNumber', async () => {
    expect(formatFixed(BigNumber.from('1000000000000000000'))).toBe('1.00')
  })
  it('test min places', async () => {
    expect(formatFixed('1000000000000000000', { minPlaces: 0 })).toBe('1')
    expect(formatFixed('1000000000000000000', { minPlaces: 1 })).toBe('1.0')
    expect(formatFixed('1000000000000000000', { minPlaces: 2 })).toBe('1.00')
  })
  it('test round floor places', async () => {
    expect(formatFixed('0199900000000000000', { places: 2 })).toBe('0.19')
    expect(formatFixed('0199900000000000000', { places: 3 })).toBe('0.199')
  })
  it('test round floor places', async () => {
    expect(formatFixed('0199900000000000000', { places: 2, decimals: 17 })).toBe('1.99')
    expect(formatFixed('0199900000000000000', { places: 2, decimals: 16 })).toBe('19.99')
    expect(formatFixed('10', { places: 2, decimals: 0 })).toBe('10')
  })
})
