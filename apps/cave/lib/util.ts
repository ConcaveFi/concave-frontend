import { parseUnits } from 'ethers/lib/utils'
import { Currency, CurrencyAmount } from 'gemswap-sdk'

export const currencyAmountToBigNumber = (currency: CurrencyAmount<Currency>) => {
  return parseUnits(currency.toFixed(currency.currency.decimals))
}
