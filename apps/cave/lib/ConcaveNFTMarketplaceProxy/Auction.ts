import { BigNumber } from 'ethers'

export class Auction {
  constructor(
    public readonly bidIncreasePercentage: number,
    public readonly auctionBidPeriod: number,
    public readonly auctionEnd: BigNumber,
    public readonly minPrice: BigNumber,
    public readonly buyNowPrice: BigNumber,
    public readonly nftHighestBid: BigNumber,
    public readonly nftHighestBidder: string,
    public readonly nftSeller: string,
    public readonly whitelistedBuyer: string,
    public readonly nftRecipient: string,
    public readonly ERC20Token: string,
  ) {}

  static fromObject(props: Auction) {
    return new Auction(
      props.bidIncreasePercentage,
      props.auctionBidPeriod,
      props.auctionEnd,
      props.minPrice,
      props.buyNowPrice,
      props.nftHighestBid,
      props.nftHighestBidder,
      props.nftSeller,
      props.whitelistedBuyer,
      props.nftRecipient,
      props.ERC20Token,
    )
  }
}
