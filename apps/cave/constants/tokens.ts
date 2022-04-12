import { Token } from 'gemswap-sdk'

import { chain } from 'wagmi'

export const CNV = new Token(
  chain.mainnet.id,
  '0x000000007a58f5f58e697e51ab0357bc9e260a04',
  18,
  'CNV',
  'Concave',
)
export const DAI = new Token(
  chain.mainnet.id,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin',
)

export const WETH = new Token(
  chain.mainnet.id,
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  18,
  'WETH',
  'Wrapped Ether',
)
export const USDT = new Token(
  chain.mainnet.id,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
)
export const USDC = new Token(
  chain.mainnet.id,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD Coin',
)
export const DOLA = new Token(
  chain.mainnet.id,
  '0x865377367054516e17014ccded1e7d814edc9ce4',
  18,
  'DOLA',
  'Dola USD Stablecoin',
)
export const INV = new Token(
  chain.mainnet.id,
  '0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68',
  18,
  'INV',
  'Inverse DAO',
)
export const FXS = new Token(
  chain.mainnet.id,
  '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
  18,
  'FXS',
  'Frax Share',
)
export const FRAX = new Token(
  chain.mainnet.id,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  18,
  'FRAX',
  'Frax',
)
