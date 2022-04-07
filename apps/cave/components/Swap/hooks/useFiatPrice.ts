import { Price, DAI, CurrencyAmount, Currency, TradeType } from 'gemswap-sdk'
import { useMemo } from 'react'
import { useTrade } from './useTrade'

export function useFiatPrice(currency?: Currency) {
  // using dai for now, but we can change based on user preferences later
  // e.g. use some stable pegged to EUR
  const stablecoin = DAI[currency?.chainId || 1]

  // The amount is large enough to filter low liquidity pairs.
  const amountOut = CurrencyAmount.fromRawAmount(stablecoin, 50_000) // +`50000e${stablecoin.decimals}`

  const { trade, isLoading } = useTrade(amountOut, currency, {
    maxHops: 2,
    tradeType: TradeType.EXACT_OUTPUT,
  })

  return useMemo(() => {
    if (!trade) return { isLoading }

    if (stablecoin.equals(currency)) return { price: new Price(stablecoin, stablecoin, '1', '1') }

    const { numerator, denominator } = trade.route.midPrice
    return { price: new Price(currency, stablecoin, denominator, numerator) }
  }, [currency, stablecoin, trade, isLoading])
}
