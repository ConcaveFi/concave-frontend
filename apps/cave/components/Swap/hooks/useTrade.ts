import { useNetwork } from 'wagmi'
import { Trade, Currency, CurrencyAmount, TradeType } from 'c-sdk'

import { useMemo } from 'react'
import { usePairs } from './usePair'
import { useCurrentSupportedNetworkId } from '../useSwap2'

const MAX_HOPS = 3

export const useTrade = (
  exactCurrency?: CurrencyAmount<Currency>,
  otherCurrency?: Currency,
  { tradeType = TradeType.EXACT_INPUT, maxHops = MAX_HOPS } = {},
) => {
  const networkId = useCurrentSupportedNetworkId()
  const pairs = usePairs(
    exactCurrency?.currency.wrapped,
    otherCurrency?.wrapped,
    maxHops,
    networkId,
  )

  const trade = useMemo(() => {
    if (!pairs.data || pairs.data.length === 0) return
    const bestTrade =
      tradeType === TradeType.EXACT_INPUT
        ? Trade.bestTradeExactIn(pairs.data, exactCurrency, otherCurrency, { maxHops })
        : Trade.bestTradeExactOut(pairs.data, otherCurrency, exactCurrency, { maxHops })
    return bestTrade[0]
  }, [pairs.data, exactCurrency, otherCurrency, tradeType, maxHops])

  return useMemo(
    () => ({
      isLoading: pairs.isLoading,
      isError: pairs.isError,
      isSuccess: pairs.isSuccess,
      status: pairs.status,
      trade,
    }),
    [pairs, trade],
  )
}
