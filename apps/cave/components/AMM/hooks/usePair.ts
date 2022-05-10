import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { concaveProvider } from 'lib/providers'
import { Token, Fetcher, Pair } from '@concave/gemswap-sdk'
import { BASES_TO_CHECK_TRADES_AGAINST, INTERMEDIARY_PAIRS_FOR_MULTI_HOPS } from 'constants/routing'
import { AVERAGE_BLOCK_TIME } from 'constants/blockchain'

const filterRepeatedPairs = (pairs: [Token, Token][]) =>
  pairs.filter(
    ([t0, t1], i, otherPairs) =>
      otherPairs.findIndex(
        ([t0Other, t1Other]) =>
          (t0.equals(t0Other) && t1.equals(t1Other)) || (t0.equals(t1Other) && t1.equals(t0Other)),
      ) === i,
  )

const buildPairs = (base: Token[] = [], token0: Token, token1: Token) =>
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
    ...(maxHops > 2 ? INTERMEDIARY_PAIRS_FOR_MULTI_HOPS[chainId] || [] : []),
  ] as [Token, Token][])

export type UsePairsQueryOptions<T> = UseQueryOptions<Pair[], any, T>

export const NoValidPairsError = 'No valid pairs found'

export const usePairs = <T = Pair[]>(
  tokenA?: Token,
  tokenB?: Token,
  maxHops = 3,
  queryOptions?: UsePairsQueryOptions<T>,
) => {
  return useQuery(
    ['pairs', tokenA?.address, tokenB?.address, maxHops, tokenA?.chainId],
    async () => {
      const commonPairs = getAllCommonPairs(tokenA, tokenB, maxHops)
      const pairs: Pair[] = (
        await Promise.all(
          commonPairs.map(([a, b]) =>
            Fetcher.fetchPairData(a, b, concaveProvider(a.chainId)).catch(() => null),
          ),
        )
      ).filter(Boolean)

      if (!pairs || pairs.length === 0) throw NoValidPairsError

      return pairs
    },
    {
      enabled: !!tokenA?.address && !!tokenB?.address && !tokenA.equals(tokenB),
      refetchInterval: AVERAGE_BLOCK_TIME[tokenA?.chainId],
      notifyOnChangeProps: 'tracked',
      retry: false,
      ...queryOptions,
    },
  )
}

export const usePair = (tokenA: Token, tokenB: Token) =>
  usePairs(tokenA, tokenB, 1, { select: (pairs) => pairs[0] })

export type UsePairResult = UseQueryResult<Pair>
export type UsePairsResult = UseQueryResult<Pair[]>
