import { BigNumber } from '@ethersproject/bignumber'
import { MarketItem } from './MarketItem'
import { StakingPosition, StakingPositionArgs } from './StakingPosition'

describe('StakingPosition', () => {
  it('percent', () => {
    const args = {
      position: {},
      reward: {
        totalRewards: BigNumber.from(`100` + `000000000000000000`),
      },
    } as StakingPositionArgs
    const staking = new StakingPosition(args)

    const market10 = new MarketItem({
      tokenId: BigNumber.from(1),
      startPrice: BigNumber.from(`10` + `000000000000000000`),
    } as MarketItem)
    expect(staking.calculateDiscount(market10).toString()).toEqual(BigNumber.from(9000).toString())

    const market50 = new MarketItem({
      tokenId: BigNumber.from(1),
      startPrice: BigNumber.from(`50` + `000000000000000000`),
    } as MarketItem)
    expect(staking.calculateDiscount(market50).toString()).toEqual(BigNumber.from(5000).toString())

    const market75 = new MarketItem({
      tokenId: BigNumber.from(1),
      startPrice: BigNumber.from(`75` + `000000000000000000`),
    } as MarketItem)
    expect(staking.calculateDiscount(market75).toString()).toEqual(BigNumber.from(2500).toString())

    const args2 = {
      position: {},
      reward: {
        totalRewards: BigNumber.from(`999999999999999998`),
      },
    } as StakingPositionArgs
    const staking2 = new StakingPosition(args2)
    const case1 = new MarketItem({
      tokenId: BigNumber.from(1),
      startPrice: BigNumber.from(`100000000000000000`),
    } as MarketItem)
    expect(staking2.calculateDiscount(case1).toString()).toEqual(BigNumber.from(9000).toString())
  })
})
