import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { StakingV1ProxyAddress } from './Address'
import { StakingV1Abi } from './ContractABI'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number, private readonly signer?: ethers.Signer) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(StakingV1ProxyAddress[chainId], StakingV1Abi, this.provider)
    if (this.signer) this.contract.connect(this.signer)
  }

  public async viewStakingCap(poolNum: number | string): Promise<BigNumber> {
    return this.contract.viewStakingCap(poolNum)
  }

  public async lock(
    address: string,
    amount: BigNumberish,
    poolId: BigNumberish,
  ): Promise<ethers.Transaction & { wait: (confirmations) => unknown }> {
    return this.contract.connect(this.signer).lock(address, amount, poolId)
  }

  public async pools(index: string): Promise<{
    balance: BigNumber
    excessRatio: BigNumber
    g: BigNumber
    rewardsPerShare: BigNumber
    supply: BigNumber
    term: BigNumber
  }> {
    const pools = await this.contract.pools(index)
    return { ...pools }
  }

  public async positions(index: BigNumberish): Promise<{
    deposit: BigNumber
    maturity: number
    poolID: number
    rewardDebt: BigNumber
    shares: BigNumber
  }> {
    return this.contract.positions(index)
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address)
  }
}
