import { CNV, Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { BigNumber } from 'ethers'
import { Offer } from './Auction'
import { NonFungibleTokenInfo } from './NonFungibleToken'

export type MarketItemInfoArgs = {
  readonly offer: Offer
  readonly itenId: BigNumber
  readonly NFT: NonFungibleTokenInfo
}

export class MarketItemInfo {
  public readonly offer: Offer
  public readonly itenId: BigNumber
  public readonly NFT: NonFungibleTokenInfo

  constructor(args: MarketItemInfoArgs) {
    this.offer = args.offer
    this.itenId = args.itenId
    this.NFT = args.NFT
  }

  public static async from(args: {
    offer: Promise<Offer>
    itenId: Promise<BigNumber>
    NFT: Promise<NonFungibleTokenInfo> | NonFungibleTokenInfo
  }) {
    return new MarketItemInfo({
      offer: await args.offer,
      itenId: await args.itenId,
      NFT: await args.NFT,
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
    if (newPrice.gte(this.NFT.currentValue)) return BigNumber.from(0)
    const difference = this.NFT.currentValue.sub(newPrice)
    return difference.mul(basisPoints).div(this.NFT.currentValue)
  }

  get isSale() {
    return this.offer.isSale
  }

  get isMarketItem() {
    return this.itenId.gt(0)
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
