import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { ConcaveNFTMarketplaceProxy } from './Address'
import { ContractABI } from './ConcaveNFTMarketplaceABI'
import { MarketItem } from './MarketItem'
import { Auction } from './Auction'
import { Signer } from 'ethers'
import { Contract } from 'ethers'

export class ConcaveNFTMarketplaceContract {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider
  constructor(chainId: number) {
    if (!chainId) throw 'ChainID is undefined for constructor of contract StakingV1Contract'
    const address = ConcaveNFTMarketplaceProxy[chainId]
    if (!address) throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.provider = concaveProvider(chainId)
    this.contract = new Contract(address, ContractABI, this.provider)
  }

  public async createMarketItem(marketItem: MarketItem): Promise<ethers.Transaction> {
    return this.contract.createMarketItem(marketItem.tokenID, marketItem.price)
  }

  public async nftContractAuctions(nftContractAddress: string, index: string): Promise<Auction> {
    return this.contract
      .nftContractAuctions(nftContractAddress, index)
      .then((result: Auction) => ({ ...result }))
  }

  public async withdrawAuction(
    signer: Signer,
    nftContractAddress: string,
    tokenId: string | BigNumberish,
  ) {
    return this.contract.connect(signer).withdrawAuction(nftContractAddress, tokenId.toString())
  }

  public async fetchItemsForSale() {
    return this.contract.fetchItemsForSale()
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
    if (feeRecipients.length !== feePercentages.length) {
      throw 'Check recipients and percentages'
    }
    return this.contract
      .connect(signer)
      .createSale(
        nftContractAddress,
        tokenId,
        erc20Token,
        buyNowPrice,
        whitelistedBuyer,
        feeRecipients,
        feePercentages,
      )
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
    if (feeRecipients.length !== feePercentages.length) {
      throw 'Check recipients and percentages'
    }
    return this.contract
      .connect(signer)
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
