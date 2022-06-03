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
    return this.userReward[0]
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
  get gained() {
    return this.userReward[3].sub(this.userReward[0])
  }
  get currentValue() {
    return this.userReward[3]
  }
  get userReward() {
    return this._userReward
  }
}
