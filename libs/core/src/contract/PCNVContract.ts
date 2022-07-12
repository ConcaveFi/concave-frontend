import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers } from 'ethers'
import { RedeemPCNV_Abi } from 'src/abis/vestedTokens/RedeemPCNVAbi'
import { PCNV_CONTRACT } from 'src/constants'

export class PCNVContract {
  private readonly contract: ethers.Contract
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract PCNVContract'
    const contractAdress = PCNV_CONTRACT[provider.network.chainId]
    this.contract = new Contract(contractAdress, RedeemPCNV_Abi, this.provider)
  }

  public async redeemable(address: string): Promise<BigNumber> {
    return this.contract.redeemable(address)
  }
  public async redeemed(address: string): Promise<BigNumber> {
    return this.contract.redeemed(address)
  }

  public async redeem(
    signer: ethers.Signer,
    amount: BigNumber,
    address: string,
    max?: boolean,
  ): Promise<ethers.Transaction> {
    return this.contract.connect(signer).redeem(amount, address, address, max)
  }
}
