import { createAlchemyWeb3, Nft } from '@alch/alchemy-web3'
import { StakingV1ProxyAddress } from 'lib/StakingV1Proxy/Address'
import { StakingV1Contract } from 'lib/StakingV1Proxy/StakingV1Contract'
import { ConcaveNFTMarketplace } from './ConcaveNFTMarketplace'
import { NonFungibleTokenInfo } from './NonFungibleToken'

export const listAllNonFunginleTokensOnAddress = async (owner: string, chainId: number) => {
  const network = chainId === 1 ? 'mainnet' : 'ropsten'
  const web3 = createAlchemyWeb3(`https://eth-${network}.alchemyapi.io/v2/demo`)
  const nft = await web3.alchemy.getNfts({ owner })
  return nft.ownedNfts.filter(
    (nft) => nft.contract.address.toUpperCase() === StakingV1ProxyAddress[chainId].toUpperCase(),
  )
}

export const fetchUserPositions = async (address: string, chainId: number) => {
  const stakingV1Contract = new StakingV1Contract(chainId)
  const usersNft = await listAllNonFunginleTokensOnAddress(address, chainId)
  return Promise.all(
    usersNft.map((nft) => {
      return stakingV1Contract.positions(nft.id.tokenId)
    }),
  )
}

export const fetchUserNonFungibleTokenInfo = async (address: string, chainId: number) => {
  const marketPlaceContract = new ConcaveNFTMarketplace(chainId)
  const stakingV1Contract = new StakingV1Contract(chainId)
  const usersNft = await listAllNonFunginleTokensOnAddress(address, chainId)
  return Promise.all(
    usersNft.map(async (nft) => {
      const tokenIndexId = nft.id.tokenId
      const positionInfo = await stakingV1Contract.positions(tokenIndexId)
      const auction = await marketPlaceContract.nftContractAuctions(
        nft.contract.address,
        nft.id.tokenId,
      )
      return new NonFungibleTokenInfo(nft.contract.address, nft.id.tokenId, positionInfo, auction)
    }),
  )
}
