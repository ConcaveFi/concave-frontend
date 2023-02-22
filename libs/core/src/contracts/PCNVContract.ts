import { BaseProvider, TransactionResponse } from '@ethersproject/providers'
import { BigNumber, BigNumberish, Contract, Signer } from 'ethers'
import { PCNV_REDEMPTION_ABI } from '../abis/PcnvRedemptionAbi'
import { PCNV_ADDRESS } from '../constants'

export class PCNVContract {
  private readonly pCNVContract: Contract
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
    signer: Signer,
    amount: BigNumberish,
    address: string,
    to: string,
    redeemMax?: boolean,
  ): Promise<TransactionResponse> {
    console.table([amount, address, to, redeemMax])
    return this.pCNVContract.connect(signer).redeem(amount, address, to, redeemMax)
  }
  public async vestedPercent(time: number): Promise<BigNumber> {
    return this.pCNVContract.vestedPercent(time)
  }
}
