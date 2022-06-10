import { BigNumber, BigNumberish, ethers, Contract } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { StakingV1Abi } from './ContractABI'
import { Pool, Position, UserReward } from '@concave/marketplace-sdk'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number) {
    if (!chainId) throw 'ChainID is undefined for constructor of contract StakingV1Contract'
    const address = 'StakingV1ProxyAddress[chainId]'
    if (!address) throw 'Address is undefined for constructor of contract StakingV1Contract'
    this.provider = concaveProvider(chainId)
    this.contract = new Contract(address, StakingV1Abi, this.provider)
  }

  public async viewStakingCap(tokenId: BigNumberish): Promise<BigNumber> {
    console.log(tokenId.toString())
    return this.contract.viewStakingCap(tokenId.toString())
  }

  public async viewPositionRewards(tokenId: BigNumberish): Promise<UserReward> {
    const rewards = await this.contract.viewPositionRewards(tokenId)
    // to remove array props
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
