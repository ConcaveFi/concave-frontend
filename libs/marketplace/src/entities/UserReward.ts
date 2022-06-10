import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export type UserReward = {
  amountDeposited: BigNumber
  baseRewards: BigNumber
  excessRewards: BigNumber
  totalRewards: BigNumber
}
