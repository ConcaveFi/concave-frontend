import { BigNumber } from 'ethers'

export type Pool = {
  readonly balance: BigNumber
  readonly excessRatio: BigNumber
  readonly g: BigNumber | any
  readonly rewardsPerShare: BigNumber
  readonly supply: BigNumber
  readonly term: BigNumber
}
