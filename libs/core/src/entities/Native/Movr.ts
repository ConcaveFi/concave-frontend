import invariant from 'tiny-invariant'
import { WNATIVE } from '../../constants/tokens'
import { Currency, NativeCurrency, Token } from '../index'

export class Movr extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'MOVR', 'Moonriver')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: Movr } = {}

  public static onChain(chainId: number): Movr {
    return this._cache[chainId] ?? (this._cache[chainId] = new Movr(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
