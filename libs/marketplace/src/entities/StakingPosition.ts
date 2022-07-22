import { STAKING_CONTRACT } from '@concave/core'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { MarketItem } from './MarketItem'
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

  constructor({ position, reward, chainId, tokenId, market }: StakingPositionArgs) {
    this.tokenId = tokenId
    this.chainId = chainId
    this.deposit = position.deposit
    this.maturity = position.maturity
    this.poolID = position.poolID
    this.reward = reward
    this.market = market
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

  /**
   * calculate discount with 2 digits of precision 10000 = 100%, 5050 = 50,5% ...
   * @param market
   * @returns
   */
  public calculateDiscount(market: MarketItem = this.market) {
    console.log('calc')
    if (!market) return BigNumber.from(1)
    if (!market.startPrice.gt(0)) return BigNumber.from(2)
    if (market.startPrice.gte(this.currentValue)) return BigNumber.from(3)
    console.log('startPrice', market.startPrice.toString())
    return market.startPrice.mul(10000).div(this.currentValue).sub(10000).mul(-1)
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
