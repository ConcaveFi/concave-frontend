import { CNV_ADDRESS, STAKING_CONTRACT } from '@concave/core'
import { StakingV1Contract } from 'src/contract'
import { MarketItem, StakingPosition } from 'src/entities'
import { LogStakingV1 } from 'src/Fetcher'

export const parser = (stakingV1Contract: StakingV1Contract) => {
  const stakingV1ToStakingPosition = async (log: LogStakingV1) => {
    const chainId = stakingV1Contract.chainId
    const [position, reward] = await Promise.all([
      stakingV1Contract.positions(log.tokenID),
      stakingV1Contract.viewPositionRewards(log.tokenID),
    ])
    if (log.tokenID == 427) {
      console.log(log)
    }
    const cavemart = log.cavemart.at(-1)
    const market = !cavemart
      ? undefined
      : new MarketItem({
          deadline: cavemart.deadline,
          endPrice: cavemart.endPrice,
          erc20: CNV_ADDRESS[chainId],
          erc721: STAKING_CONTRACT[chainId],
          seller: cavemart.tokenOwner,
          start: cavemart.start,
          startPrice: cavemart.startPrice,
          tokenId: cavemart.tokenID,
          isListed: cavemart.tokenIsListed,
          signature: cavemart.signatureHash,
        })

    return new StakingPosition({
      chainId,
      tokenId: log.tokenID,
      position,
      reward,
      market,
    })
  }
  return { stakingV1ToStakingPosition }
}
