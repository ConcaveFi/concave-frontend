import { BigNumber } from 'ethers'

export class Pool {
  public readonly balance: BigNumber
  public readonly excessRatio: BigNumber
  public readonly g: BigNumber
  public readonly rewardsPerShare: BigNumber
  public readonly supply: BigNumber
  public readonly term: BigNumber
  constructor(obj: {
    balance: BigNumber
    excessRatio: BigNumber
    g: BigNumber
    rewardsPerShare: BigNumber
    supply: BigNumber
    term: BigNumber
  }) {
    this.balance = obj.balance
    this.excessRatio = obj.excessRatio
    this.g = obj.g
    this.rewardsPerShare = obj.rewardsPerShare
    this.supply = obj.supply
    this.term = obj.term
  }
}
