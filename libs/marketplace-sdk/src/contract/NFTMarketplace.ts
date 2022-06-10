import { BigNumber, BigNumberish, ethers, Transaction } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { ContractABI } from './NFTMarketplaceAbi'
import { Signer } from 'ethers'
import {
  MarketItemInfo,
  NonFungibleTokenInfo,
  Offer,
  ConcaveNFTMarketplaceProxy,
} from '@concave/marketplace-sdk'
import { BaseProvider } from '@ethersproject/providers'
export class ConcaveNFTMarketplace {
  private readonly contract: ethers.Contract
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract ConcaveNFTMarketplace'
    const address = ConcaveNFTMarketplaceProxy[provider.network.chainId]
    if (!address) throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.contract = new ethers.Contract(
      ConcaveNFTMarketplaceProxy[provider.network.chainId],
      ContractABI,
      this.provider,
    )
  }

  public async createMarketItem(
    signer: Signer,
    { tokenId }: { tokenId: BigNumberish },
  ): Promise<ethers.Transaction> {
    //console.debug('createMarketItem')
    return this.contract.connect(signer).createMarketItem(tokenId.toString())
  }

  /**
   * Returns a auction info
   * @param nfc token to get auctions
   * @returns
   */
  public async tokenIdToItemIds(nfc: NonFungibleTokenInfo): Promise<BigNumber> {
    //console.debug('tokenIdToItemIds', [nfc])
    return this.contract.tokenIdToItemIds(nfc.tokenId)
  }

  /**
   * Returns a auction info
   * @param nfc token to get auctions
   * @returns
   */
  public async nftContractAuctions(nfc: NonFungibleTokenInfo): Promise<Offer> {
    console.debug('nftContractAuctions', [nfc])
    return this.contract.nftContractAuctions(nfc.tokenId).then((result: Offer) => new Offer(result))
  }

  public async withdrawAuction(
    signer: Signer,
    nftContractAddress: NonFungibleTokenInfo,
  ): Promise<Transaction> {
    //console.debug('withdrawAuction')
    return this.contract.connect(signer).withdrawAuction(nftContractAddress.tokenId.toString())
  }

  public async fetchItemsForSale() {
    //console.debug('fetchItemsForSale')
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
    console.table([
      saleInfo.NFT.tokenId,
      saleInfo.offer.ERC20Token,
      saleInfo.offer.buyNowPrice.toString(),
      saleInfo.offer.whitelistedBuyer,
      saleInfo.offer.feeRecipients,
      saleInfo.offer.feePercentages,
    ])
    return this.contract
      .connect(signer)
      .createSale(
        saleInfo.NFT.tokenId,
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
        saleInfo.NFT.tokenId,
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
