import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { MARKETPLACE_CONTRACT } from '@concave/core'
import { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { ContractABI } from './NFTMarketplaceAbi'

export class FixedOrderMarketContract {
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
}
