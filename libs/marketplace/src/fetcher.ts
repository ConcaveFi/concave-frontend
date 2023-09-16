import { BaseProvider } from '@ethersproject/providers'
import { StakingV1Contract } from './contract'
import { StakingPool, stakingPools } from './entities'
import { parser } from './graphql/parser'
import {
  fetchAllCavemart,
  fetchPositionInfo,
  fetchUsersPositions,
  listCavemartListingDocuments,
  listReceivedTokensHistoryByAddress,
  listSellPositionsHistoryByAddressQuery,
  LogStakingV1,
  Marketplace,
} from './graphql/querys'

export const listUserHistory = ({ chainId, address }: { address: string; chainId: number }) => {
  return [
    listReceivedTokensHistoryByAddress(chainId, address),
    listSellPositionsHistoryByAddressQuery(chainId, address),
  ] as const
}

export const listPositions = async ({
  provider,
  owner,
  excludeRedeemed,
}: {
  owner?: string
  excludeRedeemed?: boolean
  provider: BaseProvider
}) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const { data } = await fetchUsersPositions(provider.network.chainId)
  const preFilter = data.logStakingV1
    .filter((l) => l.tokenID)
    .filter((l) => !owner || l.to.toLocaleLowerCase() === owner.toLocaleLowerCase())
  const { stakingV1ToStakingPosition } = parser(stakingV1Contract, provider)
  const result = await Promise.all(preFilter.map(stakingV1ToStakingPosition))
  return excludeRedeemed ? result.filter((p) => !p.currentValue.eq(0)) : result
}

export const listListedPositions = async ({ provider }: { provider: BaseProvider }) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const { data } = await listCavemartListingDocuments(provider.network.chainId)
  const { stakingV1ToStakingPosition } = parser(stakingV1Contract, provider)
  const dirtyResults = data.logStakingV1
  const cleanResults = dirtyResults
    .filter(({ marketplace, to }) => {
      const [lastMarket] = [...marketplace].reverse()
      const tokenOwner = to === lastMarket.tokenOwner
      return tokenOwner
    })
    .filter((c) => c.marketplace[0].tokenIsListed)
  const result = await Promise.all(cleanResults.map(stakingV1ToStakingPosition))
  return result.filter((p) => !p.currentValue.eq(0)) //remove redeemeds
}

export const stakingPositionInfo = async ({
  provider,
  tokenId,
}: {
  provider: BaseProvider
  tokenId: number
}) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const { data } = await fetchPositionInfo(provider.network.chainId, tokenId)
  const { stakingV1ToStakingPosition } = parser(stakingV1Contract, provider)
  const dirtyResults = data.logStakingV1
  const cleanResults = dirtyResults.filter(({ marketplace, to }) => {
    const [lastMarket] = [...marketplace].reverse()
    const tokenOwner = lastMarket === undefined || to === lastMarket.tokenOwner
    return tokenOwner
  })
  const result = await Promise.all(cleanResults.map(stakingV1ToStakingPosition))
  return result.filter((p) => !p.currentValue.eq(0))
}

export const marketplaceActivity = async ({ provider }: { provider: BaseProvider }) => {
  const { data } = await fetchAllCavemart(provider.network.chainId)
  const dirtyResults = data.logStakingV1
  const keys = (obj: Marketplace & StakingPool & LogStakingV1) => {
    return JSON.stringify({ a: obj.tokenID, soldFor: obj.soldFor })
  }

  const activity: (Marketplace & StakingPool & LogStakingV1)[] = dirtyResults
    .reduce((previousValue, currentValue) => {
      const marketplaceActivity = currentValue.marketplace.map((marketplace) => {
        const stakingPool: StakingPool = stakingPools[currentValue.poolID]
        return {
          ...currentValue,
          ...stakingPool,
          ...marketplace,
          marketplace: undefined,
        } as Marketplace & StakingPool & LogStakingV1
      })
      return [...previousValue, ...marketplaceActivity]
    }, [])
    .filter((value, index, arr) => {
      const _value = keys(value)
      return index === arr.findIndex((obj) => keys(obj) === _value)
    })
  activity.sort(
    (first, seccond) =>
      new Date(seccond.updated_at).getTime() - new Date(first.updated_at).getTime(),
  )
  return activity
}
