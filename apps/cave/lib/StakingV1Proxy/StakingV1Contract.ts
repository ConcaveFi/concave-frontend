import { BigNumber, BigNumberish, ethers } from 'ethers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { concaveProvider } from 'lib/providers'
import { StakingV1Proxy } from './Address'
import { StakingV1Abi } from './ContractABI'
import { MarketItem } from './MarketItem'

export class StakingV1Contract {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number, private readonly singer?: ethers.Signer) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(StakingV1Proxy[chainId], StakingV1Abi, this.provider)
    if (this.singer) this.contract.connect(this.singer)
  }

  public async lock(address: string, amount: BigNumberish, poolId: BigNumberish) {
    console.table([address, amount, poolId])
    console.log(this.singer)
    return this.contract.connect(this.singer).lock(address, amount, poolId)
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
