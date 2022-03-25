import { Currency, Token } from '@uniswap/sdk-core'

import { chain } from 'wagmi'
import { DAI, DOLA, USDC, FRAX, FXS, USDT, WETH } from './tokens'

type ChainTokenList = { readonly [chainId: number]: Token[] }
type ChainCurrencyList = { readonly [chainId: number]: Currency[] }

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [chain.mainnet.id]: [WETH, DAI, USDC, DOLA, FRAX, USDT],
}

const permutate = (tokenList) =>
  tokenList.flatMap((token, i) => [...tokenList].splice(0, i).map((token2) => [token, token2]))

export const INTERMEDIARY_PAIRS_FOR_MULTI_HOPS = {
  [chain.mainnet.id]: permutate(BASES_TO_CHECK_TRADES_AGAINST[chain.mainnet.id]),
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [chain.mainnet.id]: [WETH, DAI, USDC, DOLA, FRAX, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [chain.mainnet.id]: [WETH, DAI, USDC, DOLA, FRAX, USDT],
}
