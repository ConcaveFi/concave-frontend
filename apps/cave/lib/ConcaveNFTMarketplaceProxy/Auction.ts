import { BigNumber } from 'ethers'

export type Auction = {
  readonly bidIncreasePercentage: number
  readonly auctionBidPeriod: number
  readonly auctionEnd: BigNumber
  readonly minPrice: BigNumber
  readonly buyNowPrice: BigNumber
  readonly nftHighestBid: BigNumber
  readonly nftHighestBidder: string
  readonly nftSeller: string
  readonly whitelistedBuyer: string
  readonly nftRecipient: string
  readonly ERC20Token: string
}
