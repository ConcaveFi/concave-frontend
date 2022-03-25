import { useEffect, useState, useRef, useCallback } from 'react'
import { useQuery } from 'react-query'
import { chain, useBalance } from 'wagmi'

import { Pair, Trade } from '@uniswap/v2-sdk'
import { Currency, CurrencyAmount, Token, Price } from '@uniswap/sdk-core'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'

import { BASES_TO_CHECK_TRADES_AGAINST, INTERMEDIARY_PAIRS_FOR_MULTI_HOPS } from 'constants/routing'
import { concaveProvider } from 'lib/providers'
import { Contract } from 'ethers'
import { DAI } from 'constants/tokens'

type SwapSettings = {
  expertMode: boolean
  multihops: boolean
  deadLine: number
  slippageTolerance: number
}

type UseSwap = {
  tokenIn: CurrencyAmount<Currency>
  tokenOut: CurrencyAmount<Currency>
  settings: SwapSettings
}

const fetchPairs = (
  currencyPairs: [Token, Token][],
  provider = concaveProvider(chain.mainnet.id),
) =>
  Promise.all(
    currencyPairs.map(async ([a, b]) => {
      const pairAddress = Pair.getAddress(a, b)
      const [reserves0, reserves1] = await new Contract(
        pairAddress,
        IUniswapV2Pair.abi,
        provider,
      ).getReserves()
      const reserves = a.sortsBefore(b) ? [reserves0, reserves1] : [reserves1, reserves0]
      return new Pair(
        CurrencyAmount.fromRawAmount(a, reserves[0]),
        CurrencyAmount.fromRawAmount(b, reserves[1]),
      )
    }),
  )

/**
 * let's say tokenIn is WETH, tokenOut is CNV
 * but CNV only have liquidity on the DAI pair
 * we'll have to route the swap through DAI
 * but to start we don't yet know what's the best route (WETH -> DAI -> CNV)
 * for that we construct multiple pairs WETH/FRAX, WETH/DOLA, WETH/DAI and CNV/FRAX, CNV/DOLA, CNV/DAI
 * and check which one is the best to follow with the transaction
 */
export const useBestTrade = (
  tokenIn: Currency,
  tokenOut: Currency,
  desiredAmount: { in: number; out?: never } | { in?: never; out: number },
  maxHops: number = 2,
  chainId: number = chain.mainnet.id,
) => {
  if (!desiredAmount.in && !desiredAmount.out) throw new Error('Must specify desired amount')
  return useQuery(['bestTrade', tokenIn, tokenOut, maxHops], async () => {
    const currencyPairs = [
      BASES_TO_CHECK_TRADES_AGAINST[chainId].flatMap((baseToken) => [
        [baseToken, tokenIn],
        [baseToken, tokenOut],
      ]),
      ...INTERMEDIARY_PAIRS_FOR_MULTI_HOPS[chainId],
    ]
    const pairs = await fetchPairs(currencyPairs)
    const amountIn = CurrencyAmount.fromRawAmount(tokenIn, desiredAmount.in)
    const amountOut = CurrencyAmount.fromRawAmount(tokenOut, desiredAmount.out)

    const bestTrade = desiredAmount.in
      ? Trade.bestTradeExactIn(pairs, amountIn, tokenOut, { maxHops, maxNumResults: 1 })[0]
      : Trade.bestTradeExactOut(pairs, tokenIn, amountOut, { maxHops, maxNumResults: 1 })[0]

    return bestTrade
  })
}

export const usePriceInStable = (token) => {
  const bestTrade = useBestTrade(token, DAI, { in: 1 }, 1)
  return bestTrade.data.executionPrice
}
