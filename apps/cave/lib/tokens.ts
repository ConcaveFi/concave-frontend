import { chain } from 'wagmi'

export const DAI: TokenType = {
  coingecko: 'dai',
  symbol: 'DAI',
  name: 'Dai',
  decimals: 18,
  logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png',
  [chain.ropsten.id]: '0x7B731FFcf1b9C6E0868dA3F1312673A12Da28dc5',
} as const

export const FRAX: TokenType = {
  coingecko: 'frax',
  name: 'Frax',
  symbol: 'FRAX',
  decimals: 18,
  logoURI: 'https://assets.coingecko.com/coins/images/13422/thumb/frax_logo.png',
  [chain.ropsten.id]: '0xE7E9F348202f6EDfFF2607025820beE92F51cdAA',
} as const

export const USDT: TokenType = {
  coingecko: 'tether',
  name: 'Tether',
  symbol: 'USDT',
  decimals: 6,
  logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png',
  [chain.ropsten.id]: '0x0736d0c130b2eAD47476cC262dbed90D7C4eeABD',
} as const

export const bbtCNV: TokenType = {
  coingecko: 'weth',
  name: 'Concave Presale Token (BBT) (bbtCNV)',
  symbol: 'bbtCNV',
  decimals: 18,
  logoURI:
    'https://w7.pngwing.com/pngs/944/747/png-transparent-text-yellow-circle-icon-coin-trademark-number-code.png',
  [chain.ropsten.id]: '0xC32BaEa7792bf39B8b89fa33A108d2064db43ee5',
} as const

export const aCNV: TokenType = {
  coingecko: 'weth',
  name: 'Concave A Token (aCNV) (aCNV)',
  symbol: 'aCNV',
  decimals: 18,
  logoURI:
    'https://w7.pngwing.com/pngs/944/747/png-transparent-text-yellow-circle-icon-coin-trademark-number-code.png',
  [chain.ropsten.id]: '0x6c64efbbaea3ebec73588a8e20cf058344f5f1cf',
}

export const LINK: TokenType = {
  coingecko: 'chainlink',
  [chain.mainnet.id]: '0x514910771af9ca656af840dff83e8264ecf986ca',
  [chain.ropsten.id]: '0x20fE562d797A42Dcb3399062AE9546cd06f63280',
  name: 'Chainlink',
  symbol: 'LINK',
  decimals: 18,
  logoURI: 'https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png',
} as const

export type TokenType = {
  coingecko: string
  name: string
  symbol: AvailableTokens
  decimals: number
  logoURI: string
  [chainId: number]: string
}
export const availableTokens = { aCNV, USDT, bbtCNV, FRAX, DAI, LINK } as const
export type AvailableTokens = keyof typeof availableTokens
