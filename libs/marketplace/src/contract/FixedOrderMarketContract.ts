import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { FIXED_ORDER_MARKET_CONTRACT } from '@concave/core'
import { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { MarketItem } from 'src/entities'
import { FixedOrderMarketAbi } from './FixedOrderMarketAbi'

export class FixedOrderMarketContract {
  private readonly contract: ethers.Contract
  public readonly address: string
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    console.log(provider.network.chainId)
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract FixedOrderMarketContract'
    this.address = FIXED_ORDER_MARKET_CONTRACT[provider.network.chainId]
    if (!this.address)
      throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.contract = new ethers.Contract(this.address, FixedOrderMarketAbi, this.provider)
  }

  public getContract() {
    return this.contract
  }

  public async computeSigner(marketItem: MarketItem) {
    console.log(marketItem)
    const signature = marketItem.signature
    const r = '0x' + signature.substring(0, 64)
    const s = '0x' + signature.substring(64, 128)
    const v = parseInt(signature.substring(128, 130), 16)
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
    console.log(JSON.stringify({ nonce: marketItem.nonce, r, s, v, splitValue }))

    return this.contract.computeSigner(
      splitValue,
      marketItem.nonce.toString(),
      v.toString(),
      r.toString(),
      s.toString(),
    )
  }
}
