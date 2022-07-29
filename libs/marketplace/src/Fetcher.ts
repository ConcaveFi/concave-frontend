import { BaseProvider } from '@ethersproject/providers'
import { StakingV1Contract } from './contract'
import { parser } from './graphql/parser'
import {
  fetchAllCavemart,
  fetchUserPositionsQuery,
  listCavemartListingDocuments,
} from './graphql/querys'
import { fetcher } from './util'

const getHasuraEndpoint = ({ chainId = 1 }) => {
  if (chainId === 1) {
    return `https://concave.hasura.app/v1/graphql`
  }
  return 'https://dev-concave.hasura.app/v1/graphql'
}

export const listPositons = async ({
  provider,
  owner,
}: {
  owner?: string
  provider: BaseProvider
}) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const { data } = await fetcher<{ data: { logStakingV1: LogStakingV1[] } }>(
    getHasuraEndpoint(provider.network),
    {
      method: 'POST',
      body: JSON.stringify({
        query: fetchUserPositionsQuery,
      }),
    },
  )
  const preFilter = data.logStakingV1
    .filter((l) => l.tokenID)
    .filter((l) => !owner || l.to === owner)
  const { stakingV1ToStakingPosition } = parser(stakingV1Contract, provider)
  return Promise.all(preFilter.map(stakingV1ToStakingPosition))
}

export const listListedPositions = async ({ provider }: { provider: BaseProvider }) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const { data } = await fetcher<{ data: { logStakingV1: LogStakingV1[] } }>(
    getHasuraEndpoint(provider.network),
    {
      method: 'POST',
      body: JSON.stringify({ query: listCavemartListingDocuments }),
    },
  )
  const { stakingV1ToStakingPosition } = parser(stakingV1Contract, provider)
  const dirtyResults = data.logStakingV1
  const cleanResults = dirtyResults.filter((c) => c.to === c.cavemart.at(-1).tokenOwner)
  return await Promise.all(cleanResults.map(stakingV1ToStakingPosition))
}

export const marketplaceActivity = async ({ provider }: { provider: BaseProvider }) => {
  const { data } = await fetcher<{ data: { logStakingV1: LogStakingV1[] } }>(
    getHasuraEndpoint(provider.network),
    {
      method: 'POST',
      body: JSON.stringify({ query: fetchAllCavemart }),
    },
  )
  return data.logStakingV1
}

export interface LogStakingV1 {
  to: string
  poolID: number
  tokenID?: number
  cavemart: Cavemart[]
}

export type Cavemart = {
  created_at: string
  signatureHash: string
  start: string
  startPrice?: string
  endPrice?: string
  tokenID: number
  tokenOwner: string
  tokenIsListed: boolean
  deadline?: number
  updated_at: string
  soldFor: string
  txHash: string
  newOwner: string
  tokenOption: string
}
