import { useQuery } from 'react-query'
import { chain } from 'wagmi'

import { Pair, Trade } from '@uniswap/v2-sdk'
import { BigintIsh, Currency, CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Contract } from 'ethers'

import { BASES_TO_CHECK_TRADES_AGAINST, INTERMEDIARY_PAIRS_FOR_MULTI_HOPS } from 'constants/routing'
import { concaveProvider } from 'lib/providers'
import { DAI } from 'constants/tokens'
import { useCallback, useMemo } from 'react'

// TODO: Multicall?
const fetchPair = async (tokenA, tokenB, provider = concaveProvider(chain.mainnet.id)) => {
  try {
    const pairAddress = Pair.getAddress(tokenA, tokenB)
    const [reserves0, reserves1] = await new Contract(
      pairAddress,
      IUniswapV2Pair.abi,
      provider,
    ).getReserves()
    const reserves = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA, reserves[0]),
      CurrencyAmount.fromRawAmount(tokenB, reserves[1]),
    )
  } catch {
    // pair does not exist, and its ok
  }
}

export const usePairs = (
  tokenIn: Token,
  tokenOut: Token,
  maxHops = 3,
  chainId = chain.mainnet.id,
) => {
  const currencyPairs = useMemo(
    () =>
      !!tokenIn &&
      !!tokenOut &&
      ([
        // if maxHops is 1 it will only try to route tokenIn -> tokenOut directly
        ...(maxHops === 1 ? [[tokenIn.wrapped, tokenOut.wrapped]] : []),
        ...(maxHops > 1
          ? BASES_TO_CHECK_TRADES_AGAINST[chainId]
              .flatMap((baseToken) => [
                [baseToken, tokenIn.wrapped],
                [baseToken, tokenOut.wrapped],
              ])
              .filter(([a, b]) => !a.equals(b))
          : []),
        // if maxHops is more than 2, it will also check routes like tokenIn -> DAI -> WETH -> tokenOut
        ...(maxHops > 2 ? INTERMEDIARY_PAIRS_FOR_MULTI_HOPS[chainId] : []),
      ].filter(
        ([t0, t1], i, otherPairs) =>
          // filter repeated
          otherPairs.findIndex(
            ([t0Other, t1Other]) =>
              (t0.equals(t0Other) && t1.equals(t1Other)) ||
              (t0.equals(t1Other) && t1.equals(t0Other)),
          ) === i,
      ) as [Token, Token][]),
    [tokenIn, tokenOut, maxHops, chainId],
  )

  return useQuery(
    ['pairs', tokenIn, tokenOut, maxHops, chainId],
    async () => {
      const pairs = (await Promise.all(currencyPairs.map(([a, b]) => fetchPair(a, b)))).filter(
        Boolean,
      )
      if (!pairs) throw new Error('No valid pairs')
      return pairs
    },
    { enabled: !!tokenIn && !!tokenOut, refetchOnWindowFocus: false, refetchOnReconnect: false },
  )
}

export const findBestTrade = (
  pairs: Pair[],
  desiredExactCurrency: CurrencyAmount<Currency>,
  otherCurrency: Currency,
  tradeType: TradeType,
  { maxHops = 3 } = {},
) => {
  console.log(pairs)
  const bestTrade =
    tradeType === TradeType.EXACT_INPUT
      ? Trade.bestTradeExactIn(pairs, desiredExactCurrency, otherCurrency, { maxHops })
      : Trade.bestTradeExactOut(pairs, otherCurrency, desiredExactCurrency, { maxHops })
  return bestTrade[0]
}

const makeCurrencyAmount = (currency: Currency, amount: BigintIsh) =>
  currency && amount && CurrencyAmount.fromRawAmount(currency, +amount * 10 ** currency.decimals)

export const useQuote = (currency: Currency, amount, tokenOut: Token = DAI) => {
  const pairs = usePairs(currency?.wrapped, tokenOut)

  const price = useMemo(() => {
    if (!pairs.data || !currency?.wrapped || !amount || !tokenOut) return

    const currencyAmount = makeCurrencyAmount(currency, amount)
    const bestTrade = findBestTrade(pairs.data, currencyAmount, tokenOut, TradeType.EXACT_INPUT)

    return bestTrade.route.midPrice.quote(currencyAmount).toSignificant(6)
  }, [pairs.data, tokenOut, currency, amount])

  return useMemo(
    () => ({
      isLoading: pairs.isLoading,
      isError: pairs.isError,
      isSuccess: pairs.isSuccess,
      status: pairs.status,
      price,
    }),
    [pairs, price],
  )
}
