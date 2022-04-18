import { Token, ChainId } from 'gemswap-sdk'

export const CNV = new Token(
  ChainId.ETHEREUM,
  '0x000000007a58f5f58E697e51Ab0357BC9e260A04',
  18,
  'CNV',
  'Concave',
)
export const DAI = new Token(
  ChainId.ETHEREUM,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin',
)

export const WETH = new Token(
  ChainId.ETHEREUM,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether',
)
export const USDT = new Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
)
export const USDC = new Token(
  ChainId.ETHEREUM,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin',
)
export const DOLA = new Token(
  ChainId.ETHEREUM,
  '0x865377367054516e17014CcdED1e7d814EDC9ce4',
  18,
  'DOLA',
  'Dola USD Stablecoin',
)
export const INV = new Token(
  ChainId.ETHEREUM,
  '0x41D5D79431A913C4aE7d69a668ecdfE5fF9DFB68',
  18,
  'INV',
  'Inverse DAO',
)
export const FXS = new Token(
  ChainId.ETHEREUM,
  '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
  18,
  'FXS',
  'Frax Share',
)
export const FRAX = new Token(
  ChainId.ETHEREUM,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  18,
  'FRAX',
  'Frax',
)

// Testnet addresses under here

export const ROPSTEN_CNV = new Token(
  ChainId.ROPSTEN,
  '0x2B8E79CBD58418CE9aeB720BAf6B93825B93eF1F',
  18,
  'CNV',
  'Concave',
)

export const ROPSTEN_DAI = new Token(
  ChainId.ROPSTEN,
  '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4',
  18,
  'DAI',
  'Dai Stablecoin',
)
