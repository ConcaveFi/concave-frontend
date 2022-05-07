import { Flex } from '@concave/ui'
import MarketPlaceListingMobile from './UserCard/MarketPlaceListing'
import { NftPositionViewer } from './UserCard/NftPositionViewer'
import RedeemContainer from './UserCard/RedeemContainer'

const UserDashBoardCardMobile = () => {
  return (
    <Flex
      bg={'linear-gradient(223.18deg, #19394C 27.18%, #0A161F 96.11%)'}
      rounded={'2xl'}
      direction="column"
      shadow={'Up Big'}
    >
      <Flex direction={'column'} bg="url(assets/textures/metal.png)" bgSize={'30% 30%'}>
        <NftPositionViewer />
        <RedeemContainer />
        <MarketPlaceListingMobile />
      </Flex>
    </Flex>
  )
}

export default UserDashBoardCardMobile
