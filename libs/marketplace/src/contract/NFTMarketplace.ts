import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { Currency, CurrencyAmount, MARKETPLACE_CONTRACT } from '@concave/core'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber, BigNumberish, ethers, Signer, Transaction } from 'ethers'
import { NFT, Offer, StakingPosition } from 'src/entities'
import { ContractABI } from './NFTMarketplaceAbi'

export class ConcaveNFTMarketplace {
  private readonly contract: ethers.Contract
  public readonly address: string
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract ConcaveNFTMarketplace'
    this.address = MARKETPLACE_CONTRACT[provider.network.chainId]
    if (!this.address)
      throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.contract = new ethers.Contract(this.address, ContractABI, this.provider)
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

  public async createOffer(signer: Signer, stakingPosition: StakingPosition, offer: Offer) {
    if (offer.isSale) return this.createSale(signer, stakingPosition, offer)
    if (offer.isAuction) return this.createDefaultNftAuction(signer, stakingPosition, offer)
  }

  private async createSale(signer: Signer, stakingPosition: StakingPosition, offer: Offer) {
    return this.contract
      .connect(signer)
      .createSale(
        stakingPosition.tokenId,
        offer.ERC20Token,
        offer.buyNowPrice.toString(),
        offer.whitelistedBuyer,
        offer.feeRecipients,
        offer.feePercentages,
      )
  }

  private async createDefaultNftAuction(
    signer: Signer,
    stakingPosition: StakingPosition,
    offer: Offer,
  ): Promise<ethers.Transaction> {
    return this.contract
      .connect(signer)
      .createDefaultNftAuction(
        stakingPosition.tokenId,
        offer.ERC20Token,
        offer.minPrice.toString(),
        offer.buyNowPrice.toString(),
        offer.feeRecipients,
        offer.feePercentages,
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
  public async makeBid(
    signer: Signer,
    position: StakingPosition,
    currencyAmount?: CurrencyAmount<Currency>,
  ) {
    if (currencyAmount.currency.isNative) {
      throw 'Native currency'
    }
    return this.contract
      .connect(signer)
      .makeBid(
        position.tokenId,
        currencyAmount.wrapped.currency.address,
        currencyAmount.numerator.toString(),
      )
  }
  public async buyNow(signer: Signer, position: StakingPosition, offer: Offer) {
    return this.contract
      .connect(signer)
      .makeBid(position.tokenId, offer.ERC20Token, offer.buyNowPrice.toString())
  }
}
