import { CNV, CurrencyAmount } from '@concave/core'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { usePrice } from 'components/AMM/hooks/usePrice'
import { useMemo } from 'react'

export const usePositionDiscount = (staking: StakingPosition, market?: MarketItem) => {
  const m = market || staking.market
  const tokenPrice = CurrencyAmount.fromRawAmount(m.currency, m.startPrice.toString())
  const relativePrice = usePrice(m.currency, CNV[staking.chainId])
  const discount = useMemo(() => {
    if (!relativePrice.price) {
      return 0
    }
    const CNV_price = relativePrice.price?.quote(tokenPrice)
    return staking.calculateDiscount(
      m.new({
        startPrice: CNV_price.quotient.toString(),
      }),
    )
  }, [m, relativePrice.price, staking, tokenPrice])

  return {
    discount,
    ...relativePrice,
  }
}
