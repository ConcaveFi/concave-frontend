import { Token } from '@concave/core'
import { Fetcher, Pair } from '@concave/gemswap-sdk'
import {
  BASES_TO_CHECK_TRADES_AGAINST,
  INTERMEDIARY_PAIRS_FOR_MULTI_HOPS,
} from 'components/AMM/constants/routing'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { useBlockNumber, useProvider } from 'wagmi'

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
    [tokenA.wrapped, tokenB.wrapped],
    ...(maxHops > 1 ? buildPairs(BASES_TO_CHECK_TRADES_AGAINST[chainId], tokenA, tokenB) : []),
    // if maxHops is more than 2, it will also check routes like tokenIn -> DAI -> WETH -> tokenOut
    ...(maxHops > 2 ? INTERMEDIARY_PAIRS_FOR_MULTI_HOPS[chainId] || [] : []),
  ] as [Token, Token][])

export type UsePairsQueryOptions<T> = UseQueryOptions<Pair[], any, T>

export const NoValidPairsError = 'No valid pairs found'

const sortAddresses = (a: Token, b: Token) => {
  if (!a || !b || a.equals(b) || a.chainId !== b.chainId) return
  return a?.sortsBefore(b) ? `${a.address}-${b.address}` : `${b.address}-${a.address}`
}

export const usePairs = <T = Pair[]>(
  tokenA?: Token,
  tokenB?: Token,
  maxHops = 3,
  queryOptions?: UsePairsQueryOptions<T>,
) => {
  const enabled = !!tokenA?.address && !!tokenB?.address && !tokenA.equals(tokenB)
  const provider = useProvider()
  const result = useQuery(
    ['pairs', sortAddresses(tokenA, tokenB), maxHops, tokenA?.chainId],
    async () => {
      const commonPairs = getAllCommonPairs(tokenA, tokenB, maxHops)
      const pairs: Pair[] = (
        await Promise.all(
          commonPairs.map(([a, b]) => Fetcher.fetchPairData(a, b, provider).catch(() => null)),
        )
      ).filter(Boolean)

      if (!pairs || pairs.length === 0) throw NoValidPairsError

      return pairs
    },
    {
      enabled,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: 'tracked',
      retry: false,
      ...queryOptions,
    },
  )

  useBlockNumber({ watch: true, onBlock: () => result.refetch(), enabled })

  return result
}

export const usePair = (tokenA: Token, tokenB: Token, queryOptions?: UsePairsQueryOptions<Pair>) =>
  usePairs(tokenA, tokenB, 1, { select: (pairs) => pairs[0], ...queryOptions })

export type UsePairResult = UseQueryResult<Pair>
export type UsePairsResult = UseQueryResult<Pair[]>
