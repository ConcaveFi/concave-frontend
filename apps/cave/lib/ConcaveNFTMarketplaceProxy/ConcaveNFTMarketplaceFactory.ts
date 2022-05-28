import { ConcaveNFTMarketplace } from './ConcaveNFTMarketplaceInterface'
import { ConcaveNFTMarketplaceContract } from './ConcaveNFTMarketplaceContract'
import { ConcaveNFTMarketplaceMock } from './ConcaveNFTMarketplace.mock'

export const ConcaveNFTMarketplaceFactory = ({
  chainId,
}: {
  chainId: number
}): ConcaveNFTMarketplace => {
  try {
    return new ConcaveNFTMarketplaceContract(chainId)
  } catch {
    return new ConcaveNFTMarketplaceMock()
  }
}
