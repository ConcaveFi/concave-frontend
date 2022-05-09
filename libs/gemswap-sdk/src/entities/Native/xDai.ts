import { Currency } from '../currency'
import { NativeCurrency } from '../nativeCurrency'
import { Token } from '../token'
import { WNATIVE } from '../../constants/tokens'
import invariant from 'tiny-invariant'

export class xDai extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'XDAI', 'xDai')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: xDai } = {}

  public static onChain(chainId: number): xDai {
    return this._cache[chainId] ?? (this._cache[chainId] = new xDai(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
