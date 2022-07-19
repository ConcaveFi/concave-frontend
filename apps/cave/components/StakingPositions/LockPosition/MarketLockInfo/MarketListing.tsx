import { StakingPosition } from '@concave/marketplace'
import { Box, Button, Flex, Modal, Text } from '@concave/ui'
import { formatDistanceToNow } from 'date-fns'
import { formatFixed } from 'utils/formatFixed'
import { ListPositionForSale, useListeForSaleState } from '../../UserListPositionCard'
import { Info } from '../Redeem/RedeemViewer'
import { getMarketPlaceButtonProps, useMarketInfo, UserMarketInfoState } from './useMarketPlaceInfo'
interface MarketplaceInfoProps {
  stakingPosition: StakingPosition
}

export const MarketListing = (props: MarketplaceInfoProps) => {
  const marketItemState = useMarketInfo(props)
  const { stakingPosition } = marketItemState
  const buttonState = getMarketPlaceButtonProps(marketItemState)
  const market = stakingPosition.market
  const auctionEnd = market?.deadline.gt(0)
    ? formatDistanceToNow(new Date(+market?.deadline.toString() * 1000), {
        addSuffix: false,
      })
    : '--.--.--'

  return (
    <Box shadow={market?.isListed ? '' : 'down'} borderRadius="2xl" width={'full'} p={4}>
      <Flex justify={{ lg: 'left', base: 'center' }}>
        <Text color="text.low" fontSize="lg" as="b">
          Your Marketplace Listing
        </Text>
      </Flex>
      <Flex justify={{ lg: 'left', md: 'center' }} direction={{ base: 'column', lg: 'row' }}>
        <Flex flexBasis={'200%'}>
          <Info
            label={'List Price:'}
            width={'full'}
            valueFontSize={'lg'}
            value={
              market?.isListed ? `${formatFixed(market.startPrice, { places: 4 })} CNV` : '---'
            }
          />
          <Info
            label={'Discount:'}
            width={'full'}
            value={market?.isListed ? `${formatFixed(0, { decimals: 2 })} %` : '---'}
          />
          <Info label={'Expiration Date:'} width={'full'} value={auctionEnd} />
        </Flex>
        <Button variant={'primary'} minW={'160px'} size={'md'} width={'full'} {...buttonState} />
      </Flex>
      <ListForSaleModal marketItemState={marketItemState} />
    </Box>
  )
}

export const ListForSaleModal = ({ marketItemState }: { marketItemState: UserMarketInfoState }) => {
  const listForSaleState = useListeForSaleState({ marketItemState })
  return (
    <Modal
      bluryOverlay
      title=""
      size={'xs'}
      isOpen={marketItemState.offerDisclosure.isOpen}
      onClose={marketItemState.offerDisclosure.onClose}
      isCentered
      hideClose
      bodyProps={{
        minW: 350,
        p: 0,
        rounded: '2xl',
        shadow: 'up',
        variant: 'primary',
      }}
    >
      <ListPositionForSale listForSaleState={listForSaleState} />
    </Modal>
  )
}
