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
      maxWidth={{ lg: '700px', md: '520px', base: '352px' }}
      bg={{
        base: 'linear-gradient(223.18deg, #19394C 27.18%, #0A161F 96.11%)',
        md: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)',
      }}
      mr={1}
      mb={3}
    >
      <Flex bgSize="20% 30%" bgImage={'/assets/textures/metal.png'} shadow={'up'} rounded="2xl">
        <Flex w={'full'} direction={'column'} minW={'600px'}>
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
      </Flex>
    </Box>
  )
}
