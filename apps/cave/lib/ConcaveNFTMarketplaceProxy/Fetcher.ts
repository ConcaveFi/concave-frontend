import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { StakingV1ProxyAddress } from 'lib/StakingV1Proxy/Address'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import { ConcaveNFTMarketplace } from './ConcaveNFTMarketplace'
import { NonFungibleTokenInfo } from './NonFungibleToken'
export const listAllNonFungibleTokensOnAddress = async (
  owner: string,
  chainId: number,
  contractAddress?: string,
) => {
  const network = chainId === 1 ? 'mainnet' : 'rinkeby'
  const web3 = createAlchemyWeb3(`https://eth-${network}.alchemyapi.io/v2/demo`)
  const nft = await web3.alchemy.getNfts({ owner })
  if (!contractAddress) {
    return nft.ownedNfts
  }
  return nft.ownedNfts.filter(
    ({ contract }) => contract.address.toUpperCase() === contractAddress.toUpperCase(),
  )
}
export const listUserNonFungibleTokenInfo = async (userAddress: string, chainId: number) => {
  const marketPlaceContract = new ConcaveNFTMarketplace(chainId)
  const stakingV1Contract = new StakingV1Contract(chainId)
  const usersNft = await listAllNonFungibleTokensOnAddress(
    userAddress,
    chainId,
    StakingV1ProxyAddress[chainId],
  )
  return Promise.all(
    usersNft.map(async (nft) => {
      const tokenIndexId = nft.id.tokenId
      const positionInfo = stakingV1Contract.positions(tokenIndexId)
      const auction = marketPlaceContract.nftContractAuctions(nft.contract.address, tokenIndexId)
      return new NonFungibleTokenInfo(
        nft.contract.address,
        tokenIndexId,
        await positionInfo,
        await auction,
      )
    }),
  )
}
