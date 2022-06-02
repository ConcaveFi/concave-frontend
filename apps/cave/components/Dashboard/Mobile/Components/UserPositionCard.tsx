import { Card, Flex } from '@concave/ui'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import MarketPlaceListingMobile from './UserCard/MarketPlaceListing'
import { NftPositionViewer } from './UserCard/NftPositionViewer'
import RedeemContainer from './UserCard/RedeemContainer'
import StakingRewardMobile from './UserCard/StakingReward'

interface NftPositionCardMobileProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

const UserPositionCardMobile = (props: NftPositionCardMobileProps) => {
  const { nonFungibleTokenInfo } = props
  const { maturity, poolID, deposit, rewardDebt } = nonFungibleTokenInfo

  return (
    // Default height: 660px
    <Card maxWidth={'358px'} variant="secondary" height={'510px'}>
      <Flex direction={'column'} bg={'#31293011'} width="full" flex={1}>
        <Flex
          bg={'linear-gradient(223.18deg, #19394C 27.18%, #0A161F 96.11%)'}
          rounded={'2xl'}
          direction="column"
          shadow={'Up Big'}
        >
          <Flex
            position={'relative'}
            direction={'column'}
            bg="url(assets/textures/metal.png)"
            bgSize={'30% 30%'}
          >
            <NftPositionViewer redeemIn={maturity} stakeType={poolID} />
            <RedeemContainer nonFungibleTokenInfo={nonFungibleTokenInfo} />
            <MarketPlaceListingMobile />
            <Flex
              direction={'column'}
              height={'640px'}
              width="full"
              position={'absolute'}
              justify={'end'}
              zIndex={-1}
            >
              {/* <StakingRewardMobile position="relative" /> */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default UserPositionCardMobile
const epochConverter = (epoch: number) => {
  const timeInMillis = epoch * 1000
  const dateFromEpoch = new Date(timeInMillis)
  return dateFromEpoch
}
