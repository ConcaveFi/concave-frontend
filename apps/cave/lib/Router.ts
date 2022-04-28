import { BigNumber, ethers } from 'ethers'
import { CurrencyAmount, ROUTER_ADDRESS, Token } from 'gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import { contractABI } from 'lib/contractoABI'
import { parseUnits } from 'ethers/lib/utils'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'

export class Router {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number, private readonly singer: ethers.Signer) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(ROUTER_ADDRESS[chainId], contractABI, this.provider)
  }

  public async addLiquidity(
    amountA: CurrencyAmount<Token>,
    amountB: CurrencyAmount<Token>,
    to: string,
    extra: {
      gasLimit?: number
    } = {},
  ): Promise<ethers.Transaction> {
    const deadLine = Math.round(Date.now() / 1000) + 86400
    return this.contract
      .connect(this.singer)
      .addLiquidity(
        amountA.currency.address,
        amountB.currency.address,
        parseUnits(amountA.toFixed(amountA.currency.decimals)),
        parseUnits(amountA.toFixed(amountA.currency.decimals)),
        parseUnits('0', amountA.currency.decimals),
        parseUnits('0', amountA.currency.decimals),
        to,
        deadLine,
        extra,
      )
  }

  public async removeLiquidity(
    tokenA: Token,
    tokenB: Token,
    percentToRemove: BigNumber,
    to: string,
    extra: {
      gasLimit?: number
    } = {},
  ): Promise<ethers.Transaction> {
    const deadLine = Math.round(Date.now() / 1000) + 86400
    return this.contract
      .connect(this.singer)
      .removeLiquidity(
        tokenA.address,
        tokenB.address,
        percentToRemove,
        parseUnits(`0`, tokenA.decimals),
        parseUnits(`0`, tokenB.decimals),
        to,
        deadLine,
        extra,
      )
  }
}
