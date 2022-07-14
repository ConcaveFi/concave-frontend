import { StakingPosition } from '@concave/marketplace'
import { Box, Button, Flex, Modal, Text } from '@concave/ui'
import { Loading } from 'components/Loading'
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
  const { marketItem } = marketItemState
  if (marketItem.isLoading) {
    return (
      <Loading
        m={4}
        size="sm"
        rLabel="Loading market info"
        width={{ base: '340px', md: '490px', lg: '650px' }}
      />
    )
  }
  if (marketItem.isError) {
    return <></>
  }

  const buttonState = getMarketPlaceButtonProps(marketItemState)
  const marketData = marketItem.data
  const auctionEnd = marketData.offer.auctionEnd.gt(0)
    ? formatDistanceToNow(new Date(+marketData.offer.auctionEnd.toString() * 1000), {
        addSuffix: false,
      })
    : '--.--.--'

  return (
    <Box shadow={marketData?.isListed ? '' : 'down'} borderRadius="2xl" width={'full'} p={4}>
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
              marketData?.isListed
                ? `${formatFixed(marketData?.listPrice, { places: 4 })} CNV`
                : '---'
            }
          />
          <Info
            label={'Discount:'}
            width={'full'}
            value={
              marketData?.isListed
                ? `${formatFixed(marketData?.discount, { decimals: 2 })} %`
                : '---'
            }
          />
          <Info label={'Expiration Date:'} width={'full'} value={auctionEnd} />
        </Flex>
        <Button variant={'primary'} minW={'160px'} size={'md'} width={'full'} {...buttonState} />
      </Flex>
      {marketData && <ListForSaleModal marketItemState={marketItemState} />}
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
