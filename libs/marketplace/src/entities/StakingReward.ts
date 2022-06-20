import { BigNumber } from '@ethersproject/bignumber'

export class StakingReward {
  public readonly amountDeposited: BigNumber
  public readonly totalRewards: BigNumber
  public readonly baseRewards: BigNumber
  public readonly excessRewards: BigNumber

  constructor(props: {
    amountDeposited: BigNumber
    baseRewards: BigNumber
    excessRewards: BigNumber
    totalRewards: BigNumber
  }) {
    this.amountDeposited = props.amountDeposited
    this.baseRewards = props.baseRewards
    this.excessRewards = props.excessRewards
    this.totalRewards = props.totalRewards
  }
}
