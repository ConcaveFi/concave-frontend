import { useQuery } from 'react-query'
import { chain } from 'wagmi'

import { Pair, Trade } from '@uniswap/v2-sdk'
import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Contract } from 'ethers'

import { BASES_TO_CHECK_TRADES_AGAINST, INTERMEDIARY_PAIRS_FOR_MULTI_HOPS } from 'constants/routing'
import { concaveProvider } from 'lib/providers'
import { DAI } from 'constants/tokens'

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

/**
 * let's say tokenIn is WETH, tokenOut is CNV
 * but CNV only have liquidity on the DAI pair
 * we'll have to route the swap through DAI
 * but to start we don't yet know what's the best route (WETH -> DAI -> CNV)
 * for that we construct multiple pairs WETH/FRAX, WETH/DOLA, WETH/DAI and CNV/FRAX, CNV/DOLA, CNV/DAI
 * and check which one is the best to follow with the transaction
 *
 * if maxHops is 1 it will only try to route WETH -> CNV directly
 * if maxHops is more than 2, it will also check routes like WETH -> DAI -> USDC -> CNV
 */
export const useBestTrade = (
  tokenIn: Currency,
  tokenOut: Currency,
  desiredAmount: { in: number; out?: never } | { in?: never; out: number },
  { maxHops = 2, chainId = chain.mainnet.id }: { maxHops?: number; chainId?: number } = {},
) => {
  if (!desiredAmount.in && !desiredAmount.out) throw new Error('Must specify desired amount')
  return useQuery(['bestTrade', tokenIn, tokenOut, maxHops], async () => {
    const currencyPairs = [
      ...(maxHops === 1 ? [[tokenIn.wrapped, tokenOut.wrapped]] : []),
      ...(maxHops > 1
        ? BASES_TO_CHECK_TRADES_AGAINST[chainId]
            .flatMap((baseToken) => [
              [baseToken, tokenIn.wrapped],
              [baseToken, tokenOut.wrapped],
            ])
            .filter(([a, b]) => !a.equals(b))
        : []),
      ...(maxHops > 2 ? INTERMEDIARY_PAIRS_FOR_MULTI_HOPS[chainId] : []),
    ] as [Token, Token][]

    /**
     * this will always check multiple hops, whitch may be slower than some alternative,
     * like only checking more hops if there is no liquidity in the pair
     * I mean that there is room for improvement here
     */
    const pairs = (await Promise.all(currencyPairs.map(([a, b]) => fetchPair(a, b)))).filter(
      Boolean,
    )

    const bestTrade = desiredAmount.in
      ? Trade.bestTradeExactIn(
          pairs,
          CurrencyAmount.fromRawAmount(tokenIn, desiredAmount.in),
          tokenOut,
          { maxHops, maxNumResults: 1 },
        )
      : Trade.bestTradeExactOut(
          pairs,
          tokenIn,
          CurrencyAmount.fromRawAmount(tokenOut, desiredAmount.out),
          { maxHops, maxNumResults: 1 },
        )

    return bestTrade[0]
  })
}

/**
 * actually price in DAI for the moment, refactor to check multiple stables and find best trade
 */
export const usePriceInStable = (token: Token) => {
  const bestTrade = useBestTrade(token, DAI, { in: 1e18 })
  return {
    isLoading: bestTrade.isLoading,
    isError: bestTrade.isError,
    status: bestTrade.status,
    price: bestTrade.isSuccess && bestTrade.data?.route?.midPrice,
  }
}
