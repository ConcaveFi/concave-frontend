import { BigNumber, BigNumberish, ethers, Contract } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { StakingV1Abi } from './StakingV1Abi'
import { Pool, Position, UserReward, StakingV1ProxyAddress } from '@concave/marketplace-sdk'
import { BaseProvider } from '@ethersproject/providers'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract StakingV1Contract'
    const address = StakingV1ProxyAddress[provider.network.chainId]
    if (!address) throw 'Address is undefined for constructor of contract StakingV1Contract'
    this.contract = new Contract(address, StakingV1Abi, this.provider)
  }

  public async viewStakingCap(tokenId: BigNumberish): Promise<BigNumber> {
    return this.contract.viewStakingCap(tokenId.toString())
  }

  public async viewPositionRewards(tokenId: BigNumberish): Promise<UserReward> {
    const rewards = await this.contract.viewPositionRewards(tokenId)
    return { ...rewards }
  }

  public async lock(
    signer: ethers.Signer,
    address: string,
    amount: BigNumberish,
    poolId: BigNumberish,
  ): Promise<ethers.Transaction & { wait: (confirmations) => unknown }> {
    return this.contract.connect(signer).lock(address, amount, poolId)
  }

  public async pools(index: string): Promise<Pool> {
    return this.contract.pools(index).then((p) => ({ ...p }))
  }

  public async positions(index: BigNumberish): Promise<Position> {
    return this.contract.positions(index).then((p) => ({ ...p }))
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address)
  }
}
