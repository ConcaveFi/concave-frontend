import { BigNumber, BigNumberish, ethers, Transaction } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { ContractABI } from './NFTMarketplaceAbi'
import { Signer } from 'ethers'
import { MarketItemInfo, Offer } from './../entities'
import { BaseProvider } from '@ethersproject/providers'
import { MARKETPLACE_CONTRACT } from '@concave/core'
import { NFT } from 'src/entities'

export class ConcaveNFTMarketplace {
  private readonly contract: ethers.Contract
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract ConcaveNFTMarketplace'
    const address = MARKETPLACE_CONTRACT[provider.network.chainId]
    if (!address) throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.contract = new ethers.Contract(address, ContractABI, this.provider)
  }

  public async createMarketItem(
    signer: Signer,
    { tokenId }: { tokenId: BigNumberish },
  ): Promise<ethers.Transaction> {
    console.debug('createMarketItem')
    return this.contract.connect(signer).createMarketItem(tokenId.toString())
  }

  public async tokenIdToItemIds(nft: NFT): Promise<BigNumber> {
    console.debug('tokenIdToItemIds', [nft])
    return this.contract.tokenIdToItemIds(nft.tokenId)
  }

  /**
   * Returns a auction info
   * @param nft token to get auctions
   * @returns
   */
  public async nftContractAuctions(nft: NFT): Promise<Offer> {
    console.debug('nftContractAuctions', [nft])
    return this.contract.nftContractAuctions(nft.tokenId).then((result: Offer) => new Offer(result))
  }

  public async withdrawAuction(signer: Signer, nftContractAddress: NFT): Promise<Transaction> {
    console.debug('withdrawAuction')
    return this.contract.connect(signer).withdrawAuction(nftContractAddress.tokenId.toString())
  }

  public async fetchItemsForSale() {
    console.debug('fetchItemsForSale')
    return this.contract.fetchItemsForSale()
  }

  public async createOffer(
    signer: Signer,
    saleInfo: MarketItemInfo, //max 10000
  ) {
    if (saleInfo.isSale) return this.createSale(signer, saleInfo)
    if (saleInfo.isAuction) return this.createDefaultNftAuction(signer, saleInfo)
  }

  private async createSale(
    signer: Signer,
    saleInfo: MarketItemInfo, //max 10000
  ) {
    return this.contract
      .connect(signer)
      .createSale(
        saleInfo.position.tokenId,
        saleInfo.offer.ERC20Token,
        saleInfo.offer.buyNowPrice.toString(),
        saleInfo.offer.whitelistedBuyer,
        saleInfo.offer.feeRecipients,
        saleInfo.offer.feePercentages,
      )
  }

  private async createDefaultNftAuction(
    signer: Signer,
    saleInfo: MarketItemInfo,
  ): Promise<ethers.Transaction> {
    return this.contract
      .connect(signer)
      .createDefaultNftAuction(
        saleInfo.position.tokenId,
        saleInfo.offer.ERC20Token,
        saleInfo.offer.minPrice.toString(),
        saleInfo.offer.buyNowPrice.toString(),
        saleInfo.offer.feeRecipients,
        saleInfo.offer.feePercentages,
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
