import { STAKING_CONTRACT } from '@concave/core'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { MarketItem } from './MarketItem'
import { stakingPools } from './PoolState'
import { StakingReward } from './StakingReward'

export type NFT = {
  tokenId: BigNumberish
  address: string
}
export type StakingPositionArgs = {
  tokenId: BigNumberish
  chainId: number
  position: Position
  reward: StakingReward
  hash: string
  lockedUntil: number
  market?: MarketItem
}

export class StakingPosition implements NFT {
  public readonly deposit: BigNumber
  public readonly maturity: number
  public readonly poolID: number
  public readonly tokenId: BigNumberish
  public readonly chainId: number
  public readonly reward: StakingReward
  public readonly market?: MarketItem
  public readonly lockedUntil: number

  constructor({ position, reward, chainId, tokenId, market, lockedUntil }: StakingPositionArgs) {
    this.tokenId = tokenId
    this.chainId = chainId
    this.deposit = position.deposit
    this.maturity = position.maturity
    this.poolID = position.poolID
    this.reward = reward
    this.market = market
    this.lockedUntil = lockedUntil
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

  get pool() {
    return stakingPools[this.poolID]
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
