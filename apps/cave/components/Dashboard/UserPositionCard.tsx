import { Box, Collapse, Flex } from '@concave/ui'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { useState } from 'react'
import MarketplaceListing from './UserPosition/MarketplaceListing'
import NftPositionContainer from './UserPosition/NftPositionContainer'
import RedeemCardViewer from './UserPosition/RedeemViewer'
import DividendsShare from './UserPosition/StakingRewards'
interface NftPositionCardProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

const UserPositionCard = (props: NftPositionCardProps) => {
  const { nonFungibleTokenInfo } = props
  const { maturity, poolID, shares, rewardDebt, contractAddress, tokenId } = nonFungibleTokenInfo
  console.log(nonFungibleTokenInfo)
  const [active, setActive] = useState(true)

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
          maxWidth={{ lg: '550px', md: '380px' }}
        >
          <Flex bgSize="20% 30%" bgImage={'/assets/textures/metal.png'} shadow={'up'} rounded="2xl">
            <Flex direction={'column'}>
              <NftPositionContainer
                onChange={() => setActive(!active)}
                stakeType={poolID}
                maturity={maturity}
                tokendId={tokenId}
              />
              <Collapse in={active}>
                <RedeemCardViewer nonFungibleTokenInfo={nonFungibleTokenInfo} />
                <MarketplaceListing nonFungibleTokenInfo={nonFungibleTokenInfo} />
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
export default UserPositionCard
