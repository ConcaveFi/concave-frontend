import { Currency, CurrencyAmount, Percent, Token, validateAndParseAddress } from '@concave/core'
import { BigNumberish } from '@ethersproject/bignumber'
import invariant from 'tiny-invariant'
import { Trade, TradeType } from './entities'

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {
  /**
   * How much the execution price is allowed to move unfavorably from the trade execution price.
   */
  allowedSlippage: Percent
  /**
   * How long the swap is valid until it expires, in seconds.
   * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
   * are generated.
   */
  deadline: number

  /**
   * The account that should receive the output of the swap.
   */
  recipient: string

  /**
   * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
   */
  feeOnTransfer?: boolean

  /**
   * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
   * are generated.
   */
  ttl: number
  /**
   * Signature, if present it will use other method
   */
  signature?: PermitSignature | PermitAllowSignature
}

type VSR = {
  v: number
  r: string
  s: string
}
export type PermitSignature = VSR & {
  owner: string
  spender: string
  value: BigNumberish
  deadline: BigNumberish
}

export type PermitAllowSignature = VSR & {
  holder: string
  spender: string
  nonce: BigNumberish
  expiry: BigNumberish
  allowed: boolean
}

/**
 * The parameters to use in the call to the Uniswap V2 Router to execute a trade.
 */
export interface SwapParameters {
  /**
   * The method to call on the Uniswap V2 Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | number | string[])[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

export function toHex(currencyAmount: CurrencyAmount<Currency>) {
  return `0x${currencyAmount.quotient.toString(16)}`
}

const ZERO_HEX = '0x0'

const decoreWithPermit = (
  method: string,
  args: (string | number | string[])[],
  { signature }: TradeOptions,
): [string, (string | number | string[])[]] => {
  if (!signature) {
    return [method, args]
  }
  const { v, r, s } = signature
  if (`owner` in signature) {
    return [`${method}UsingPermit`, [...args, v, r, s]]
  }
  if ('holder' in signature) {
    return [`${method}UsingPermitAllowed`, [...args, signature.nonce.toString(), v, r, s]]
  }
}
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */
export abstract class Router {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(trade: Trade, options: TradeOptions): SwapParameters {
    const etherIn = trade.inputAmount.currency.isNative
    const etherOut = trade.outputAmount.currency.isNative
    invariant(!(etherIn && etherOut), 'ETHER_IN_OUT')
    const to = validateAndParseAddress(options.recipient)
    const amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage))
    const amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage))
    const path = trade.route.path.map((token: Token) => token.address)

    const deadline = options.deadline || Math.floor(Date.now() / 1000 + options.ttl)

    const isExactInput = trade.tradeType === TradeType.EXACT_INPUT

    let methodName = ''
    {
      methodName += isExactInput ? 'swapExact' : 'swap'

      if (etherIn) methodName += 'ETHForTokens'
      else if (etherOut) methodName += 'TokensForETH'
      else methodName += 'TokensForTokens'

      if (isExactInput && !!options.feeOnTransfer && !options.signature)
        methodName += 'SupportingFeeOnTransferTokens'
    }

    const args = [etherIn ? undefined : amountIn, amountOut, path, to, deadline].filter(Boolean)
    const value = etherIn ? amountIn : ZERO_HEX

    const [permitMethod, permitArgs] = decoreWithPermit(methodName, args, options)
    return {
      methodName: permitMethod,
      args: permitArgs,
      value,
    }
  }
}
