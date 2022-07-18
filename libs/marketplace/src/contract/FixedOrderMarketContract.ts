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

  public getContract() {
    return this.contract
  }

  public async computeSigner({
    value,
    ...props
  }: {
    r: string
    s: string
    v: number
    value: SwapMetadata
  }) {
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
    return this.contract.computeSigner(
      splitValue,
      value.nonce.toString(),
      props.v.toString(),
      props.r.toString(),
      props.s.toString(),
    )
  }

  public async tmpComputeSigner({
    value,
    ...props
  }: {
    r: string
    s: string
    v: number
    value: SwapMetadata
  }) {
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
    return this.contract.tmpComputeSigner(
      splitValue,
      props.r.toString(),
      props.s.toString(),
      props.v.toString(),
    )
  }
}
export type SwapMetadata = {
  seller: string
  erc721: string
  erc20: string
  tokenId: BigNumberish
  startPrice: BigNumberish
  endPrice: BigNumberish
  start: BigNumberish
  deadline: BigNumberish
  nonce: BigNumberish
}
