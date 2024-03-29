import { BaseProvider, TransactionResponse } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'
import { ACNV_REDEMPTION_ABI } from '../abis'
import { ACNV_REDEEMPTION } from '../constants'
import { ChainId } from '../enums'

export class ACNVRedeemContract {
  private readonly aCNVContract: Contract
  constructor(private readonly provider: BaseProvider) {
    if (!provider) {
      throw 'Provider is undefined for constructor of ACNVRedemptionContract'
    }
    if (
      provider.network.chainId !== ChainId.ETHEREUM &&
      provider.network.chainId !== ChainId.LOCALHOST
    ) {
      throw 'Unsupported network provider for ACNVRedeemContract constructor'
    }
    const chainID = this.provider.network.chainId
    this.aCNVContract = new Contract(ACNV_REDEEMPTION[chainID], ACNV_REDEMPTION_ABI, this.provider)
  }
  public async redeem(signer: Signer, address: string): Promise<TransactionResponse> {
    console.log(signer, address)
    return this.aCNVContract.connect(signer).redeem(address)
  }
}
