import { chain } from 'wagmi'
import { Token as UniswapToken } from '@uniswap/sdk-core'

class Token extends UniswapToken {
  readonly logoURI?: string
  constructor(token: {
    chainId: number
    address: string
    decimals: number
    symbol?: string
    name?: string
    logoURI?: string
  }) {
    super(token.chainId, token.address, token.decimals, token.symbol, token.name)
    this.logoURI = token.logoURI
  }
}

export const ROPSTEN_WETH = new Token({
  address: '0xc778417e063141139fce010982780140aa0cd5ab',
  chainId: chain.ropsten.id,
  decimals: 18,
  logoURI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  name: 'Wrapped Ether',
  symbol: 'WETH',
})

export const ROPSTEN_DAI = new Token({
  chainId: chain.ropsten.id,
  name: 'Dai Stablecoin',
  address: '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4',
  symbol: 'DAI',
  decimals: 18,
  logoURI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
})

export const ROPSTEN_FRAX = new Token({
  name: 'FRAX',
  address: '0xE7E9F348202f6EDfFF2607025820beE92F51cdAA',
  symbol: 'FRAX',
  decimals: 18,
  logoURI: '/assets/tokens/frax.svg',
  chainId: chain.ropsten.id,
})

export const ROPSTEN_CNV = new Token({
  chainId: chain.ropsten.id,
  address: '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f',
  decimals: 18,
  symbol: 'CNV',
  name: 'Concave',
  logoURI: '/assets/tokens/frax.svg',
})

// tokenA: '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4',
// tokenB: '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f',
// liquidityAddress: '0xb14d541123a7f7276F01A22798caDa7eE1D7F57f',

export const ROPSTEN_STABLES = [ROPSTEN_DAI, ROPSTEN_FRAX]
