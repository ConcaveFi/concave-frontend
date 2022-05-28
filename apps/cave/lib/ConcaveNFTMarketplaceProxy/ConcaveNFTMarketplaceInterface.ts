import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MarketItem } from './MarketItem'
import { Auction } from './Auction'
import { Signer } from 'ethers'

export type ConcaveNFTMarketplace = {
  createMarketItem(marketItem: MarketItem): Promise<ethers.Transaction>
  nftContractAuctions(nftContractAddress: string, index: string): Promise<Auction>
  withdrawAuction(signer: Signer, nftContractAddress: string, tokenId: string | BigNumberish)
  fetchItemsForSale()
  createSale(
    signer: Signer,
    nftContractAddress: string,
    tokenId: BigNumberish,
    erc20Token: string,
    buyNowPrice: BigNumberish,
    whitelistedBuyer: string,
    feeRecipients: string[],
    feePercentages: number[], //max 10000
  )

  createDefaultNftAuction(
    signer: Signer,
    nftContractAddress: string,
    tokenId: BigNumberish,
    erc20Token: string,
    minPrice: BigNumberish,
    buyNowPrice: BigNumberish,
    feeRecipients: string[],
    feePercentages: number[], //max 10000
  ): Promise<ethers.Transaction>

  createNewNftAuction(
    nftContractAddress: string,
    tokenId: BigNumber,
    erc20Token: string,
    minPrice: BigNumber,
    buyNowPrice: BigNumber,
    auctionBidPeriod: BigNumber,
    bidIncreasePercentage: BigNumber,
    feeRecipients: string[],
    feePercentages: string[],
  ): Promise<ethers.Transaction>
}
