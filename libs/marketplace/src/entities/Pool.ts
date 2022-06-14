import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export type Pool = {
  readonly balance: BigNumber
  readonly excessRatio: BigNumber
  readonly g: BigNumber
  readonly rewardsPerShare: BigNumber
  readonly supply: BigNumber
  readonly term: BigNumber
}