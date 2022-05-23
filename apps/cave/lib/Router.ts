import { BigNumber, ethers } from 'ethers'
import { CurrencyAmount, ROUTER_ADDRESS, Token } from '@concave/core'
import { concaveProvider } from 'lib/providers'
import { contractABI } from 'lib/contractoABI'
import { parseUnits } from 'ethers/lib/utils'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'

export class Router {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number, private readonly signer: ethers.Signer) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(ROUTER_ADDRESS[chainId], contractABI, this.provider)
  }
  public async addLiquidityETH(
    ethAmount: BigNumber,
    tokenAmount: CurrencyAmount<Token>,
    to: string,
    extra: {
      gasLimit?: number
    } = {},
  ): Promise<ethers.Transaction> {
    const deadLine = Math.round(Date.now() / 1000) + 86400
    const tmp = this.contract.connect(this.signer)
    return tmp.addLiquidityETH(
      tokenAmount.currency.address,
      parseUnits(tokenAmount.toFixed(tokenAmount.currency.decimals)),
      '0',
      '0',
      to,
      deadLine,
      { ...extra, value: ethAmount.sub(9000000000000).toString() },
    )
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
    if (amountA.currency.isNative) {
      return this.addLiquidityETH(
        parseUnits(amountA.toFixed(amountA.currency.wrapped.decimals)),
        amountB,
        to,
        extra,
      )
    }
    if (amountB.currency.isNative) {
      return this.addLiquidityETH(
        parseUnits(amountB.toFixed(amountB.currency.wrapped.decimals)),
        amountA,
        to,
        extra,
      )
    }
    return this.contract
      .connect(this.signer)
      .addLiquidity(
        amountA.currency.wrapped.address,
        amountB.currency.wrapped.address,
        parseUnits(amountA.toFixed(amountA.currency.decimals)),
        parseUnits(amountA.toFixed(amountA.currency.decimals)),
        parseUnits('0', amountA.currency.decimals),
        parseUnits('0', amountA.currency.decimals),
        to,
        deadLine,
        { ...extra, gasPrice: 50000000, value: 0.01 },
      )
  }

  public async removeLiquidity(
    tokenA: Token,
    tokenB: Token,
    liquidity: BigNumber,
    to: string,
    extra: {
      gasLimit?: number
    } = {},
  ): Promise<ethers.Transaction> {
    const deadLine = Math.round(Date.now() / 1000) + 86400
    return this.contract
      .connect(this.signer)
      .removeLiquidity(
        tokenA.address,
        tokenB.address,
        liquidity,
        parseUnits(`0`, tokenA.decimals),
        parseUnits(`0`, tokenB.decimals),
        to,
        deadLine,
        extra,
      )
  }

  public async removeLiquidityETH(
    token: Token,
    liquidity: BigNumber,
    to: string,
    extra: {
      gasLimit?: number
    } = {},
  ): Promise<ethers.Transaction> {
    const deadLine = Math.round(Date.now() / 1000) + 86400
    return this.contract
      .connect(this.signer)
      .removeLiquidityETH(
        token.address,
        liquidity,
        parseUnits(`0`, token.decimals),
        parseUnits(`0`, 18),
        to,
        deadLine,
        extra,
      )
  }
}
