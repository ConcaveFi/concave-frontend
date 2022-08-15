import { BaseProvider, TransactionResponse } from '@ethersproject/providers'
import { BigNumber, Contract, ethers } from 'ethers'
import { PCNV_REDEMPTION_ABI } from 'src/abis/PcnvRedemptionAbi'
import { PCNV_ADDRESS } from 'src/constants'

export class PCNVContract {
  private readonly pCNVContract: ethers.Contract
  constructor(private readonly provider: BaseProvider) {
    if (!provider) {
      throw 'Provider is undefined to constructor of pCNVContract.'
    }
    const chainId = provider.network.chainId
    this.pCNVContract = new Contract(PCNV_ADDRESS[chainId], PCNV_REDEMPTION_ABI, provider)
  }

  public async redeemed(address: string): Promise<BigNumber> {
    return this.pCNVContract.redeemed(address)
  }
  public async redeemable(address: string): Promise<BigNumber> {
    return this.pCNVContract.redeemable(address)
  }
  public async redeem(
    signer: ethers.Signer,
    amount: BigNumber,
    address: string,
    redeemMax?: boolean,
  ): Promise<TransactionResponse> {
    return this.pCNVContract.connect(signer).redeem(amount, address, address, redeemMax)
  }
  public async vestedPercent(time: number): Promise<BigNumber> {
    return this.pCNVContract.vestedPercent(time)
  }
}
