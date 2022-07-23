import { CNV_ADDRESS, STAKING_CONTRACT } from '@concave/core'
import { StakingV1Contract } from 'src/contract'
import { MarketItem, StakingPosition } from 'src/entities'
import { Cavemart, LogStakingV1 } from 'src/Fetcher'

export const parser = (stakingV1Contract: StakingV1Contract) => {
  const cavemartToMarket = (cavemart: Cavemart) => {
    return new MarketItem({
      deadline: cavemart.deadline,
      endPrice: cavemart.endPrice,
      erc20: CNV_ADDRESS[stakingV1Contract.chainId],
      erc721: STAKING_CONTRACT[stakingV1Contract.chainId],
      seller: cavemart.tokenOwner,
      start: cavemart.start,
      startPrice: cavemart.startPrice,
      tokenId: cavemart.tokenID,
      isListed: cavemart.tokenIsListed,
      signature: cavemart.signatureHash,
    })
  }

  const stakingV1ToStakingPosition = async (log: LogStakingV1) => {
    const chainId = stakingV1Contract.chainId
    const [position, reward] = await Promise.all([
      stakingV1Contract.positions(log.tokenID),
      stakingV1Contract.viewPositionRewards(log.tokenID),
    ])
    const cavemart = log.cavemart.at(-1)
    const market = !cavemart ? undefined : cavemartToMarket(cavemart)

    return new StakingPosition({
      chainId,
      tokenId: log.tokenID,
      position,
      reward,
      market,
    })
  }
  return { stakingV1ToStakingPosition, cavemartToMarket }
}
