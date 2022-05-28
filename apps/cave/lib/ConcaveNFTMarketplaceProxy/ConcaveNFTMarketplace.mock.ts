import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MarketItem } from './MarketItem'
import { Auction } from './Auction'
import { Signer } from 'ethers'

export class ConcaveNFTMarketplaceMock {
  public async createMarketItem(marketItem: MarketItem): Promise<ethers.Transaction> {
    throw 'Mock data only'
  }

  public async nftContractAuctions(nftContractAddress: string, index: string): Promise<Auction> {
    return {} as Auction
  }

  public async withdrawAuction(
    signer: Signer,
    nftContractAddress: string,
    tokenId: string | BigNumberish,
  ) {
    throw 'Mock data only'
  }

  public async fetchItemsForSale() {
    throw 'Mock data only'
  }
  public async createSale(
    signer: Signer,
    nftContractAddress: string,
    tokenId: BigNumberish,
    erc20Token: string,
    buyNowPrice: BigNumberish,
    whitelistedBuyer: string,
    feeRecipients: string[],
    feePercentages: number[], //max 10000
  ) {
    throw 'Mock data only'
  }

  public async createDefaultNftAuction(
    signer: Signer,
    nftContractAddress: string,
    tokenId: BigNumberish,
    erc20Token: string,
    minPrice: BigNumberish,
    buyNowPrice: BigNumberish,
    feeRecipients: string[],
    feePercentages: number[], //max 10000
  ): Promise<ethers.Transaction> {
    throw 'Mock data only'
  }

  public async createNewNftAuction(
    nftContractAddress: string,
    tokenId: BigNumber,
    erc20Token: string,
    minPrice: BigNumber,
    buyNowPrice: BigNumber,
    auctionBidPeriod: BigNumber,
    bidIncreasePercentage: BigNumber,
    feeRecipients: string[],
    feePercentages: string[],
  ): Promise<ethers.Transaction> {
    throw 'Mock data only'
  }
}
