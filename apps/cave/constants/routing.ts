import { Token, Currency, DAI, WETH9, ChainId, NATIVE } from '@concave/gemswap-sdk'

import * as Ethereum from './tokens'

type ChainTokenList = { readonly [chainId: number]: Token[] }
type ChainCurrencyList = { readonly [chainId: number]: Currency[] }

export const STABLES = {
  [ChainId.ETHEREUM]: [Ethereum.DAI /* DOLA, USDC, FRAX, USDT */],
  [ChainId.ROPSTEN]: [DAI[ChainId.ROPSTEN]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.ETHEREUM]: [Ethereum.WETH, ...STABLES[ChainId.ETHEREUM]],
  [ChainId.ROPSTEN]: [WETH9[ChainId.ROPSTEN], ...STABLES[ChainId.ROPSTEN]],
}

const permutate = (tokenList: ChainTokenList[number]): [Token, Token][] =>
  tokenList.flatMap((token, i) =>
    [...tokenList].splice(0, i).map((token2) => [token, token2] as [Token, Token]),
  )

export const INTERMEDIARY_PAIRS_FOR_MULTI_HOPS = {
  [ChainId.ETHEREUM]: permutate(BASES_TO_CHECK_TRADES_AGAINST[ChainId.ETHEREUM]),
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [ChainId.ETHEREUM]: [
    NATIVE[ChainId.ETHEREUM],
    Ethereum.WETH,
    Ethereum.DAI,
    Ethereum.USDC,
    Ethereum.DOLA,
    Ethereum.FRAX,
    Ethereum.USDT,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.ETHEREUM]: [
    Ethereum.WETH,
    Ethereum.DAI,
    Ethereum.USDC,
    Ethereum.DOLA,
    Ethereum.FRAX,
    Ethereum.USDT,
  ],
}
