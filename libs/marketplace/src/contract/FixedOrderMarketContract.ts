import { MARKETPLACE_CONTRACT } from '@concave/core'
import { BaseProvider } from '@ethersproject/providers'
import { Contract, Signer, Transaction } from 'ethers'
import { splitSignature } from 'ethers/lib/utils'
import { MarketItem } from '../entities'
import { MarketplaceABI } from './MarketplaceAbi'

export class FixedOrderMarketContract {
  private readonly contract: Contract
  public readonly address: string
  constructor(private readonly provider: BaseProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract FixedOrderMarketContract'
    this.address = MARKETPLACE_CONTRACT[provider.network.chainId]
    if (!this.address)
      throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.contract = new Contract(this.address, MarketplaceABI, this.provider)
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
