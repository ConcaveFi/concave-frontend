import { CNV } from '@concave/core'
import { BigNumberish } from 'ethers'
import { Position } from 'lib/StakingV1Proxy/Position'
import { UserReward } from 'lib/StakingV1Proxy/UserReward'

export class NonFungibleTokenInfo {
  constructor(
    public readonly networkId: number,
    public readonly contractAddress: string,
    public readonly tokenId: BigNumberish,
    private readonly position: Position,
    private readonly _userReward: UserReward,
  ) {}

  get tokenOfStack() {
    return CNV[this.networkId]
  }
  get poolID() {
    return this.position.poolID
  }
  get shares() {
    return this.position.shares
  }
  get initialValue() {
    return this.deposit
  }
  get deposit() {
    return this.position.deposit
  }
  get maturity() {
    return this.position.maturity
  }
  get rewardDebt() {
    return this.position.rewardDebt
  }
  get currentValue() {
    return this.deposit.add(this.rewardDebt)
  }
  get userReward() {
    return this._userReward
  }
}
