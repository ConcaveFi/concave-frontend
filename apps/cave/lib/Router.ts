import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'
import { Currency, CurrencyAmount, RouterAbi, ROUTER_ADDRESS, Token } from '@concave/core'
import { PermitSignature } from '@concave/gemswap-sdk'
import { BigNumber, ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { concaveProvider } from 'lib/providers'

export class Router {
  private readonly contract: ethers.Contract
  private readonly provider: MulticallProvider

  constructor(chainId: number, private readonly signer: ethers.Signer) {
    this.provider = concaveProvider(chainId)
    this.contract = new ethers.Contract(ROUTER_ADDRESS[chainId], RouterAbi, this.provider)
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
      tokenAmount.quotient.toString(),
      0,
      0,
      to,
      deadLine,
      { ...extra, value: ethAmount },
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
        amountA.quotient.toString(),
        amountB.quotient.toString(),
        0,
        0,
        to,
        deadLine,
        { ...extra },
      )
  }

  public async removeLiquidity(
    amountA: CurrencyAmount<Currency>,
    amountB: CurrencyAmount<Currency>,
    liquidity: BigNumber,
    to: string,
    signature?: PermitSignature,
  ): Promise<ethers.Transaction> {
    if (amountB.currency.isNative || amountA.currency.isNative) {
      return this.removeLiquidityETH([amountA, amountB], liquidity, to, signature)
    }
    if (signature)
      return this.contract
        .connect(this.signer)
        .removeLiquidityWithPermit(
          amountA.currency.wrapped.address,
          amountB.currency.wrapped.address,
          liquidity,
          amountA.quotient.toString(),
          amountB.quotient.toString(),
          to,
          signature.deadline,
          false,
          signature.v,
          signature.r,
          signature.s,
        )
    return this.contract
      .connect(this.signer)
      .removeLiquidity(
        amountA.currency.wrapped.address,
        amountB.currency.wrapped.address,
        liquidity,
        amountA.quotient.toString(),
        amountB.quotient.toString(),
        to,
        Math.floor(Date.now() / 1000 + 300),
      )
  }

  private async removeLiquidityETH(
    [amountA, amountB]: CurrencyAmount<Currency>[],
    liquidity: BigNumber,
    to: string,
    signature?: PermitSignature,
  ): Promise<ethers.Transaction> {
    const [nativeAmount, tokenAmount] = amountA.currency.isNative
      ? [amountA, amountB.wrapped]
      : [amountB, amountA.wrapped]

    if (signature)
      return this.contract
        .connect(this.signer)
        .removeLiquidityETHWithPermit(
          tokenAmount.currency.address,
          liquidity,
          tokenAmount.quotient.toString(),
          nativeAmount.quotient.toString(),
          to,
          signature.deadline,
          false,
          signature.v,
          signature.r,
          signature.s,
        )
    return this.contract
      .connect(this.signer)
      .removeLiquidityETH(
        tokenAmount.currency.address,
        liquidity,
        tokenAmount.quotient.toString(),
        nativeAmount.quotient.toString(),
        to,
        Math.floor(Date.now() / 1000 + 300),
      )
  }
}
