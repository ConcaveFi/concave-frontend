import { CNV, DAI, FRAX, NATIVE, USDC } from '@concave/core'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { coingeckoPrice } from 'components/StakingPositions/LockPosition/MarketLockInfo/usePositionDiscount'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQuery } from 'react-query'

export type UsePositionSorter = ReturnType<typeof usePositionSorter>
export type PositionFilters = UsePositionSorter['data']
export type NftOrder = 'ASC' | 'DESC'
export type NftSort = { sort: keyof PositionFilters; order: NftOrder }
export type NftSortType = keyof PositionFilters

export const usePositionSorter = () => {
  const chainId = useCurrentSupportedNetworkId() // we will use mainnet to get prices.
  const prices = useQuery([`marketplaceTokens`, chainId], async () => {
    const [USDCPrice, FRAXPrice, NATIVEPrice, DAIPrice] = await Promise.all([
      coingeckoPrice(USDC[chainId], CNV[chainId]),
      coingeckoPrice(FRAX[chainId], CNV[chainId]),
      coingeckoPrice(NATIVE[chainId], CNV[chainId]),
      coingeckoPrice(DAI[chainId], CNV[chainId]),
    ])
    return {
      [USDC[chainId].symbol]: USDCPrice,
      [FRAX[chainId].symbol]: FRAXPrice,
      [NATIVE[chainId].symbol]: NATIVEPrice,
      [DAI[chainId].symbol]: DAIPrice,
    }
  })

  const getCNVPrice = (market: MarketItem) => {
    if (prices.error) throw prices.error
    if (!prices.data) throw 'NO PRICES DATA, is it loading?'
    const price = prices.data[market.currency.symbol]
    return price.quote(market.currencyAmount)
  }

  const poolSorter = (current: StakingPosition, previus: StakingPosition) =>
    current?.poolID - previus?.poolID

  const redeenSorter = (current: StakingPosition, previus: StakingPosition) =>
    current?.maturity - previus?.maturity

  const initialSorter = (current: StakingPosition, previus: StakingPosition) =>
    current?.initialValue.gt(previus?.initialValue) ? 1 : -1

  const priceSorter = (c: StakingPosition, p: StakingPosition) => {
    const currentPrice = getCNVPrice(c.market)
    const previousPrice = getCNVPrice(p.market)
    return currentPrice.greaterThan(previousPrice) ? -1 : 1
  }

  const discountSorter = (c: StakingPosition, p: StakingPosition) => {
    const currentPrice = getCNVPrice(c.market)
    const currentDiscount = c
      .calculateDiscount(c.market.new({ startPrice: currentPrice.quotient.toString() }))
      .toNumber()

    const previousPrice = getCNVPrice(p.market)
    const previusDiscount = p
      .calculateDiscount(c.market.new({ startPrice: previousPrice.quotient.toString() }))
      .toNumber()

    return previusDiscount - currentDiscount
  }

  return {
    ...prices,
    data: {
      STAKE_POOL: {
        ASC: (c: StakingPosition, p: StakingPosition) => poolSorter(c, p),
        DESC: (c: StakingPosition, p: StakingPosition) => poolSorter(c, p) * -1,
      },
      REDEEM_DATE: {
        ASC: (c: StakingPosition, p: StakingPosition) => redeenSorter(c, p),
        DESC: (c: StakingPosition, p: StakingPosition) => redeenSorter(c, p) * -1,
      },
      INITIAL: {
        ASC: (c: StakingPosition, p: StakingPosition) => initialSorter(c, p),
        DESC: (c: StakingPosition, p: StakingPosition) => initialSorter(c, p) * -1,
      },
      PRICE: {
        ASC: (c: StakingPosition, p: StakingPosition) => priceSorter(c, p),
        DESC: (c: StakingPosition, p: StakingPosition) => priceSorter(c, p) * -1,
      },
      DISCOUNT: {
        ASC: (c: StakingPosition, p: StakingPosition) => discountSorter(c, p),
        DESC: (c: StakingPosition, p: StakingPosition) => discountSorter(c, p) * -1,
      },
    } as const,
  }
}
