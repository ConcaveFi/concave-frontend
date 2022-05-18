import { BigNumber } from 'ethers'

export class Position {
  public readonly deposit: BigNumber
  public readonly maturity: number
  public readonly poolID: number
  public readonly rewardDebt: BigNumber
  public readonly shares: BigNumber
  constructor(obj: {
    deposit: BigNumber
    maturity: number
    poolID: number
    rewardDebt: BigNumber
    shares: BigNumber
  }) {
    this.deposit = obj.deposit
    this.maturity = obj.maturity
    this.poolID = obj.poolID
    this.rewardDebt = obj.rewardDebt
    this.shares = obj.shares
  }
}
