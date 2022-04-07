import { useQuery } from 'react-query'
import { chain } from 'wagmi'
import { concaveProvider } from 'lib/providers'
import { useMemo } from 'react'
import { Token, ChainId, Fetcher } from 'c-sdk'
import { BASES_TO_CHECK_TRADES_AGAINST, INTERMEDIARY_PAIRS_FOR_MULTI_HOPS } from 'constants/routing'

const filterRepatedPairs = (pairs: [Token, Token][]) =>
  pairs.filter(
    ([t0, t1], i, otherPairs) =>
      otherPairs.findIndex(
        ([t0Other, t1Other]) =>
          (t0.equals(t0Other) && t1.equals(t1Other)) || (t0.equals(t1Other) && t1.equals(t0Other)),
      ) === i,
  )

const buildPairs = (base: Token[], token0: Token, token1: Token) =>
  base
    .flatMap((baseToken) => [
      [baseToken, token0],
      [baseToken, token1],
    ])
    .filter(([a, b]) => !a.equals(b))

const useAllPossiblePairs = (token0: Token, token1: Token, maxHops: number, chainId: ChainId) => {
  // the order does not matter, we don't want to update it if it's the same tokens, so we sort the tokens before building the pairs
  const [tokenA, tokenB] = token0?.sortsBefore(token1) ? [token0, token1] : [token1, token0]
  return useMemo(
    () =>
      tokenA &&
      tokenB &&
      filterRepatedPairs([
        // if maxHops is 1 it will only try to route tokenIn -> tokenOut directly
        ...(maxHops === 1 ? [[tokenA.wrapped, tokenB.wrapped]] : []),
        ...(maxHops > 1 ? buildPairs(BASES_TO_CHECK_TRADES_AGAINST[chainId], tokenA, tokenB) : []),
        // if maxHops is more than 2, it will also check routes like tokenIn -> DAI -> WETH -> tokenOut
        ...(maxHops > 2 ? INTERMEDIARY_PAIRS_FOR_MULTI_HOPS[chainId] : []),
      ] as [Token, Token][]),
    [tokenA, tokenB, maxHops, chainId],
  )
}

export const usePairs = (
  tokenA?: Token,
  tokenB?: Token,
  maxHops = 3,
  chainId = chain.mainnet.id,
) => {
  const pairsMap = useAllPossiblePairs(tokenA, tokenB, maxHops, chainId)

  return useQuery(
    ['pairs', tokenA, tokenB, maxHops, chainId],
    async () => {
      if (tokenA.equals(tokenB)) return null
      const pairs = (
        await Promise.all(
          pairsMap.map(([a, b]) =>
            Fetcher.fetchPairData(a.wrapped, b.wrapped, concaveProvider(chainId)),
          ),
        )
      ).filter(Boolean)
      if (!pairs || pairs.length === 0) throw new Error('No valid pairs')
      return pairs
    },
    { enabled: !!pairsMap },
  )
}

export const usePair = (tokenA: Token, tokenB: Token, chainId = chain.mainnet.id) =>
  usePairs(tokenA, tokenB, 1, chainId)
