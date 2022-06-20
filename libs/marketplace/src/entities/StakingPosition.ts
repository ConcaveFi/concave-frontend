import { STAKING_CONTRACT } from '@concave/core'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { StakingReward } from './StakingReward'

export type NFT = {
  tokenId: BigNumberish
  address: string
}

export class StakingPosition implements NFT {
  public readonly deposit: BigNumber
  public readonly maturity: number
  public readonly poolID: number
  public readonly tokenId: BigNumberish
  public readonly chainId: number
  public readonly reward: StakingReward

  constructor({
    position,
    reward,
    chainId,
    tokenId,
  }: {
    tokenId: BigNumberish
    chainId: number
    position: Position
    reward: StakingReward
  }) {
    this.tokenId = tokenId
    this.chainId = chainId
    this.deposit = position.deposit
    this.maturity = position.maturity
    this.poolID = position.poolID
    this.reward = reward
  }

  get initialValue() {
    return this.deposit
  }

  get address() {
    return STAKING_CONTRACT[this.chainId]
  }

  get currentValue() {
    return this.reward.totalRewards
  }

  get totalRewards() {
    return this.currentValue.sub(this.initialValue)
  }
}

export type Position = {
  deposit: BigNumber
  maturity: number
  poolID: number
  chainId: number
  rewardDebt: BigNumber
  shares: BigNumber
}
