import { BaseProvider } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import { AIRDROP_CLAIM_ABI } from 'src/abis/AirdropClaimAbi'
import { AIRDROP_CLAIM } from 'src/constants'

export class AirdropClaimContract {
  private readonly airdropClaimContrat: ethers.Contract
  constructor(private readonly provider: BaseProvider) {
    if (!provider) {
      throw 'Provider is undefined for constructor of AirdropClaimContract'
    }
    const chainID = this.provider.network.chainId
    this.airdropClaimContrat = new Contract(
      AIRDROP_CLAIM[chainID],
      AIRDROP_CLAIM_ABI,
      this.provider,
    )
  }
  public async claimed(address: string): Promise<boolean> {
    return this.airdropClaimContrat.claimed(address)
  }

  public async claim(
    signer: ethers.Signer,
    proof: string[],
    amount: ethers.BigNumber,
  ): Promise<void> {
    this.airdropClaimContrat.connect(signer).claim(proof, amount, { gasLimit: 1000000 })
  }
}
