import { Box, Button, Flex, Modal, ModalContent, ModalOverlay, Text } from '@concave/ui'
import { Loading } from 'components/Loading'
import { NonFungibleTokenInfo } from 'lib/ConcaveNFTMarketplaceProxy/NonFungibleToken'
import { formatFixed } from 'utils/formatFixed'
import { ListPositionForSale, useListeForSaleState } from '../../UserListPositionCard'
import { Info } from '../Redeem/RedeemViewer'
import { getMarketPlaceButtonProps, useMarketInfo, UserMarketInfoState } from './useMarketPlaceInfo'
interface MarketplaceInfoProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

export const MarketListing = (props: MarketplaceInfoProps) => {
  const marketInfoState = useMarketInfo(props)
  const { marketInfo } = marketInfoState
  if (marketInfo.isLoading) {
    return <Loading m={4} size="sm" rLabel="Loading market info" />
  }

  const buttonState = getMarketPlaceButtonProps(marketInfoState)
  return (
    <Box
      shadow={marketInfo.data.isListed ? '' : 'down'}
      borderRadius="2xl"
      mt={{ lg: 1, md: 0 }}
      mb={3}
      mx={2}
      py={3}
      px={4}
    >
      <Flex justify={{ lg: 'left', md: 'center' }}>
        <Text color="text.low" fontSize="lg" as="b">
          Your Marketplace Listing
        </Text>
      </Flex>
      <Flex justify={{ lg: 'left', md: 'center' }}>
        <Info
          label={'List Price:'}
          width={'full'}
          valueFontSize={'lg'}
          value={
            marketInfo.data.isListed
              ? `${formatFixed(marketInfo.data.listPrice, { places: 4 })} CNV`
              : '---'
          }
        />
        <Info
          label={'Discount:'}
          width={'full'}
          value={
            marketInfo.data.isListed
              ? `${formatFixed(marketInfo.data.discount, { decimals: 2 })} %`
              : '---'
          }
        />
        <Info label={'Expiration Date:'} width={'full'} value={'---'} />
        <Button variant={'primary'} minW={'160px'} size={'md'} width={'full'} {...buttonState} />
      </Flex>
      <ListForSaleModal marketInfoState={marketInfoState} />
    </Box>
  )
}

export const ListForSaleModal = ({ marketInfoState }: { marketInfoState: UserMarketInfoState }) => {
  const listForSaleState = useListeForSaleState({ marketInfoState })
  return (
    <Modal
      title=""
      size={'xs'}
      isOpen={marketInfoState.offerDisclosure.isOpen}
      onClose={marketInfoState.offerDisclosure.onClose}
      isCentered
    >
      <ModalOverlay bg={'none'} backdropBlur="4px" zIndex={0} />
      <ModalContent>
        <ListPositionForSale state={listForSaleState} />
      </ModalContent>
    </Modal>
  )
}
