import invariant from 'tiny-invariant'
import { WNATIVE } from '../../constants/tokens'
import { Currency } from '../currency'
import { NativeCurrency } from '../nativeCurrency'
import { Token } from '../token'

export class Palm extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'PALM', 'Palm')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: Palm } = {}

  public static onChain(chainId: number): Palm {
    return this._cache[chainId] ?? (this._cache[chainId] = new Palm(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
