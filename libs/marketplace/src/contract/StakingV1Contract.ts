import { STAKING_CONTRACT } from '@concave/core'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { Contract } from '@ethersproject/contracts'
import { PoolState, Position, StakingReward } from '../entities'
import { StakingV1Abi } from './StakingV1Abi'
import { Signer } from '@wagmi/core'

export class StakingV1Contract {
  private readonly contract: Contract
  public readonly chainId: number
  public readonly address: `0x${string}`
  constructor(private readonly provider: BaseProvider) {
    this.chainId = provider.network.chainId
    if (!this.chainId) throw 'ChainID is undefined for constructor of contract StakingV1Contract'
    this.address = STAKING_CONTRACT[this.chainId]
    if (!this.address) throw 'Address is undefined for constructor of contract StakingV1Contract'
    this.contract = new Contract(this.address, StakingV1Abi, this.provider)
  }

  public async viewStakingCap(tokenId: BigNumberish): Promise<BigNumber> {
    return this.contract.viewStakingCap(tokenId.toString())
  }

  public async viewPositionRewards(tokenId: BigNumberish): Promise<StakingReward> {
    const rewards = await this.contract.viewPositionRewards(tokenId)
    return new StakingReward(rewards)
  }

  public async lock(
    signer: Signer,
    address: string,
    amount: BigNumberish,
    poolId: BigNumberish,
    signature?: {
      deadline?: number
      v: number
      r: string
      s: string
    },
  ): Promise<TransactionResponse & { wait: (confirmations:unknown) => unknown }> {
    if (signature) {
      return this.lockWithPermit(signer, address, amount, poolId, signature)
    }
    return this.contract.connect(signer).lock(address, amount, poolId)
  }
  public async lockWithPermit(
    signer: Signer,
    address: string,
    amount: BigNumberish,
    poolId: BigNumberish,
    {
      deadline,
      r,
      s,
      v,
    }: {
      deadline?: number
      v: number
      r: string
      s: string
    },
  ): Promise<TransactionResponse & { wait: (confirmations:unknown) => unknown }> {
    return this.contract.connect(signer).lockWithPermit(address, amount, poolId, deadline, v, r, s)
  }

  public async unlock(
    signer: Signer,
    address: string,
    tokenId: BigNumberish,
  ): Promise<TransactionResponse & { wait: (confirmations:unknown) => unknown }> {
    return this.contract.connect(signer).unlock(address, tokenId)
  }

  public async getApproved(tokenId: BigNumberish): Promise<string[]> {
    return this.contract.getApproved(tokenId)
  }

  public async approve(
    signer: Signer,
    address: string,
    tokenId: BigNumberish,
  ): Promise<TransactionResponse> {
    return this.contract.connect(signer).approve(address, tokenId)
  }

  public async setApprovalForAll(
    signer: Signer,
    address: string,
    bool: boolean,
  ): Promise<TransactionResponse> {
    return this.contract.connect(signer).setApprovalForAll(address, bool)
  }

  public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    return this.contract.isApprovedForAll(owner, operator)
  }

  public async pools(poolId: number): Promise<PoolState> {
    return this.contract.pools(poolId).then((p: any) => new PoolState({ poolId, ...p }))
  }

  public async positions(tokenId: BigNumberish): Promise<Position> {
    return this.contract.positions(tokenId).then((p: Position) => ({ ...p }))
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address)
  }
}
