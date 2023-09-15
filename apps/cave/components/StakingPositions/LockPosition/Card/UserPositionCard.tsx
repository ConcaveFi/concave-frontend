import { StakingPosition } from '@concave/marketplace'
import {
  Flex,
  gradientBorder,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
} from '@concave/ui'
import { format, formatDistanceToNow } from 'date-fns'
import { memo, useState } from 'react'
import { MarketListing } from '../MarketLockInfo/YourMarketplaceListingBox'
import { NFTPositionHeader } from '../NFTPositionHeader/NFTPositionHeader'

interface NftPositionCardProps {
  stakingPosition: StakingPosition
}

export const UserPositionCard = (props: NftPositionCardProps) => {
  const { stakingPosition } = props
  const { isOpen, onClose, onOpen } = useDisclosure()
  const redeemable = stakingPosition.maturity <= Date.now() / 1000
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Flex
          w={'full'}
          minH="200px"
          rounded={'2xl'}
          bg="bg.primary"
          my={2}
          shadow={'up'}
          direction="column"
          onMouseOverCapture={onOpen}
          onMouseOutCapture={onClose}
          _hover={{ ...gradientBorder({ borderWidth: 2 }), shadow: 'Blue Light' }}
        >
          <NFTPositionHeader active={true} stakingPosition={stakingPosition} />
          <MarketListing stakingPosition={stakingPosition} />
        </Flex>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <Flex
            w={'290px'}
            h="100px"
            apply="background.glass"
            css={{ '::after': { opacity: 1 } }}
            rounded={'2xl'}
            sx={{ ...gradientBorder({ borderWidth: 2 }) }}
          >
            <Flex direction={'column'} justify="center" px={6}>
              <Flex align={'center'} gap={2}>
                <Text color={'text.low'}>Redeem date:</Text>
                <Text fontWeight={'bold'}>
                  {format(new Date(stakingPosition.maturity * 1000), 'MM/dd/yyyy')}
                </Text>
              </Flex>
              <Flex align={'center'} gap={2}>
                {!redeemable && <Text color={'text.low'}>Redeem in:</Text>}
                <Text fontWeight={'bold'} color="text.accent">
                  {!redeemable && formatDistanceToNow(new Date(stakingPosition.maturity * 1000))}
                  {redeemable && 'Redeemable'}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export const UserPositionCardMemo = memo(
  UserPositionCard,
  (propa, propb) => JSON.stringify(propa) === JSON.stringify(propb),
)
