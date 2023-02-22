import { CurrencyAmount, Token } from '@concave/core'
import { BigNumber } from '@ethersproject/bignumber'

export type RedeemStatus = {
  redeemable: CurrencyAmount<Token>
  redeemed: CurrencyAmount<Token>
  vestedPercent: BigNumber
}
