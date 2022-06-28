import type { Nft } from '@alch/alchemy-web3'
import { StakingV1Contract } from './contract'
import { STAKING_CONTRACT } from '@concave/core'
import { MarketItemInfo } from './entities'
import { ConcaveNFTMarketplace } from './contract'
import { BaseProvider } from '@ethersproject/providers'
import { StakingPosition } from './entities'

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
  return MarketItemInfo.from({
    offer: contract.nftContractAuctions(position),
    itemId: contract.tokenIdToItemIds(position),
    position,
  })
}

export const listUserPositions = async (
  userAddress: string,
  provider: BaseProvider,
  alchemy: string,
) => {
  const stakingV1Contract = new StakingV1Contract(provider)
  const chainId = provider.network.chainId
  const usersNft = await listAllNonFungibleTokensOnAddress(
    userAddress,
    chainId,
    alchemy,
    STAKING_CONTRACT[chainId],
  )
  return Promise.all(
    usersNft.map(async ({ id }: Nft) => {
      const position = stakingV1Contract.positions(id.tokenId)
      const reward = stakingV1Contract.viewPositionRewards(id.tokenId)
      return new StakingPosition({
        chainId,
        tokenId: id.tokenId,
        position: await position,
        reward: await reward,
      })
    }),
  )
}
