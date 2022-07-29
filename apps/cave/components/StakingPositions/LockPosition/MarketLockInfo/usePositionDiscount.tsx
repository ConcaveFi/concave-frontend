import { CNV, CurrencyAmount, DAI } from '@concave/core'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { usePrice } from 'components/AMM/hooks/usePrice'
import { useMemo } from 'react'

export const usePositionDiscount = (staking: StakingPosition, market?: MarketItem) => {
  const m = market || staking.market
  const baseCurrency = m.currency.isNative ? m.currency : DAI[staking.chainId]

  const tokenPrice = CurrencyAmount.fromRawAmount(baseCurrency, m.startPrice.toString())
  const relativePrice = usePrice(baseCurrency, CNV[staking.chainId])
  const discount = useMemo(() => {
    if (!relativePrice.price) {
      return 0
    }
    try {
      const CNV_price = relativePrice.price?.quote(tokenPrice)
      return staking.calculateDiscount(
        m.new({
          startPrice: CNV_price.quotient.toString(),
        }),
      )
    } catch (e) {
      return 0
    }
  }, [m, relativePrice.price, staking, tokenPrice])

  return {
    discount,
    ...relativePrice,
  }
}
