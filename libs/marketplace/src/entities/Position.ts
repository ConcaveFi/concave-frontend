import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export type Position = {
  readonly deposit: BigNumber
  readonly maturity: number
  readonly poolID: number
  readonly rewardDebt: BigNumber
  readonly shares: BigNumber
}