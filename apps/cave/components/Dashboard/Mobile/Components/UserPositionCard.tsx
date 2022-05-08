import { Card, CardProps, Flex, Text } from '@concave/ui'
import { nftContract } from 'components/Dashboard/UserPositionCard'
import MarketPlaceListingMobile from './UserCard/MarketPlaceListing'
import { NftPositionViewer } from './UserCard/NftPositionViewer'
import RedeemContainer from './UserCard/RedeemContainer'
import StakingRewardMobile from './UserCard/StakingReward'

interface NftPositionCardMobileProps {
  contract: nftContract
}

const UserPositionCardMobile = (props: NftPositionCardMobileProps) => {
  const { contract } = props
  const { poolID, shares, rewardDebt, maturity } = contract

  const sharesDecimals = parseInt(shares._hex, 16) / 1000000000000000000
  const gained = parseInt(rewardDebt._hex, 16) / 1000000000000000000

  const dateToRedeem = epochConverter(maturity)
  const currentData = new Date()
  const redeemIn = dateToRedeem.getTime() - currentData.getTime()
  return (
    <Card width={'358px'} variant="secondary" height={'660px'}>
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
            <NftPositionViewer redeemIn={redeemIn} stakeType={poolID} />
            <RedeemContainer gained={gained} initial={sharesDecimals} />
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
const epochConverter = (epoch: number) => {
  const timeInMillis = epoch * 1000
  const dateFromEpoch = new Date(timeInMillis)
  return dateFromEpoch
}
