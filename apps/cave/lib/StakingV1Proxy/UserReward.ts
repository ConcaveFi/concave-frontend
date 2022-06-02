import { BigNumber } from 'ethers'

export type UserReward = {
  amountDeposited: BigNumber
  baseRewards: BigNumber
  excessRewards: BigNumber
  totalRewards: BigNumber
}
