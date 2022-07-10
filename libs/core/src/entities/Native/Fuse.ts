import invariant from 'tiny-invariant'
import { WNATIVE } from '../../constants/tokens'
import { Currency } from '../currency'
import { NativeCurrency } from '../nativeCurrency'
import { Token } from '../token'

export class Fuse extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'FUSE', 'Fuse')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: Fuse } = {}

  public static onChain(chainId: number): Fuse {
    return this._cache[chainId] ?? (this._cache[chainId] = new Fuse(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
