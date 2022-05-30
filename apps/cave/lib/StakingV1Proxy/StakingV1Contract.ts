import { BigNumber, BigNumberish, ethers, Contract } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { StakingV1ProxyAddress } from './Address'
import { StakingV1Abi } from './ContractABI'
import { Position } from './Position'
import { Pool } from './Pool'
import { UserReward } from './UserReward'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number) {
    this.provider = concaveProvider(chainId)
    if (!chainId) throw 'ChainID is undefined for constructor of contract StakingV1Contract'
    const address = StakingV1ProxyAddress[chainId]
    if (!address) throw 'Address is undefined for constructor of contract StakingV1Contract'
    this.contract = new Contract(address, StakingV1Abi, this.provider)
  }

  public async viewStakingCap(poolNum: number | string): Promise<BigNumber> {
    return this.contract.viewStakingCap(poolNum)
  }

  public async viewPositionRewards(tokenId: number): Promise<UserReward> {
    return this.contract.viewPositionRewards(tokenId)
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
