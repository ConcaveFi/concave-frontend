import { Token } from '../entities/token'
import { AddressMap, ChainTokenMap, TokenMap } from '../types'

import {
  CNV_ADDRESS,
  DAI_ADDRESS,
  FRAX_ADDRESS,
  USDC_ADDRESS,
  WETH9_ADDRESS,
  WNATIVE_ADDRESS,
} from './addresses'

import { ChainId } from '../enums'

const makeTokenMap = (
  chains: ChainId[],
  address: AddressMap,
  decimals: number,
  symbol: string,
  name: string,
) =>
  chains.reduce(
    (acc, chainId) => ({
      ...acc,
      [chainId]: new Token(chainId, address[chainId], decimals, symbol, name),
    }),
    {},
  )

const getAddressesChains = (addresses) => Object.keys(addresses).map((chainId) => +chainId)

export const CNV: TokenMap = makeTokenMap(
  getAddressesChains(CNV_ADDRESS),
  CNV_ADDRESS,
  18,
  'CNV',
  'Concave',
)
export const FRAX: ChainTokenMap = makeTokenMap(
  getAddressesChains(FRAX_ADDRESS),
  FRAX_ADDRESS,
  18,
  'FRAX',
  'FRAX',
)

export const FRAX: TokenMap = makeTokenMap(
  getAddressesChains(FRAX_ADDRESS),
  FRAX_ADDRESS,
  18,
  'FRAX',
  'Frax',
)

export const USDC: TokenMap = {
  ...makeTokenMap(getAddressesChains(USDC_ADDRESS), USDC_ADDRESS, 6, 'USDC', 'USD Coin'),
  [ChainId.BSC]: new Token(ChainId.BSC, USDC_ADDRESS[ChainId.BSC], 18, 'USDC', 'USD Coin'),
  [ChainId.OKEX]: new Token(ChainId.OKEX, USDC_ADDRESS[ChainId.OKEX], 18, 'USDC', 'USD Coin'),
}

export const DAI: TokenMap = makeTokenMap(
  getAddressesChains(DAI_ADDRESS),
  DAI_ADDRESS,
  18,
  'DAI',
  'Dai Stablecoin',
)

export const WETH9: TokenMap = makeTokenMap(
  getAddressesChains(WETH9_ADDRESS),
  WETH9_ADDRESS,
  18,
  'WETH',
  'Wrapped Ether',
)

export const WNATIVE: TokenMap = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.ROPSTEN]: WETH9[ChainId.ROPSTEN],
  [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.GÖRLI]: WETH9[ChainId.GÖRLI],
  [ChainId.KOVAN]: WETH9[ChainId.KOVAN],
  [ChainId.FANTOM]: new Token(
    ChainId.FANTOM,
    WNATIVE_ADDRESS[ChainId.FANTOM],
    18,
    'WFTM',
    'Wrapped FTM',
  ),
  [ChainId.FANTOM_TESTNET]: new Token(
    ChainId.FANTOM_TESTNET,
    WNATIVE_ADDRESS[ChainId.FANTOM_TESTNET],
    18,
    'FTM',
    'Wrapped FTM',
  ),
  [ChainId.MATIC]: new Token(
    ChainId.MATIC,
    WNATIVE_ADDRESS[ChainId.MATIC],
    18,
    'WMATIC',
    'Wrapped Matic',
  ),
  [ChainId.MATIC_TESTNET]: new Token(
    ChainId.MATIC_TESTNET,
    WNATIVE_ADDRESS[ChainId.MATIC_TESTNET],
    18,
    'WMATIC',
    'Wrapped Matic',
  ),
  [ChainId.XDAI]: new Token(
    ChainId.XDAI,
    WNATIVE_ADDRESS[ChainId.XDAI],
    18,
    'WXDAI',
    'Wrapped xDai',
  ),
  [ChainId.BSC]: new Token(ChainId.BSC, WNATIVE_ADDRESS[ChainId.BSC], 18, 'WBNB', 'Wrapped BNB'),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    WNATIVE_ADDRESS[ChainId.BSC_TESTNET],
    18,
    'WBNB',
    'Wrapped BNB',
  ),
  [ChainId.ARBITRUM]: WETH9[ChainId.ARBITRUM],
  [ChainId.ARBITRUM_TESTNET]: WETH9[ChainId.ARBITRUM_TESTNET],
  [ChainId.MOONBEAM_TESTNET]: new Token(
    ChainId.MOONBEAM_TESTNET,
    WNATIVE_ADDRESS[ChainId.MOONBEAM_TESTNET],
    18,
    'WETH',
    'Wrapped Ether',
  ),
  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    WNATIVE_ADDRESS[ChainId.AVALANCHE],
    18,
    'WAVAX',
    'Wrapped AVAX',
  ),
  [ChainId.AVALANCHE_TESTNET]: new Token(
    ChainId.AVALANCHE_TESTNET,
    WNATIVE_ADDRESS[ChainId.AVALANCHE_TESTNET],
    18,
    'WAVAX',
    'Wrapped AVAX',
  ),
  [ChainId.HECO]: new Token(ChainId.HECO, WNATIVE_ADDRESS[ChainId.HECO], 18, 'WHT', 'Wrapped HT'),
  [ChainId.HECO_TESTNET]: new Token(
    ChainId.HECO_TESTNET,
    WNATIVE_ADDRESS[ChainId.HECO_TESTNET],
    18,
    'WHT',
    'Wrapped HT',
  ),
  [ChainId.HARMONY]: new Token(
    ChainId.HARMONY,
    WNATIVE_ADDRESS[ChainId.HARMONY],
    18,
    'WONE',
    'Wrapped ONE',
  ),
  [ChainId.HARMONY_TESTNET]: new Token(
    ChainId.HARMONY_TESTNET,
    WNATIVE_ADDRESS[ChainId.HARMONY_TESTNET],
    18,
    'WONE',
    'Wrapped ONE',
  ),
  [ChainId.OKEX]: new Token(
    ChainId.OKEX,
    WNATIVE_ADDRESS[ChainId.OKEX],
    18,
    'WOKT',
    'Wrapped OKExChain',
  ),
  [ChainId.OKEX_TESTNET]: new Token(
    ChainId.OKEX_TESTNET,
    WNATIVE_ADDRESS[ChainId.OKEX_TESTNET],
    18,
    'WOKT',
    'Wrapped OKExChain',
  ),
  [ChainId.CELO]: new Token(ChainId.CELO, WNATIVE_ADDRESS[ChainId.CELO], 18, 'CELO', 'Celo'),
  [ChainId.PALM]: new Token(
    ChainId.PALM,
    WNATIVE_ADDRESS[ChainId.PALM],
    18,
    'WPALM',
    'Wrapped Palm',
  ),
  [ChainId.MOONRIVER]: new Token(
    ChainId.MOONRIVER,
    WNATIVE_ADDRESS[ChainId.MOONRIVER],
    18,
    'WMOVR',
    'Wrapped Moonriver',
  ),
  [ChainId.FUSE]: new Token(
    ChainId.FUSE,
    WNATIVE_ADDRESS[ChainId.FUSE],
    18,
    'WFUSE',
    'Wrapped Fuse',
  ),
  [ChainId.TELOS]: new Token(
    ChainId.TELOS,
    WNATIVE_ADDRESS[ChainId.TELOS],
    18,
    'WTLOS',
    'Wrapped Telos',
  ),
  [ChainId.MOONBEAM]: new Token(
    ChainId.MOONBEAM,
    WNATIVE_ADDRESS[ChainId.MOONBEAM],
    18,
    'WGLMR',
    'Wrapped Glimmer',
  ),
}
