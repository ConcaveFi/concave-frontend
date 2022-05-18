import { BigNumberish } from 'ethers'
import { utils } from 'ethers'
import { BigNumber } from 'ethers'
import { precisionBignumber } from 'hooks/usePrecision'
import { Position } from 'lib/StakingV1Proxy/Position'
import { Auction } from './Auction'

export class NonFungibleTokenInfo {
  constructor(
    public readonly contractAddress: string,
    public readonly tokenId: BigNumberish,
    private readonly position: Position,
    private readonly auction: Auction,
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
  get maturity() {
    return this.position.maturity
  }
  get rewardDebt() {
    return this.position.rewardDebt
  }
  get currentValue() {
    return this.shares.add(this.rewardDebt)
  }
  get listPrice() {
    if (this.minPriceAuction.eq(0)) {
      return '---'
    }
    return precisionBignumber(this.minPriceAuction, 18, 4).formatted
  }
  get expirationDate() {
    return '--.--.--'
  }

  public calculteDiscount(newPiceStr: BigNumberish = this.minPriceAuction) {
    const newPice = BigNumber.from(newPiceStr.toString())
    if (newPice.eq(0)) {
      return '---'
    }
    const desconto = this.currentValue.sub(newPice)
    const porcentagem = desconto.mul(100).div(this.currentValue)
    return porcentagem + '%'
  }

  get readyForAuction() {
    return this.auction.minPrice.gt(0)
  }
  get minPriceAuction() {
    return this.auction.minPrice
  }
}
