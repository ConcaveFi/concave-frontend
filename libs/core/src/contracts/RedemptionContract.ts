import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { BaseProvider, TransactionResponse } from '@ethersproject/providers'
import { BigNumber, BigNumberish, Contract, Signer } from 'ethers'

const ABI = [
  'constructor(address _bbtCNV, address _CNV, address _redeemBBTV1)',
  'function redeem(uint256 _amount, address _to, bool _max) returns (uint256 amountOut)',
  'function redeemable(address _who) view returns (uint256)',
  'function redeemed(address) view returns (uint256)',
  'function vestedPercent(uint256 _time) pure returns (uint256 vpct)',
]

export class RedemptionContract {
  private readonly contract: Contract
  constructor(address: string, provider: BaseProvider | MulticallProvider) {
    if (!provider) {
      throw 'Provider is undefined to constructor of BBTRedemptionContractV2'
    }
    this.contract = new Contract(
      address,
      ABI,
      provider,
    )
  }

  public async redeemable(address: string): Promise<BigNumber> {
    return this.contract.redeemable(address)
  }

  public async redeemed(address: string): Promise<BigNumber> {
    return this.contract.redeemed(address)
  }

  public async redeem(
    signer: Signer,
    amount: BigNumberish,
    address: string,
    redeemMax?: boolean,
  ): Promise<TransactionResponse> {
    console.log([amount, address, redeemMax, signer])
    return this.contract.connect(signer).redeem(amount, address, true)
  }

  public async vestedPercent(time: number = Math.floor(Date.now() / 1000)): Promise<BigNumber> {
    return this.contract.vestedPercent(time)
  }
}
