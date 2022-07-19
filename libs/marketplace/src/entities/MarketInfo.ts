import { BigNumber } from '@ethersproject/bignumber'
import { Offer } from './Offer'
import { StakingPosition } from './StakingPosition'

export type MarketItemInfoArgs = {
  readonly offer: Offer
  readonly itemId: BigNumber
  readonly position: StakingPosition
}
export class MarketItemInfo {
  public readonly offer: Offer
  public readonly itemId: BigNumber
  public readonly position: StakingPosition

  constructor(args: MarketItemInfoArgs) {
    this.offer = args.offer
    this.itemId = args.itemId
    this.position = args.position
  }

  public static async from(args: {
    offer: Promise<Offer>
    itemId: Promise<BigNumber>
    position: Promise<StakingPosition> | StakingPosition
  }) {
    return new MarketItemInfo({
      offer: await args.offer,
      itemId: await args.itemId,
      position: await args.position,
    })
  }

  /**
   * return a percentage of discount for this item
   * this percentage has 10000 basisPoints,
   * 10000 = 100%, 1000 = 10%, 100 = 1%, 10 = 0.1%, 1 = 0.01%,
   */
  get discount() {
    const basisPoints = 10000
    const newPrice = this.isSale
      ? BigNumber.from(this.offer.buyNowPrice.toString())
      : BigNumber.from(this.offer.minPrice.toString())

    if (newPrice.gte(this.position.currentValue)) return BigNumber.from(0)
    const difference = this.position.currentValue.sub(newPrice)
    return difference.mul(basisPoints).div(this.position.currentValue)
  }

  get isSale() {
    return this.offer.isSale
  }

  get isMarketItem() {
    return this.itemId.gt(0)
  }

  get isAuction() {
    return this.offer.isAuction
  }

  get isListed() {
    return this.isAuction || this.isSale
  }

  get listPrice() {
    return this.offer.listPrice
  }
}
