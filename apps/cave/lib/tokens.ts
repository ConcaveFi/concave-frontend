import { Token as GemswapToken } from 'gemswap-sdk'

export class Token extends GemswapToken {
  public readonly logoURI?: string
  constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    logoURI?: string,
  ) {
    super(chainId, address, decimals, symbol, name)
    this.logoURI = logoURI
  }
}
