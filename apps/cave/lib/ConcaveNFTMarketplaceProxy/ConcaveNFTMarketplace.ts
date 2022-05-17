import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { ConcaveNFTMarketplaceProxy } from './Address'
import { ContractABI } from './ConcaveNFTMarketplaceABI'
import { MarketItem } from './MarketItem'

export class ConcaveNFTMarketplace {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number, private readonly signer?: ethers.Signer) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(
      ConcaveNFTMarketplaceProxy[chainId],
      ContractABI,
      this.provider,
    )
    if (this.signer) {
      this.contract.connect(this.signer)
    }
  }

  public async createMarketItem(marketItem: MarketItem): Promise<ethers.Transaction> {
    return this.contract.createMarketItem(marketItem.tokenID, marketItem.price, {})
  }

  public async createDefaultNftAuction(
    nftContractAddress: string,
    tokenId: BigNumberish,
    erc20Token: string,
    minPrice: BigNumberish,
    buyNowPrice: BigNumberish,
    feeRecipients: string[],
    feePercentages: number[],
  ): Promise<ethers.Transaction> {
    if (feeRecipients.length !== feePercentages.length) {
      throw 'Check recipients and percentages'
    }
    console.table([
      nftContractAddress,
      tokenId,
      erc20Token,
      minPrice,
      buyNowPrice,
      feeRecipients,
      feePercentages,
    ])
    return this.contract
      .connect(this.signer)
      .createDefaultNftAuction(
        nftContractAddress,
        tokenId,
        erc20Token,
        minPrice,
        buyNowPrice,
        feeRecipients,
        feePercentages,
      )
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
    if (feeRecipients.length !== feePercentages.length) {
      throw 'Check recipients and percentages'
    }
    return this.contract.createDefaultNftAuction(
      nftContractAddress,
      tokenId,
      erc20Token,
      minPrice,
      buyNowPrice,
      auctionBidPeriod,
      bidIncreasePercentage,
      feeRecipients,
      feePercentages,
    )
  }
}
