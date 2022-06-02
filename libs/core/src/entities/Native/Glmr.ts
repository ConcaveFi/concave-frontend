import { Currency } from '../currency'
import { NativeCurrency } from '../nativeCurrency'
import { Token } from '../token'
import { WNATIVE } from '../../constants/tokens'
import invariant from 'tiny-invariant'

export class Glmr extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'GLMR', 'Glimmer')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: Glmr } = {}

  public static onChain(chainId: number): Glmr {
    return this._cache[chainId] ?? (this._cache[chainId] = new Glmr(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
