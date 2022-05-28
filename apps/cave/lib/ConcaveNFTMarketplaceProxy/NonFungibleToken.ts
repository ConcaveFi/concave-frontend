import { BigNumberish } from 'ethers'
import { BigNumber } from 'ethers'
import { Position } from 'lib/StakingV1Proxy/Position'
import { Auction } from './Auction'

export class NonFungibleTokenInfo {
  constructor(
    public readonly contractAddress: string,
    public readonly tokenId: BigNumberish,
    private readonly position: Position,
    private readonly auction: Auction,
  ) {}

  public calculteDiscount(newPriceStr: BigNumberish = this.minPrice) {
    const newPrice = BigNumber.from(newPriceStr.toString())
    const difference = this.currentValue.sub(newPrice)
    return difference.mul(100).div(this.currentValue)
  }

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
  get readyForAuction() {
    return this.auction.minPrice.gt(0)
  }
  get minPrice() {
    return this.auction.minPrice
  }
}
