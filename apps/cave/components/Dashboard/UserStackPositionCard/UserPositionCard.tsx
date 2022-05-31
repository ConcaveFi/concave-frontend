import { Box, Collapse, Flex } from '@concave/ui'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import MarketplaceInfo from '../UserPosition/MarketplaceInfo'
import NftPositionContainer from '../UserPosition/NftPositionContainer'
import RedeemCardViewer from '../UserPosition/RedeemViewer'
import DividendsShare from '../UserPosition/StakingRewards'
import { useUserPositionState } from './useUserPositionState'

interface NftPositionCardProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

const UserStackPositionCard = (props: NftPositionCardProps) => {
  const { setActive, active, nonFungibleTokenInfo } = useUserPositionState(props)

  return (
    <Box
      pos={'relative'}
      borderRadius={'2xl'}
      maxHeight={{ lg: '300px', md: '400px' }}
      bg={'linear-gradient(223.18deg, #19394C 27.18%, #0A161F 96.11%)'}
      mr={1}
      mb={3}
    >
      <Flex shadow={'down'} bgSize="20% 30%" bgImage={'/assets/textures/metal.png'} rounded="2xl">
        <Box
          bg="linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)"
          rounded="2xl"
          // maxWidth={{ lg: '550px', md: '380px' }}
          maxWidth={{ lg: '700px', md: '520px' }}
        >
          <Flex bgSize="20% 30%" bgImage={'/assets/textures/metal.png'} shadow={'up'} rounded="2xl">
            <Flex direction={'column'}>
              <NftPositionContainer
                onChange={() => setActive(!active)}
                nonFungibleTokenInfo={nonFungibleTokenInfo}
              />
              <Collapse in={active}>
                <RedeemCardViewer nonFungibleTokenInfo={nonFungibleTokenInfo} />
                <MarketplaceInfo nonFungibleTokenInfo={nonFungibleTokenInfo} />
              </Collapse>
            </Flex>
          </Flex>
        </Box>
        <Collapse in={active}>
          <DividendsShare />
        </Collapse>
      </Flex>
    </Box>
  )
}
export default UserStackPositionCard
