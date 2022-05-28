import { AbstractCurrency } from './AbstractCurrency'
import { Currency } from './currency'

/**
 * Represents the native currency of the chain on which it resides, e.g.
 */
export abstract class NativeCurrency extends AbstractCurrency {
  public readonly isNative: true = true
  public readonly isToken: false = false

  /**
   * Returns true if the two currencies are equivalent, i.e. both native with same chainId.
   * @param other other currency to compare
   */
  public equals(other: Currency): boolean {
    return other.isNative && this.chainId === other.chainId
  }
}
