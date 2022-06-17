import { STAKING_CONTRACT } from '@concave/core'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export type NFT = {
  tokenId: BigNumberish
  address: string
}

export class StakingPosition implements NFT {
  public readonly deposit: BigNumber
  public readonly maturity: number
  public readonly poolID: number
  public readonly rewardDebt: BigNumber
  public readonly shares: BigNumber
  public readonly tokenId: BigNumberish
  public readonly chainId: number

  constructor(param: {
    tokenId: BigNumberish
    deposit: BigNumber
    maturity: number
    poolID: number
    chainId: number
    rewardDebt: BigNumber
    shares: BigNumber
  }) {
    this.tokenId = param.tokenId
    this.chainId = param.chainId
    this.deposit = param.deposit
    this.maturity = param.maturity
    this.poolID = param.poolID
    this.rewardDebt = param.rewardDebt
    this.shares = param.shares
  }

  get initialValue() {
    return this.deposit
  }

  get address() {
    return STAKING_CONTRACT[this.chainId]
  }

  get currentValue() {
    return this.deposit.add(this.rewardDebt)
  }
}
