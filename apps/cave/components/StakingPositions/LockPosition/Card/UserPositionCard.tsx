import { StakingPosition } from '@concave/marketplace'
import { Flex } from '@concave/ui'
import { MarketListing } from '../MarketLockInfo/YourMarketplaceListingBox'
import { NFTPositionHeader } from '../NFTPositionHeader/NFTPositionHeader'
import { useUserPositionState } from './useUserPositionState'

interface NftPositionCardProps {
  stakingPosition: StakingPosition
}

export const UserPositionCard = (props: NftPositionCardProps) => {
  const { toogleActive, active, stakingPosition } = useUserPositionState(props)

  return (
    <Flex
      w={'full'}
      height="200px"
      rounded={'2xl'}
      bg="url(assets/textures/metal.png), linear-gradient(180deg, #16222E 0.07%, #28394D 80.07%)"
      bgSize={'120px auto'}
      my={2}
      shadow={
        '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.15), inset -1px 1px 2px rgba(128, 186, 255, 0.4)'
      }
      direction="column"
    >
      <NFTPositionHeader active={true} stakingPosition={stakingPosition} toogleActive={() => {}} />
      <MarketListing stakingPosition={stakingPosition} />
    </Flex>
  )
}
