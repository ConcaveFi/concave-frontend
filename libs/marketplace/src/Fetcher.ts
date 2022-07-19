import type { Nft } from '@alch/alchemy-web3'
import { CNV_ADDRESS, STAKING_CONTRACT } from '@concave/core'
import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import { StakingV1Contract } from './contract'
import { MarketItem, Position, StakingPosition } from './entities'

export const listAllNonFungibleTokensOnAddress = async (
  owner: string,
  chainId: number,
  alchemyKey: string,
  contractAddresses?: string,
  pageKey?: string,
) => {
  const network = chainId === 1 ? 'mainnet' : 'rinkeby'
  const url = new URL(`/${alchemyKey}/v1/getNFTs/`, `https://eth-${network}.alchemyapi.io`)
  url.searchParams.append('owner', owner)
  url.searchParams.append('contractAddresses[]', contractAddresses)
  pageKey && url.searchParams.append('pageKey', pageKey)
  const response = await fetch(url.toString()).then((r) => r.json())
  if (!response.pageKey) return response.ownedNfts
  const nexPage = await listAllNonFungibleTokensOnAddress(
    owner,
    chainId,
    alchemyKey,
    contractAddresses,
    response.pageKey,
  )
  const nfts: Nft[] = []
  nfts.push(...response.ownedNfts)
  nfts.push(...nexPage)
  return nfts
}

const getHasuraEndpoint = ({ chainId = 1 }) => {
  if (chainId === 1) {
    return `https://concave.hasura.app/v1/graphql`
  }
  return 'https://dev-concave.hasura.app/v1/graphql'
}

export const listUserPositions = async ({
  provider,
  owner,
}: {
  owner: string
  provider: BaseProvider
}) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const chainId = provider.network.chainId
  const logs = await fetch(getHasuraEndpoint(provider.network), {
    method: 'POST',
    body: JSON.stringify({
      query: fetchUserPositionsQuery,
      variables: { owner },
    }),
  })
    .then((r) => r.json())
    .then((r) => r.data.logStakingV1_Lock as LogStakingV1Lock[])

  return Promise.all(
    logs.map(async (log) => {
      const position: Position = {
        deposit: BigNumber.from(log.deposit),
        maturity: log.maturity,
        rewardDebt: BigNumber.from(log.rewardDebt),
        shares: BigNumber.from(log.shares),
        chainId,
        poolID: log.poolID,
      }
      const reward = stakingV1Contract.viewPositionRewards(log.positionID)
      const cavemart = log.cavemarts[0]

      return new StakingPosition({
        chainId,
        tokenId: log.positionID,
        position,
        reward: await reward,
        market: cavemart
          ? new MarketItem({
              deadline: cavemart.deadline,
              endPrice: cavemart.endPrice,
              erc20: CNV_ADDRESS[chainId],
              erc721: STAKING_CONTRACT[chainId],
              nonce: BigNumber.from(0),
              seller: cavemart.tokenOwner,
              start: cavemart.start,
              startPrice: cavemart.startPrice,
              tokenId: cavemart.tokenID,
              isListed: cavemart.tokenIsListed,
              signature: cavemart.signatureHash,
            })
          : undefined,
      })
    }),
  )
}

export const listListedPositions = async ({ provider }: { provider: BaseProvider }) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const chainId = provider.network.chainId
  console.log(provider.network.chainId)
  const logs = await fetch(getHasuraEndpoint(provider.network), {
    method: 'POST',
    body: JSON.stringify({ query: listCavemartListingDocuments }),
  })
    .then((r) => r.json())
    .then((r) => r.data.logStakingV1_Lock as LogStakingV1Lock[])
  return Promise.all(
    logs.map(async (log) => {
      const position: Position = {
        deposit: BigNumber.from(log.deposit || 0),
        maturity: log.maturity,
        rewardDebt: BigNumber.from(log.rewardDebt || 0),
        shares: BigNumber.from(log.shares || 0),
        chainId,
        poolID: log.poolID,
      }
      const reward = stakingV1Contract.viewPositionRewards(log.positionID)
      const cavemart = log.cavemarts[0]
      return new StakingPosition({
        chainId,
        tokenId: log.positionID,
        position,
        reward: await reward,
        market: cavemart
          ? new MarketItem({
              deadline: cavemart.deadline,
              endPrice: cavemart.endPrice,
              erc20: CNV_ADDRESS[chainId],
              erc721: STAKING_CONTRACT[chainId],
              nonce: BigNumber.from(0),
              seller: cavemart.tokenOwner,
              start: cavemart.start,
              startPrice: cavemart.startPrice,
              tokenId: cavemart.tokenID,
              isListed: cavemart.tokenIsListed,
              signature: cavemart.signatureHash,
            })
          : undefined,
      })
    }),
  )
}

export const fetchUserPositionsQuery = `
    query GET_NFT_LOCK_POSITION($owner: String!) {
  logStakingV1_Lock(order_by: {created_at: desc}, where: {to: {_eq: $owner}}) {
    to
    created_at
    amount
    deposit
    maturity
    poolBalance
    poolExcessRatio
    poolG
    poolID
    poolRewardsPerShare
    poolSupply
    poolTerm
    positionID
    rewardDebt
    shares
    timestamp
    txBlockNumber
    txHash
    cavemarts {
      created_at
      signatureHash
      start
      startPrice
      endPrice
      tokenID
      tokenOwner
      tokenIsListed
      deadline
    }
  }
}`

export const Insert_Cavemart_ListingDocument = `
    mutation INSERT_CAVEMART_LISTING($signatureHash: String!, $start: String!, $startPrice: String, $endPrice: String, $tokenID: numeric!, $tokenOwner: String!, $tokenIsListed: Boolean = true) {
  insert_cavemart_one(
    object: {signatureHash: $signatureHash, start: $start, startPrice: $startPrice, endPrice: $endPrice, tokenID: $tokenID, tokenIsListed: $tokenIsListed, tokenOwner: $tokenOwner}
  ) {
    tokenID
    tokenIsListed
  }
}`

export const listCavemartListingDocuments = `
query GET_ALL_CAVEMART_LISTINGS {
  logStakingV1_Lock(where: {cavemarts: {tokenIsListed: {_eq: true}}}) {
    txHash
    timestamp
    positionID
    poolID
    maturity
    deposit
    amount
    cavemarts {
      created_at
      signatureHash
      start
      startPrice
      endPrice
      tokenID
      tokenOwner
      tokenIsListed
      deadline
    }
  }
}
`

export interface LogStakingV1Lock {
  to: string
  created_at: Date
  amount: string
  deposit: string
  maturity: number
  poolBalance: string
  poolExcessRatio: any
  poolG: any
  poolID: number
  poolRewardsPerShare: string
  poolSupply: string
  poolTerm: number
  positionID: number
  rewardDebt: string
  shares: string
  timestamp: number
  txBlockNumber: number
  txHash: string
  cavemarts: Cavemart[]
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
}

fetch('https://dev-concave.hasura.app/v1/graphql', {
  headers: {
    accept: 'application/json, multipart/mixed',
    'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'sec-gpc': '1',
  },
  referrer: 'https://cloud.hasura.io/',
  referrerPolicy: 'strict-origin',
  body: '{"query":"query GET_ALL_CAVEMART_LISTINGS {\\n  logStakingV1_Lock(where: {cavemarts: {tokenIsListed: {_eq: true}}}) {\\n    txHash\\n    timestamp\\n    positionID\\n    poolID\\n    maturity\\n    deposit\\n    amount\\n    cavemarts {\\n      created_at\\n      signatureHash\\n      start\\n      startPrice\\n      endPrice\\n      tokenID\\n      tokenOwner\\n      tokenIsListed\\n      deadline\\n    }\\n  }\\n}","variables":null,"operationName":"GET_ALL_CAVEMART_LISTINGS"}',
  method: 'POST',
  mode: 'cors',
  credentials: 'omit',
})
