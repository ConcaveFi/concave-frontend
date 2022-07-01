import { StakingPosition } from '@concave/marketplace'

export type NftOrder = 'ASC' | 'DESC'
export type NftSort = { sort: keyof typeof NftSortMethod; order: NftOrder }

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
}
