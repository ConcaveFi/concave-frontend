import { createAlchemyWeb3, Nft } from '@alch/alchemy-web3'
import { NEXT_PUBLIC_ALCHEMY_ID } from 'lib/env.conf'
import { StakingV1ProxyAddress } from 'lib/StakingV1Proxy/Address'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import { NonFungibleTokenInfo } from './NonFungibleToken'

const nftapi = NEXT_PUBLIC_ALCHEMY_ID

export const listAllNonFungibleTokensOnAddress = async (
  owner: string,
  chainId: number,
  contractAddresses?: string[],
  pageKey?: string,
) => {
  const network = chainId === 1 ? 'mainnet' : 'rinkeby'
  const web3 = createAlchemyWeb3(`https://eth-${network}.alchemyapi.io/v2/${nftapi}`)
  const response = await web3.alchemy.getNfts({
    owner,
    contractAddresses,
    pageKey,
  })
  if (!response.pageKey) return response.ownedNfts

  const nexPage = await listAllNonFungibleTokensOnAddress(
    owner,
    chainId,
    contractAddresses,
    response.pageKey,
  )
  const nfts: Nft[] = []
  nfts.push(...response.ownedNfts)
  nfts.push(...nexPage)
  return nfts
}

export const listUserNonFungibleTokenInfo = async (userAddress: string, chainId: number) => {
  const stakingV1Contract = new StakingV1Contract(chainId)
  const usersNft = await listAllNonFungibleTokensOnAddress(userAddress, chainId, [
    StakingV1ProxyAddress[chainId],
  ])
  return Promise.all(
    usersNft.map(async (nft) => {
      const tokenIndexId = nft.id.tokenId
      const positionInfo = stakingV1Contract.positions(tokenIndexId)
      const userRewards = stakingV1Contract.viewPositionRewards(+tokenIndexId)
      return new NonFungibleTokenInfo(
        nft.contract.address,
        tokenIndexId,
        await positionInfo,
        await userRewards,
      )
    }),
  )
}
