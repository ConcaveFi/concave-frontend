import { Price, DAI, CurrencyAmount, Currency, TradeType } from 'c-sdk'
import { useMemo } from 'react'
import { useCurrentSupportedNetworkId } from '../useSwap2'
import { useTrade } from './useTrade'

export default function useDAIPrice(currency?: Currency) {
  const networkId = useCurrentSupportedNetworkId()

  const stablecoin = DAI[networkId]

  // The amount is large enough to filter low liquidity pairs.
  const amountOut = CurrencyAmount.fromRawAmount(stablecoin, +`50000e${stablecoin.decimals}`)

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
