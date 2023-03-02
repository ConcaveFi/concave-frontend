import { chain } from '@wagmi/core'
import { Address } from '../entities'

const listCavemartListingDocumentsQuery = `query GET_ALL_CAVEMART_USERS_LISTINGS {
  logStakingV1(
    where: {marketplace: {tokenID: {_is_null: false}}}
    distinct_on: [tokenID]
    order_by: [{tokenID: asc}, {txBlockNumber: desc}, {created_at: desc}], 
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    marketplace(
      where: {tokenID: {_is_null: false}}
      distinct_on: [tokenID]
      order_by: [{tokenID: asc},{created_at: desc}]
    ) {
      tokenID
      newOwner
      start
      startPrice
      endPrice
      deadline
      soldFor
      tokenOwner
      txHash
      tokenIsListed
      signatureHash
      tokenOption
      created_at
    }
  }
}`

const fetchUserPositionsQuery = `query GET_ALL_USERS_POSITIONS {
  logStakingV1(
    distinct_on: [tokenID]
    order_by: [{tokenID: asc}, {txBlockNumber: desc}, {created_at: desc}], 
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    marketplace {
      tokenID
      newOwner
      start
      startPrice
      endPrice
      deadline
      soldFor
      tokenOwner
      txHash
      tokenOption
      tokenIsListed
      signatureHash
      created_at
    }
  }
}`

const fetchAllCavemartQuery = `query ListCavemart {
  logStakingV1(
    where: {marketplace: {} }
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
    marketplace(
      order_by: {updated_at: desc_nulls_last}
      where: {tokenOption: {_is_null: false}}
    ) {
      tokenID
      updated_at
      newOwner
      start
      startPrice
      endPrice
      deadline
      soldFor
      tokenOwner
      txHash
      tokenIsListed
      signatureHash
      created_at
      tokenOption
    }
  }
}`

const sellPositionsHistoryByAddressQuery = (
  address: string,
) => `query LIST_SELL_POSITIONS_BY_ADDRESS_HISTORY {
  logStakingV1(
    distinct_on: [tokenID]
    order_by: [{tokenID: asc}, {txBlockNumber: desc}, {created_at: desc}]
    where: {marketplace: {tokenOwner: {_ilike: "${address}"}, newOwner: {_is_null: false}}}
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
  }
}`

const getReceivedTokensHistoryByAddressQuery = (
  address: string,
) => `query LIST_RECEIVED_POSITIONS_BY_ADDRESS_HISTORY {
  logStakingV1(
    distinct_on: [tokenID]
    order_by: [{tokenID: asc}, {txBlockNumber: desc}, {created_at: desc}]
    where: {to: {_ilike: "${address}"}}
  ) {
    created_at
    to
    amountLocked
    poolID
    tokenID
    txHash
    lockedUntil
  }
}
`

export const listReceivedTokensHistoryByAddress = (chainId: number, address: string) => {
  return fetcher<{ data: { logStakingV1: (LogStakingV1 & { marketplace: never })[] } }>(
    getHasuraEndpoint({ chainId }),
    {
      method: 'POST',
      body: JSON.stringify({ query: getReceivedTokensHistoryByAddressQuery(address) }),
    },
  )
}

export const listSellPositionsHistoryByAddressQuery = (chainId: number, address: string) => {
  return fetcher<{ data: { logStakingV1: (LogStakingV1 & { marketplace: never })[] } }>(
    getHasuraEndpoint({ chainId }),
    {
      method: 'POST',
      body: JSON.stringify({ query: sellPositionsHistoryByAddressQuery(address) }),
    },
  )
}

const fetcher = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const request = await fetch(input, init)
  const data: T = await request.json()
  return data
}

const getHasuraEndpoint = ({ chainId = chain.mainnet.id }) => {
  if (chainId === chain.mainnet.id) return `https://concave.hasura.app/v1/graphql`
  if (chainId === chain.localhost.id) return `https://concave.hasura.app/v1/graphql`
  return `https://concave.hasura.app/v1/graphql`
}

export const fetchUsersPositions = (chainId: number) => {
  return fetcher<{ data: { logStakingV1: LogStakingV1[] } }>(getHasuraEndpoint({ chainId }), {
    method: 'POST',
    body: JSON.stringify({ query: fetchUserPositionsQuery }),
  })
}

export const listCavemartListingDocuments = (chainId: number) => {
  return fetcher<{ data: { logStakingV1: LogStakingV1[] } }>(getHasuraEndpoint({ chainId }), {
    method: 'POST',
    body: JSON.stringify({ query: listCavemartListingDocumentsQuery }),
  })
}

export const fetchAllCavemart = (chainId: number) => {
  return fetcher<{ data: { logStakingV1: LogStakingV1[] } }>(getHasuraEndpoint({ chainId }), {
    method: 'POST',
    body: JSON.stringify({ query: fetchAllCavemartQuery }),
  })
}

export interface LogStakingV1 {
  to: string
  poolID: number
  tokenID?: number
  amountLocked: string // "20.0",
  txHash: string // "0x777173eff35a94b7a58967059ccfa5c497b1d94831003c45a9aef56cb2f5918f",
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
  tokenOwner: Address
  tokenIsListed: boolean
  deadline?: number
  updated_at: string
  soldFor: string
  txHash: string
  newOwner: string
  tokenOption: string
}
