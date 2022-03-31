import { Token } from '@uniswap/sdk-core'

import { chain } from 'wagmi'

export const ROPSTEN_WETH = new Token(
  chain.ropsten.id,
  '0xc778417e063141139fce010982780140aa0cd5ab',
  18,
  'WETH',
  'Wrapped Ether',
)
export const ROPSTEN_DAI = new Token(
  chain.mainnet.id,
  '0x7B731FFcf1b9C6E0868dA3F1312673A12Da28dc5',
  18,
  'DAI',
  'Dai Stablecoin',
)
export const ROPSTEN_FRAX = new Token(
  chain.mainnet.id,
  '0xE7E9F348202f6EDfFF2607025820beE92F51cdAA',
  18,
  'FRAX',
  'Frax',
)

export const ROPSTEN_STABLES = [ROPSTEN_DAI, ROPSTEN_FRAX]
