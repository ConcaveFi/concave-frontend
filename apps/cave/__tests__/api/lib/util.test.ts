import { CurrencyAmount, DAI } from 'gemswap-sdk'
import { currencyAmountToBigNumber } from 'lib/util'

describe('currencyAmountToBigNumber', () => {
  it('Check if is working', async () => {
    const currencyAmount = CurrencyAmount.fromRawAmount(DAI[3], '10000000000000000000')
    const bigNumber = currencyAmountToBigNumber(currencyAmount)
    expect(bigNumber.toString()).toBe('10000000000000000000')
  })
})
