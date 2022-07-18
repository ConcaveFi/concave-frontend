import type { Nft } from '@alch/alchemy-web3'
import { BaseProvider } from '@ethersproject/providers'
import { ConcaveNFTMarketplace, StakingV1Contract } from './contract'
import { MarketItem, StakingPosition } from './entities'

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

export const fechMarketInfo = async (provider: BaseProvider, position: StakingPosition) => {
  const contract = new ConcaveNFTMarketplace(provider)
  return MarketItem.from({
    offer: contract.nftContractAuctions(position),
    itemId: contract.tokenIdToItemIds(position),
    position,
  })
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
      console.log(log)
      const position = stakingV1Contract.positions(log.positionID)
      const reward = stakingV1Contract.viewPositionRewards(log.positionID)
      return new StakingPosition({
        chainId,
        tokenId: log.positionID,
        position: await position,
        reward: await reward,
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
  }
}`

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
}