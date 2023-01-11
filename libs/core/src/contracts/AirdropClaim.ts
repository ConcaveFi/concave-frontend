import { BaseProvider, TransactionResponse } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import { AIRDROP_CLAIM_ABI } from '../abis/AirdropClaimAbi'
import { AIRDROP_CLAIM, AIRDROP_CLAIM_Q4 } from '../constants'

export class AirdropClaimContract {
  private readonly airdropClaimContract: ethers.Contract
  constructor(private readonly provider: BaseProvider, private readonly season: 'Q4' | 'special') {
    if (!provider) {
      throw 'Provider is undefined for constructor of AirdropClaimContract'
    }
    const chainID = this.provider.network.chainId
    const contractAddress =
      season === 'special' ? AIRDROP_CLAIM[chainID] : AIRDROP_CLAIM_Q4[chainID]
    this.airdropClaimContract = new Contract(contractAddress, AIRDROP_CLAIM_ABI, this.provider)
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
