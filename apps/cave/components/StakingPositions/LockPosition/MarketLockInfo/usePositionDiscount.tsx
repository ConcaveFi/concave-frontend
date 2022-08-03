import { CNV, Currency, CurrencyAmount } from '@concave/core'
import { Price } from '@concave/gemswap-sdk'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { tokenService } from 'lib/token.service'
import { useQuery } from 'react-query'

export const useCoingeckoPrice = (base: Currency, quote: Currency) => {
  return useQuery([`coingecko`, `price`, base.wrapped.address, quote.wrapped.address], async () => {
    const [quotePrice, basePrice] = await Promise.all([
      tokenService.getTokenPrice(quote),
      tokenService.getTokenPrice(base),
    ])

    const denominator = quotePrice.value * 10 ** base.decimals
    const numerator = basePrice.value * 10 ** quote.decimals

    return new Price(base, quote, denominator, numerator)
  })
}

export const usePositionDiscount = (staking: StakingPosition, market?: MarketItem) => {
  const m = market || staking.market
  const price = useCoingeckoPrice(m.currency, CNV[staking.chainId])
  const marketCurrencyAmount = CurrencyAmount.fromRawAmount(m.currency, m.startPrice.toString())
  if (!price.data) return { ...price, discount: 0 }
  const cnvPrice = price.data.quote(marketCurrencyAmount)
  return {
    ...price,
    discount: staking
      .calculateDiscount(m.new({ startPrice: cnvPrice.quotient.toString() }))
      .toNumber(),
  }
}
