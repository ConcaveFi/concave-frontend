import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { useState } from 'react'

interface NftPositionCardProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

export const useUserPositionState = (props: NftPositionCardProps) => {
  const { nonFungibleTokenInfo } = props
  const [active, setActive] = useState(false)
  return {
    nonFungibleTokenInfo,
    active,
    toogleActive: () => {
      setActive(!active)
    },
  }
}