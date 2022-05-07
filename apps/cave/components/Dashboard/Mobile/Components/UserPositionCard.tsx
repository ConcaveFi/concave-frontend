import { Card, CardProps, Flex, Text } from '@concave/ui'
import { DividendsShareMobile } from './DividendsShare'
import MarketPlaceListingMobile from './UserCard/MarketPlaceListing'
import { NftPositionViewer } from './UserCard/NftPositionViewer'
import RedeemContainer from './UserCard/RedeemContainer'
import StakingRewardMobile from './UserCard/StakingReward'

const UserPositionCardMobile: React.FC<CardProps> = ({ ...props }) => {
  return (
    <Card width={'358px'} variant="secondary" height={'660px'} {...props}>
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
            <NftPositionViewer />
            <RedeemContainer />
            <MarketPlaceListingMobile />
            <Flex
              direction={'column'}
              height={'640px'}
              width="full"
              position={'absolute'}
              justify={'end'}
              zIndex={-1}
            >
              <StakingRewardMobile position="relative" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default UserPositionCardMobile
