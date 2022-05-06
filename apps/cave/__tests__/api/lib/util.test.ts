import { parseUnits } from 'ethers/lib/utils'
import { Currency, CurrencyAmount, DAI, Percent } from '@concave/gemswap-sdk'

const currencyAmountToBigNumber = (currency: CurrencyAmount<Currency>) => {
  return parseUnits(currency.toFixed(currency.currency.decimals))
}

describe('currencyAmountToBigNumber', () => {
  it('Check if is working', async () => {
    const currencyAmount = CurrencyAmount.fromRawAmount(DAI[3], '10000000000000000000')
    expect(currencyAmount.toExact()).toBe('10')
    const bigNumber = currencyAmountToBigNumber(currencyAmount)
    expect(bigNumber.toString()).toBe('10000000000000000000')
  })
  it('Test Gregs way', async () => {
    const currencyAmount = CurrencyAmount.fromRawAmount(DAI[3], '10000000000000000000')
    expect(currencyAmount.numerator.toString()).toBe('10000000000000000000')
    expect(
      CurrencyAmount.fromRawAmount(DAI[3], currencyAmount.numerator).numerator.toString(),
    ).toBe('10000000000000000000')
    const newCurrency = currencyAmount.multiply(new Percent(98, 100))
    expect(newCurrency.toExact()).toBe('9.8')
  })
})
