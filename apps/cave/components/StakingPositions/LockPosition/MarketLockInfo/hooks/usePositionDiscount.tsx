import { CNV, Currency } from '@concave/core'
import { Price } from '@concave/gemswap-sdk'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { tokenService } from 'lib/token.service'
import { useQuery } from 'react-query'

export const coingeckoPrice = async (base: Currency, quote: Currency) => {
  const [quotePrice, basePrice] = await Promise.all([
    tokenService.getTokenPrice(quote),
    tokenService.getTokenPrice(base),
  ])

  const denominator = quotePrice.value * 10 ** base.decimals
  const numerator = basePrice.value * 10 ** quote.decimals
  return new Price(base, quote, denominator, numerator)
}

export const useCoingeckoPrice = (base: Currency, quote: Currency) => {
  return useQuery(
    [`coingecko`, `price`, base.wrapped.address, quote.wrapped.address],
    async () => {
      return coingeckoPrice(base, quote)
    },
    {
      refetchOnMount: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )
}
