import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { StakingV1ProxyAddress } from './Address'
import { StakingV1Abi } from './ContractABI'
import { Position } from './Position'
import { Pool } from './Pool'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(StakingV1ProxyAddress[chainId], StakingV1Abi, this.provider)
  }

  public async viewStakingCap(poolNum: number | string): Promise<BigNumber> {
    return this.contract.viewStakingCap(poolNum)
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
    return this.contract.pools(index)
  }

  public async positions(index: BigNumberish): Promise<Position> {
    return this.contract.positions(index)
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address)
  }
}
