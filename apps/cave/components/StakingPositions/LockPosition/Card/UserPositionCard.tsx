import { StakingPosition } from '@concave/marketplace'
import { Box, Collapse, Flex } from '@concave/ui'
import { MarketListing } from '../MarketLockInfo/MarketListing'
import { NFTPositionHeader } from '../NFTPositionHeader/NFTPositionHeader'
import RedeemCardViewer from '../Redeem/RedeemViewer'
import { useUserPositionState } from './useUserPositionState'

interface NftPositionCardProps {
  stakingPosition: StakingPosition
}

export const UserPositionCard = (props: NftPositionCardProps) => {
  const { toogleActive, active, stakingPosition } = useUserPositionState(props)
  return (
    <Box
      pos={'relative'}
      borderRadius={'2xl'}
      maxHeight={{ lg: '300px', md: '400px' }}
      width="full"
      apply={{ base: 'background.metal', md: 'background.metalBrighter' }}
      mr={1}
      mb={3}
    >
      {/* <Flex shadow={'up'} rounded="2xl"> */}
      <Flex direction={'column'} shadow={'up'} rounded="2xl">
        <NFTPositionHeader
          stakingPosition={stakingPosition}
          active={active}
          toogleActive={toogleActive}
        />
        <Collapse in={active}>
          <RedeemCardViewer stakingPosition={stakingPosition} />
          {active && <MarketListing stakingPosition={stakingPosition} />}
        </Collapse>
      </Flex>
      {/* </Flex> */}
    </Box>
  )
}
