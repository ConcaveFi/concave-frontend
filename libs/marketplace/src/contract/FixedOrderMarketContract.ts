import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { FIXED_ORDER_MARKET_CONTRACT } from '@concave/core'
import { BigNumberish } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { FixedOrderMarketAbi } from './FixedOrderMarketAbi'

export class FixedOrderMarketContract {
  private readonly contract: ethers.Contract
  public readonly address: string
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract ConcaveNFTMarketplace'
    this.address = FIXED_ORDER_MARKET_CONTRACT[provider.network.chainId]
    if (!this.address)
      throw 'Address is undefined for constructor of contract ConcaveNFTMarketplace'
    this.contract = new ethers.Contract(this.address, FixedOrderMarketAbi, this.provider)
  }

  public computeSigner({ value, ...props }: { r: string; s: string; v: number; value: Value }) {
    const splitValue = [
      value.seller.toString(),
      value.erc721.toString(),
      value.erc20.toString(),
      value.tokenId.toString(),
      value.startPrice.toString(),
      value.endPrice.toString(),
      value.start.toString(),
      value.deadline.toString(),
    ]
    return this.contract.computeSigner(splitValue, 0, props.v, props.r, props.s)
  }
}
type Value = {
  seller: string
  erc721: string
  erc20: string
  tokenId: BigNumberish
  startPrice: BigNumberish
  endPrice: BigNumberish
  nonce: BigNumberish
  start: BigNumberish
  deadline: BigNumberish
}
