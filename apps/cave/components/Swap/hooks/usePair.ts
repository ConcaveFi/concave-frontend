import { useQuery } from 'react-query'
import { concaveProvider } from 'lib/providers'
import { Token, Fetcher } from 'gemswap-sdk'
import { BASES_TO_CHECK_TRADES_AGAINST, INTERMEDIARY_PAIRS_FOR_MULTI_HOPS } from 'constants/routing'

const filterRepeatedPairs = (pairs: [Token, Token][]) =>
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

const getAllCommonPairs = (
  tokenA: Token,
  tokenB: Token,
  maxHops: number,
  chainId = tokenA?.chainId,
) =>
  filterRepeatedPairs([
    // if maxHops is 1 it will only try to route tokenIn -> tokenOut directly
    ...(maxHops === 1 ? [[tokenA.wrapped, tokenB.wrapped]] : []),
    ...(maxHops > 1 ? buildPairs(BASES_TO_CHECK_TRADES_AGAINST[chainId], tokenA, tokenB) : []),
    // if maxHops is more than 2, it will also check routes like tokenIn -> DAI -> WETH -> tokenOut
    ...(maxHops > 2 ? INTERMEDIARY_PAIRS_FOR_MULTI_HOPS[chainId] : []),
  ] as [Token, Token][])

export const usePairs = (tokenA?: Token, tokenB?: Token, maxHops = 3) => {
  const { refetch, ...pairs } = useQuery(
    ['pairs', tokenA?.address, tokenB?.address, maxHops],
    async () => {
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) throw new Error('Invalid token pair')

      const commonPairs = getAllCommonPairs(tokenA, tokenB, maxHops)
      const pairs = (
        await Promise.all(
          commonPairs.map(([a, b]) => Fetcher.fetchPairData(a, b, concaveProvider(a.chainId))),
        )
      ).filter(Boolean)

      console.log(pairs[0].token0) // undefined

      if (!pairs || pairs.length === 0) throw new Error('No valid pairs')
      return pairs
    },
    { enabled: tokenA?.address && tokenB?.address && !tokenA.equals(tokenB) },
  )

  return pairs
}

export const usePair = (tokenA: Token, tokenB: Token) => usePairs(tokenA, tokenB, 1)
