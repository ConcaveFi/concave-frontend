import { BigNumber } from '@ethersproject/bignumber'
import { Offer } from './Offer'
<<<<<<< HEAD
<<<<<<< HEAD
import { NFT, StakingPosition } from './StakingPosition'
=======
import { StakingPosition } from './StakingPosition'
>>>>>>> 487c38971d9fa0eb17e5b5902f30c56b7cd08383
=======
import { StakingPosition } from './StakingPosition'
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1

export type MarketItemArgs = {
  readonly offer: Offer
  readonly itemId: BigNumber
  readonly position: StakingPosition
}
export class MarketItem {
  public readonly offer: Offer
  public readonly itemId: BigNumber
  public readonly position: StakingPosition

  constructor(args: MarketItemArgs) {
    this.offer = args.offer
    this.itemId = args.itemId
    this.position = args.position
  }

  public static async from(args: {
    offer: Promise<Offer>
    itemId: Promise<BigNumber>
    position: Promise<StakingPosition> | StakingPosition
  }) {
    return new MarketItem({
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
    return this.offer.calculateDiscount(this.position)
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
