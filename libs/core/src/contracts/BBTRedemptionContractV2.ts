import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers } from 'ethers'
import { BBTCNV_REDEMPTION_V2_ABI } from 'src/abis'
import { BBTCNV_REDEMPTION_V2 } from 'src/constants'

export class BBTRedemptionContractV2 {
  private readonly bbtCNVContract: ethers.Contract
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider) {
      throw 'Provider is undefined to constructor of BBTRedemptionContractV2'
    }
    const chaindID = provider.network.chainId
    this.bbtCNVContract = new Contract(
      BBTCNV_REDEMPTION_V2[chaindID],
      BBTCNV_REDEMPTION_V2_ABI,
      provider,
    )
  }
  public async redeemable(address: string): Promise<BigNumber> {
    return this.bbtCNVContract.redeemable(address)
  }
  public async redeemed(address: string): Promise<BigNumber> {
    return this.bbtCNVContract.redeemed(address)
  }
  public async redeem(
    signer: ethers.Signer,
    amount: BigNumber,
    address: string,
    redeemMax?: boolean,
  ): Promise<ethers.Transaction> {
    return this.bbtCNVContract.connect(signer).redeem(amount, address, redeemMax)
  }
}
