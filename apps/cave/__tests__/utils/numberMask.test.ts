import { numberMask } from '../../utils/numberMask'

describe('Test numberMask', () => {
  it('generic test', () => {
    expect(numberMask(1)).toBe('1')
    expect(numberMask(1.01, 2)).toBe('1.01')
    expect(numberMask(1.01, 3)).toBe('1.01')
  })
  it('check min values', () => {
    expect(numberMask(0.001, 8)).toBe('< 0.01')
    expect(numberMask(0.009, 2)).toBe('< 0.01')
    expect(numberMask(0.01, 2)).toBe('0.01')
  })
  it('check commas', () => {
    expect(numberMask(1000)).toBe('1,000')
    expect(numberMask(1000000)).toBe('1,000,000')
    expect(numberMask(1000000000)).toBe('1,000,000,000')
  })
  it('check decimal places', () => {
    expect(numberMask(1.001, 3)).toBe('1.001')
    expect(numberMask(1.0001, 8)).toBe('1.0001')
  })
})
