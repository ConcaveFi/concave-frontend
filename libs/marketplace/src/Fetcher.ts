import { BaseProvider } from '@ethersproject/providers'
import { StakingV1Contract } from './contract'
import { StakingPool, stakingPools } from './entities'
import { parser } from './graphql/parser'
import { fetchAllCavemart, fetchUsersPositions, listCavemartListingDocuments, listReceivedTokensHistoryByAddress, listSellPositionsHistoryByAddressQuery } from './graphql/querys'

export const listUserHistory = ({
  chainId,
  address,
}: {
  address: string
  chainId: number
}) => {
  return ([
    listReceivedTokensHistoryByAddress(chainId, address),
    listSellPositionsHistoryByAddressQuery(chainId, address)
  ]) as const
}

export const listPositons = async ({
  provider,
  owner,
}: {
  owner?: string
  provider: BaseProvider
}) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const { data } = await fetchUsersPositions(provider.network.chainId)
  const preFilter = data.logStakingV1
    .filter((l) => l.tokenID)
    .filter((l) => !owner || l.to.toLocaleLowerCase() === owner.toLocaleLowerCase())
  const { stakingV1ToStakingPosition } = parser(stakingV1Contract, provider)
  const result = await Promise.all(preFilter.map(stakingV1ToStakingPosition))
  return result.filter((p) => !p.currentValue.eq(0)) //remove redeemeds
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

export type LogStakingV1 = {
  to: string
  poolID: number
  tokenID?: number
  amountLocked: string
  txHash: string
  lockedUntil: number
  marketplace: Marketplace[]
}

export type Marketplace = {
  created_at: string
  signatureHash: string
  start: string
  startPrice?: string
  endPrice?: string
  tokenID: number
  tokenOwner: `0x${string}`
  tokenIsListed: boolean
  deadline?: number
  updated_at: string
  soldFor: string
  txHash: string
  newOwner: `0x${string}`
  tokenOption: string
}
