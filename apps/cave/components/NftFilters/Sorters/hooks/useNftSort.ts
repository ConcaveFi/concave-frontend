import { StakingPosition } from '@concave/marketplace'

export type NftOrder = 'ASC' | 'DESC'
export type NftSort = { sort: keyof typeof NftSortMethod; order: NftOrder }
export type NftSortType = keyof typeof NftSortMethod

export const NftSortMethod = {
  STAKE_POOL: {
    ASC: (current: StakingPosition, previus: StakingPosition) => current?.poolID - previus?.poolID,
    DESC: (current: StakingPosition, previus: StakingPosition) => previus?.poolID - current?.poolID,
  },
  REDEEM_DATE: {
    ASC: (current: StakingPosition, previus: StakingPosition) =>
      current?.maturity - previus?.maturity,
    DESC: (current: StakingPosition, previus: StakingPosition) =>
      previus?.maturity - current?.maturity,
  },
  INITIAL: {
    ASC: (current: StakingPosition, previus: StakingPosition) =>
      current?.initialValue.gt(previus?.initialValue) ? 1 : -1,
    DESC: (current: StakingPosition, previus: StakingPosition) =>
      previus?.initialValue.gt(current?.initialValue) ? 1 : -1,
  },
  PRICE: {
    ASC: (current: StakingPosition, previus: StakingPosition) =>
      current?.market.startPrice.gt(previus?.market.startPrice) ? 1 : -1,
    DESC: (current: StakingPosition, previus: StakingPosition) =>
      previus?.market.startPrice.gt(current?.market.startPrice) ? 1 : -1,
  },
  DISCOUNT: {
    ASC: (current: StakingPosition, previous: StakingPosition) =>
      current.calculateDiscount().gt(previous.calculateDiscount()) ? 1 : -1,
    DESC: (current: StakingPosition, previous: StakingPosition) =>
      previous.calculateDiscount().gt(current.calculateDiscount()) ? 1 : -1,
  },
}
