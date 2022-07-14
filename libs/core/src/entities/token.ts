import invariant from 'tiny-invariant'
import { validateAndParseAddress } from '../functions/validateAndParseAddress'
import { AbstractCurrency } from './AbstractCurrency'
import { Currency } from './currency'
import { CurrencyAmount } from './currencyAmount'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends AbstractCurrency {
  public readonly address: string

  public readonly isNative: false = false
  public readonly isToken: true = true
  private readonly _totalSupply: string

  public constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    totalSupply?: { toString: () => string },
  ) {
    super(chainId, decimals, symbol, name)
    this.address = validateAndParseAddress(address)
    this._totalSupply = totalSupply?.toString() ?? '0'
  }

  get totalSupply() {
    return CurrencyAmount.fromRawAmount(this, this._totalSupply)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return other.isToken && this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}
