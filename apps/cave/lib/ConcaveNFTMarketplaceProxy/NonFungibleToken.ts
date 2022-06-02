import { BigNumberish } from 'ethers'
import { Position } from 'lib/StakingV1Proxy/Position'
import { UserReward } from 'lib/StakingV1Proxy/UserReward'
import { Auction } from './Auction'

export class NonFungibleTokenInfo {
  constructor(
    public readonly contractAddress: string,
    public readonly tokenId: BigNumberish,
    private readonly position: Position,
    private readonly _userReward: UserReward,
  ) {}

  get poolID() {
    return this.position.poolID
  }
  get shares() {
    return this.position.shares
  }
  get initialValue() {
    return this.shares
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
    return this.shares.add(this.rewardDebt)
  }
  get userReward() {
    return this._userReward
  }
}
