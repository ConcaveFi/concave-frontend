import { BigNumber, BigNumberish, ethers, Contract } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { StakingV1Abi } from './StakingV1Abi'
import { BaseProvider } from '@ethersproject/providers'
import { STAKING_CONTRACT } from '@concave/core'
import { Position, StakePool, StakingPosition, StakingReward } from 'src/entities'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    if (!provider.network.chainId)
      throw 'ChainID is undefined for constructor of contract StakingV1Contract'
    const address = STAKING_CONTRACT[provider.network.chainId]
    if (!address) throw 'Address is undefined for constructor of contract StakingV1Contract'
    this.contract = new Contract(address, StakingV1Abi, this.provider)
  }

  public async viewStakingCap(tokenId: BigNumberish): Promise<BigNumber> {
    return this.contract.viewStakingCap(tokenId.toString())
  }

  public async viewPositionRewards(tokenId: BigNumberish): Promise<StakingReward> {
    const rewards = await this.contract.viewPositionRewards(tokenId)
    return new StakingReward(rewards)
  }

  public async lock(
    signer: ethers.Signer,
    address: string,
    amount: BigNumberish,
    poolId: BigNumberish,
  ): Promise<ethers.Transaction & { wait: (confirmations) => unknown }> {
    return this.contract.connect(signer).lock(address, amount, poolId)
  }

  public async getApproved(tokenId: BigNumberish): Promise<string[]> {
    return this.contract.getApproved(tokenId)
  }

  public async approve(
    signer: ethers.Signer,
    address: string,
    tokenId: BigNumberish,
  ): Promise<BigNumber> {
    return this.contract.connect(signer).approve(address, tokenId)
  }

  public async pools(index: string): Promise<StakePool> {
    return this.contract.pools(index).then((p) => ({ ...p }))
  }

  public async positions(tokenId: BigNumberish): Promise<Position> {
    return this.contract.positions(tokenId).then((p: Position) => ({ ...p }))
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address)
  }
}
