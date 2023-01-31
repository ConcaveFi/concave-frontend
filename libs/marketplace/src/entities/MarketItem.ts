import { Currency, CurrencyAmount } from '@concave/core'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

type Address = `0x${string}`

type MarketArgs = {
  seller: Address
  erc721: Address
  currency: Currency
  tokenId: BigNumberish
  startPrice: BigNumberish
  endPrice: BigNumberish
  start: BigNumberish
  deadline: BigNumberish
  isListed: boolean
  signature: string
}

/**
 *
 * @notice              Struct containing metadata for a ERC721 <-> ERC20 trade.
 *
 * @param seller        The address of the account that wants to sell their
 *                      'erc721' in exchange for 'price' denominated in 'erc20'.
 *
 * @param erc721        The address of a contract that follows the ERC-721 standard,
 *                      also the address of the collection that holds the token that
 *                      you're purchasing.
 *
 * @param erc20         The address of a contract that follows the ERC-20 standard,
 *                      also the address of the token that the seller wants in exchange
 *                      for their 'erc721'
 *
 * @dev                 If 'erc20' is equal to address(0), we assume the seller wants
 *                      native ETH in exchange for their 'erc721'.
 *
 * @param tokenId       The 'erc721' token identification number, 'tokenId'.
 *
 * @param startPrice    The starting or fixed price the offered 'erc721' is being sold for,
 *                      if ZERO we assume the 'seller' is hosting a dutch auction.
 *
 * @dev                 If a 'endPrice' and 'start' time are both defined, we assume
 *                      the order type is a dutch auction. So 'startPrice' would be
 *                      the price the auction starts at, otherwise 'startPrice' is
 *                      the fixed cost the 'seller' is charging.
 *
 * @param endPrice      The 'endPrice' is the price in which a dutch auction would no
 *                      no longer be valid after.
 *
 * @param start         The time in which the dutch auction starts, if ZERO we assume
 *                      the 'seller' is hosting a dutch auction.
 *
 * @param deadline      The time in which the signature/swap is not valid after.
 */
export class MarketItem {
  readonly seller: Address
  readonly erc721: Address
  readonly tokenId: BigNumber
  readonly startPrice: BigNumber
  readonly endPrice: BigNumber
  readonly start: BigNumber
  readonly deadline: BigNumber
  readonly isListed: boolean
  readonly signature: string
  readonly currency: Currency

  constructor(args: MarketArgs) {
    this.seller = args.seller
    this.erc721 = args.erc721
    this.currency = args.currency
    this.tokenId = BigNumber.from(args.tokenId || 0)
    this.startPrice = BigNumber.from(args.startPrice || 0)
    this.endPrice = BigNumber.from(args.endPrice || 0)
    this.start = BigNumber.from(args.start || 0)
    this.deadline = BigNumber.from(args.deadline || 0)
    this.isListed = args.isListed
    this.signature = args.signature
  }
  get erc20(): Address {
    if (!this.currency) {
      return `` as Address
    }
    if (this.currency.isNative) {
      return `0x0000000000000000000000000000000000000000`
    }
    return this.currency.wrapped.address as Address
  }
  public new(parial: Partial<MarketArgs> = {}) {
    return new MarketItem({ ...this, ...parial })
  }
  get currencyAmount() {
    return CurrencyAmount.fromRawAmount(this.currency, this.startPrice.toString())
  }
  get datatypeForSignature() {
    return {
      SwapMetadata: [
        { name: 'seller', type: 'address' },
        { name: 'erc721', type: 'address' },
        { name: 'erc20', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'startPrice', type: 'uint256' },
        { name: 'endPrice', type: 'uint256' },
        { name: 'start', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    }
  }

  get dataForSignature() {
    return {
      seller: this.seller,
      erc721: this.erc721,
      erc20: this.erc20,
      tokenId: this.tokenId.toString(),
      startPrice: this.startPrice.toString(),
      endPrice: this.endPrice.toString(),
      start: this.start.toString(),
      deadline: this.deadline,
    }
  }

  get type() {
    if (this.startPrice.eq(0)) {
      return 'dutch auction'
    }
    if (this.endPrice.gt(0) && this.start.gt(0)) {
      return 'dutch auction'
    }
    return 'list'
  }
}
