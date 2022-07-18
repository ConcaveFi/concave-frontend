import { BaseProvider } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import { ACNV_REDEMPTION_ABI } from 'src/abis'
import { ACNV_REDEEMPTION } from 'src/constants'

export class ACNVRedeemContract {
  private readonly aCNVContract: ethers.Contract
  constructor(private readonly provider: BaseProvider) {
    if (!provider) {
      throw 'Provider is undefined for constructor of ACNVRedemptionContract'
    }
    const chainID = this.provider.network.chainId
    this.aCNVContract = new Contract(ACNV_REDEEMPTION[chainID], ACNV_REDEMPTION_ABI, this.provider)
  }
  public async redeem(signer: ethers.Signer, address: string): Promise<ethers.Transaction> {
    return this.aCNVContract.connect(signer).redeem(address)
  }
}
