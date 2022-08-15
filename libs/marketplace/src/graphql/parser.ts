import { Currency, NATIVE, STAKING_CONTRACT } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { BaseProvider } from '@ethersproject/providers'
import { StakingV1Contract } from 'src/contract'
import { MarketItem, StakingPosition } from 'src/entities'
import { LogStakingV1, Marketplace } from 'src/Fetcher'

export const parser = (stakingV1Contract: StakingV1Contract, provider: BaseProvider) => {
  const cavemartToMarket = async (marketplace: Marketplace) => {
    let currency: Currency = NATIVE[stakingV1Contract.chainId]
    try {
      if (marketplace.tokenOption != `0x0000000000000000000000000000000000000000`)
        currency = await Fetcher.fetchTokenData(marketplace.tokenOption, provider)
    } catch (e) {
      currency = NATIVE[stakingV1Contract.chainId]
    }

    return new MarketItem({
      deadline: marketplace.deadline,
      endPrice: marketplace.endPrice,
      currency,
      erc721: STAKING_CONTRACT[stakingV1Contract.chainId],
      seller: marketplace.tokenOwner,
      start: marketplace.start,
      startPrice: marketplace.startPrice,
      tokenId: marketplace.tokenID,
      isListed: marketplace.tokenIsListed,
      signature: marketplace.signatureHash,
    })
  }

  const stakingV1ToStakingPosition = async (log: LogStakingV1) => {
    const chainId = stakingV1Contract.chainId
    const [position, reward] = await Promise.all([
      stakingV1Contract.positions(log.tokenID),
      stakingV1Contract.viewPositionRewards(log.tokenID),
    ])
    const cavemart = log.marketplace.at(-1)
    const market = !cavemart ? undefined : await cavemartToMarket(cavemart)

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
