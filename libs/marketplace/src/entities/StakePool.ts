import { BigNumber } from '@ethersproject/bignumber'

type StakePoolConstructorArgs = {
  readonly balance: BigNumber
  readonly excessRatio: BigNumber
  readonly g: BigNumber
  readonly rewardsPerShare: BigNumber
  readonly supply: BigNumber
  readonly term: BigNumber
  readonly poolId: number
}

export class StakePool {
  constructor(value: StakePoolConstructorArgs) {
    this.balance = value.balance
    this.excessRatio = value.excessRatio
    this.g = value.g
    this.rewardsPerShare = value.rewardsPerShare
    this.supply = value.supply
    this.term = value.term
    this.poolId = value.poolId

    const stakeInfo = stakingPools[value.poolId]
    this.days = stakeInfo.days
    this.bondRevenue = stakeInfo.bondRevenue
    this.rewardsBoost = stakeInfo.rewardsBoost
    this.quaterlyBoost = stakeInfo.quaterlyBoost
  }
  readonly days: 360 | 180 | 90 | 45
  readonly bondRevenue: '100%' | '75%' | '50%' | '25%'
  readonly rewardsBoost: '4x' | '2x' | '1.5x' | '1.25x'
  readonly quaterlyBoost: '2x' | '1.75x' | '1.5x' | '1.25x'
  readonly poolId: number
  readonly balance: BigNumber
  readonly excessRatio: BigNumber
  readonly g: BigNumber
  readonly rewardsPerShare: BigNumber
  readonly supply: BigNumber
  readonly term: BigNumber
}

export const stakingPools = [
  { days: 360, bondRevenue: '100%', rewardsBoost: '4x', quaterlyBoost: '2x' },
  { days: 180, bondRevenue: '75%', rewardsBoost: '2x', quaterlyBoost: '1.75x' },
  { days: 90, bondRevenue: '50%', rewardsBoost: '1.5x', quaterlyBoost: '1.5x' },
  { days: 45, bondRevenue: '25%', rewardsBoost: '1.25x', quaterlyBoost: '1.25x' },
] as const

export type PoolRewards = {
  readonly days: 360 | 180 | 90 | 45
  readonly bondRevenue: '100%' | '75%' | '50%' | '25%'
  readonly rewardsBoost: '4x' | '2x' | '1.5x' | '1.25x'
  readonly quaterlyBoost: '2x' | '1.75x' | '1.5x' | '1.25x'
}

// export type StakingType = typeof stakingPools;
