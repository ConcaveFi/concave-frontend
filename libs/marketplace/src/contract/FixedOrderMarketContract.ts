import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { MARKETPLACE_CONTRACT } from '@concave/core'
import { splitSignature } from '@ethersproject/bytes'
import { BaseProvider } from '@ethersproject/providers'
import { ethers, Signer, Transaction } from 'ethers'
import { MarketItem } from '../entities'
import { MarketplaceABI } from './MarketplaceAbi'

export class FixedOrderMarketContract {
  private readonly contract: ethers.Contract
  public readonly address: string
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract FixedOrderMarketContract'
    this.address = MARKETPLACE_CONTRACT[provider.network.chainId]
    if (!this.address)
      throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.contract = new ethers.Contract(this.address, MarketplaceABI, this.provider)
  }

  public getContract() {
    return this.contract
  }

  public async nonce(address: string): Promise<string> {
    return this.contract.nonces(address)
  }

  public async verify(marketItem: MarketItem, buyer: string): Promise<boolean> {
    if (!marketItem || !buyer) {
      return false
    }
    const signature = marketItem.signature
    const { r, s, v } = splitSignature(signature)
    const splitValue = [
      marketItem.seller.toString(),
      marketItem.erc721.toString(),
      marketItem.erc20.toString(),
      marketItem.tokenId.toString(),
      marketItem.startPrice.toString(),
      marketItem.endPrice.toString(),
      marketItem.start.toString(),
      marketItem.deadline.toString(),
    ]
    return this.contract.verify(splitValue, buyer, v.toString(), r.toString(), s.toString())
  }
  public async isExecuted(marketItem?: MarketItem): Promise<boolean> {
    if (!marketItem) {
      return false
    }
    const splitValue = [
      marketItem.seller.toString(),
      marketItem.erc721.toString(),
      marketItem.erc20.toString(),
      marketItem.tokenId.toString(),
      marketItem.startPrice.toString(),
      marketItem.endPrice.toString(),
      marketItem.start.toString(),
      marketItem.deadline.toString(),
    ]
    return this.contract.isExecuted(splitValue)
  }
  public async computeSigner(marketItem?: MarketItem): Promise<string> {
    if (!marketItem) {
      return ''
    }
    const signature = marketItem.signature
    const { r, s, v } = splitSignature(signature)
    const splitValue = [
      marketItem.seller.toString(),
      marketItem.erc721.toString(),
      marketItem.erc20.toString(),
      marketItem.tokenId.toString(),
      marketItem.startPrice.toString(),
      marketItem.endPrice.toString(),
      marketItem.start.toString(),
      marketItem.deadline.toString(),
    ]
    return this.contract.computeSigner(splitValue, v.toString(), r.toString(), s.toString())
  }
  public async swap(signer: Signer, marketItem: MarketItem): Promise<Transaction> {
    const signature = marketItem.signature
    const { r, s, v } = splitSignature(signature)
    const splitValue = [
      marketItem.seller.toString(),
      marketItem.erc721.toString(),
      marketItem.erc20.toString(),
      marketItem.tokenId.toString(),
      marketItem.startPrice.toString(),
      marketItem.endPrice.toString(),
      marketItem.start.toString(),
      marketItem.deadline.toString(),
    ]
    return this.contract
      .connect(signer)
      .swap(splitValue, v.toString(), r.toString(), s.toString(), {
        value: marketItem.currency.isNative ? marketItem.startPrice.toString() : 0,
      })
  }
}
