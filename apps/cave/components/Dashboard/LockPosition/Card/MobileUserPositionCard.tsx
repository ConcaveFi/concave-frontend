import { NonFungibleTokenInfo } from '@concave/marketplace'
import { Card, Flex } from '@concave/ui'
import { useUserPositionState } from 'components/Dashboard/LockPosition/Card/useUserPositionState'
import { MarketListingMobile } from '../MarketLockInfo/MarketListingMobile'
import { NFTPositionHeaderMobile } from '../NFTPositionHeader/NFTPositionHeaderMobile'
import { RedeemMobileContainer } from '../Redeem/RedeemMobileView'

interface NftPositionCardMobileProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

export const UserPositionCardMobile = (props: NftPositionCardMobileProps) => {
  const { toogleActive, active, nonFungibleTokenInfo } = useUserPositionState(props)

  return (
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
            <NFTPositionHeaderMobile
              nonFungibleTokenInfo={nonFungibleTokenInfo}
              active
              toogleActive={toogleActive}
            />
            <RedeemMobileContainer nonFungibleTokenInfo={nonFungibleTokenInfo} />
            <MarketListingMobile nonFungibleTokenInfo={nonFungibleTokenInfo} />
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
