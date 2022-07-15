import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { FIXED_ORDER_MARKET_CONTRACT } from '@concave/core'
import { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { FixedOrderMarketAbi } from './FixedOrderMarketAbi'

export class TestContract {
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

  public executeSetIfSignatureMatch(
    si: ethers.Signer,
    {
      v,
      r,
      s,
      signer,
      deadline,
      x,
    }: { r: string; s: string; v: number; signer: string; deadline: number; x: number },
  ) {
    return this.contract.connect(si).executeSetIfSignatureMatch(v, r, s, signer, deadline, x)
  }
}
