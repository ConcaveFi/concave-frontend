import { StakingPosition } from '@concave/marketplace'
import {
  Flex,
  gradientBorder,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@concave/ui'
import { MarketListing } from '../MarketLockInfo/YourMarketplaceListingBox'
import { NFTPositionHeader } from '../NFTPositionHeader/NFTPositionHeader'
import { useUserPositionState } from './useUserPositionState'

interface NftPositionCardProps {
  stakingPosition: StakingPosition
}

export const UserPositionCard = (props: NftPositionCardProps) => {
  const { stakingPosition } = useUserPositionState(props)
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <Popover isOpen={true} placement="right">
      <PopoverTrigger>
        <Flex
          w={'full'}
          height="200px"
          rounded={'2xl'}
          bg="url(assets/textures/metal.png), linear-gradient(180deg, #16222E 0.07%, #28394D 80.07%)"
          bgSize={'120px auto'}
          my={2}
          shadow={'up'}
          direction="column"
          onMouseOverCapture={onOpen}
          onMouseOutCapture={onClose}
          _hover={{ ...gradientBorder({ borderWidth: 2 }), shadow: 'Blue Light' }}
          p={'2px'}
        >
          <NFTPositionHeader
            active={true}
            stakingPosition={stakingPosition}
            toogleActive={() => {}}
          />
          <MarketListing stakingPosition={stakingPosition} />
        </Flex>
      </PopoverTrigger>
      <PopoverContent width="20px">
        <Flex
          w={'290px'}
          h="100px"
          apply="background.glass"
          rounded={'2xl'}
          sx={{ ...gradientBorder({ borderWidth: 2 }) }}
        >
          <Flex direction={'column'} justify="center" px={6}>
            <Text color={'text.low'} fontSize="sm">
              Start date:
            </Text>
            {/* <Text>{stakingPosition}</Text> */}
          </Flex>
        </Flex>
      </PopoverContent>
    </Popover>
  )
}
