import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers } from 'ethers'
import { BBTCNV_REDEMPTION_V2_ABI } from 'src/abis'
import { BBTCNV_REDEMPTION_V2 } from 'src/constants'
import { ChainId } from 'src/enums'

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

  /**
   It's not correct connect signer before reading a contract function
   but the unique way to read bbt redemption functions on mainnet
   it's connecting the signer before, we don't know why yet, but for now it's working
  */
  public async redeemable(signer: ethers.Signer, address: string): Promise<BigNumber> {
    if (this.provider.network.chainId === ChainId.ETHEREUM) {
      return this.bbtCNVContract.connect(signer).redeemable(address)
    }
    return this.bbtCNVContract.redeemable(address)
  }
  public async redeemed(signer: ethers.Signer, address: string): Promise<BigNumber> {
    if (this.provider.network.chainId === ChainId.ETHEREUM) {
      return this.bbtCNVContract.connect(signer).redeemed(address)
    }
    return this.bbtCNVContract.redeemed(address)
  }
  public async redeem(
    signer: ethers.Signer,
    amount: BigNumber,
    address: string,
    redeemMax?: boolean,
  ): Promise<ethers.Transaction & { wait: (confirmations) => unknown }> {
    return this.bbtCNVContract.connect(signer).redeem(amount, address, redeemMax)
  }
}
