import { createAlchemyWeb3, Nft } from '@alch/alchemy-web3'
import { StakingV1Contract } from '@concave/marketplace'
import { STAKING_CONTRACT } from '@concave/core'
import { MarketItemInfo } from '@concave/marketplace'
import { ConcaveNFTMarketplace } from '@concave/marketplace'
import { BaseProvider } from '@ethersproject/providers'
import { StakingPosition } from './entities'

export const listAllNonFungibleTokensOnAddress = async (
  owner: string,
  chainId: number,
  alchemy: string,
  contractAddresses?: string[],
  pageKey?: string,
) => {
  const network = chainId === 1 ? 'mainnet' : 'rinkeby'
  const web3 = createAlchemyWeb3(`https://eth-${network}.alchemyapi.io/v2/${alchemy}`)
  const response = await web3.alchemy.getNfts({
    owner,
    contractAddresses,
    pageKey,
  })
  if (!response.pageKey) return response.ownedNfts
  const nexPage = await listAllNonFungibleTokensOnAddress(
    owner,
    chainId,
    alchemy,
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
  const usersNft = await listAllNonFungibleTokensOnAddress(userAddress, chainId, alchemy, [
    STAKING_CONTRACT[chainId],
  ])
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
