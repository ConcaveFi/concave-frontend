import { BaseProvider, TransactionResponse } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import { AIRDROP_CLAIM_ABI } from '../abis/AirdropClaimAbi'
import { AIRDROP_CLAIM } from '../constants'

export class AirdropClaimContract {
  private readonly airdropClaimContract: ethers.Contract
  constructor(private readonly provider: BaseProvider) {
    if (!provider) {
      throw 'Provider is undefined for constructor of AirdropClaimContract'
    }
    const chainID = this.provider.network.chainId
    this.airdropClaimContract = new Contract(
      AIRDROP_CLAIM[chainID],
      AIRDROP_CLAIM_ABI,
      this.provider,
    )
  }
  public async claimed(address: string): Promise<boolean> {
    return this.airdropClaimContract.claimed(address)
  }

  public async claim(
    signer: ethers.Signer,
    proof: string[],
    amount: ethers.BigNumber,
  ): Promise<TransactionResponse> {
    return this.airdropClaimContract.connect(signer).claim(proof, amount)
  }
}
