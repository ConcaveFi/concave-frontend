import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { STAKING_CONTRACT } from '@concave/core'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber, BigNumberish, Contract, ethers } from 'ethers'
import { PoolState, Position, StakingReward } from 'src/entities'
import { StakingV1Abi } from './StakingV1Abi'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  public readonly chainId: number
  constructor(private readonly provider: BaseProvider | MulticallProvider) {
    this.chainId = provider.network.chainId
    if (!this.chainId) throw 'ChainID is undefined for constructor of contract StakingV1Contract'
    const address = STAKING_CONTRACT[this.chainId]
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

  public async unlock(
    signer: ethers.Signer,
    address: string,
    tokenId: BigNumberish,
  ): Promise<ethers.Transaction & { wait: (confirmations) => unknown }> {
    return this.contract.connect(signer).unlock(address, tokenId)
  }

  public async getApproved(tokenId: BigNumberish): Promise<string[]> {
    return this.contract.getApproved(tokenId)
  }

  public async approve(
    signer: ethers.Signer,
    address: string,
    tokenId: BigNumberish,
  ): Promise<ethers.Transaction> {
    return this.contract.connect(signer).approve(address, tokenId)
  }

  public async setApprovalForAll(
    signer: ethers.Signer,
    address: string,
    bool: boolean,
  ): Promise<ethers.Transaction> {
    return this.contract.connect(signer).setApprovalForAll(address, bool)
  }

  public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    return this.contract.isApprovedForAll(owner, operator)
  }

  public async pools(poolId: number): Promise<PoolState> {
    return this.contract.pools(poolId).then((p) => new PoolState({ poolId, ...p }))
  }

  public async positions(tokenId: BigNumberish): Promise<Position> {
    return this.contract.positions(tokenId).then((p: Position) => ({ ...p }))
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address)
  }
}
