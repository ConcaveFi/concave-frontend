import { Token, Currency, DAI, WETH9, ChainId, NATIVE } from '@concave/core'

type ChainTokenList = { readonly [chainId: number]: Token[] }
type ChainCurrencyList = { readonly [chainId: number]: Currency[] }

export const STABLES = {
  [ChainId.ETHEREUM]: [DAI[ChainId.ETHEREUM]],
  [ChainId.RINKEBY]: [DAI[ChainId.RINKEBY]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.ETHEREUM]: [WETH9[ChainId.ETHEREUM], ...STABLES[ChainId.ETHEREUM]],
  [ChainId.RINKEBY]: [WETH9[ChainId.RINKEBY], ...STABLES[ChainId.RINKEBY]],
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
  [ChainId.ETHEREUM]: [NATIVE[ChainId.ETHEREUM], WETH9[ChainId.ETHEREUM], DAI[ChainId.ETHEREUM]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.ETHEREUM]: [WETH9[ChainId.ETHEREUM], DAI[ChainId.ETHEREUM]],
}
