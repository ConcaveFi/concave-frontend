import { CNV, DAI, FRAX, NATIVE, USDC } from '@concave/core'
import { MarketItem, StakingPosition } from '@concave/marketplace'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQuery } from 'react-query'

export type UsePositionSorter = ReturnType<typeof usePositionSorter>
export type PositionFilters = UsePositionSorter['data']
export type NftOrder = 'ASC' | 'DESC'
export type NftSort = { sort: keyof PositionFilters; order: NftOrder }
export type NftSortType = keyof PositionFilters

export const usePositionSorter = () => {
  const poolSorter = (current: StakingPosition, previus: StakingPosition) =>
    current?.poolID - previus?.poolID

  const redeenSorter = (current: StakingPosition, previus: StakingPosition) =>
    current?.maturity - previus?.maturity

  const initialSorter = (current: StakingPosition, previus: StakingPosition) =>
    current?.initialValue.gt(previus?.initialValue) ? 1 : -1

  const priceSorter = (c: StakingPosition, p: StakingPosition) => {
    return c.currentValue.gt(p.currentValue) ? -1 : 1
  }

  return {
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
    } as const,
  }
}
