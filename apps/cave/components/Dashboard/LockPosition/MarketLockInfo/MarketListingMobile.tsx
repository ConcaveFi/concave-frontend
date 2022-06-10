import { NonFungibleTokenInfo } from '@concave/marketplace-sdk'
import { Button, ButtonProps, Flex, Text, TextProps, VStack } from '@concave/ui'
import { Loading } from 'components/Loading'
import { formatFixed } from 'utils/formatFixed'
import { ListForSaleModal } from './MarketListing'
import { getMarketPlaceButtonProps, useMarketInfo } from './useMarketPlaceInfo'
interface MarketplaceInfoProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

export const MarketListingMobile = (props: MarketplaceInfoProps) => {
  const marketInfoState = useMarketInfo(props)
  const { marketInfo } = marketInfoState
  if (marketInfo.isLoading) {
    return <Loading m={4} size="sm" rLabel="Loading market info" />
  }

  const buttonState = getMarketPlaceButtonProps(marketInfoState)
  return (
    <Flex direction={'column'} height={'178px'} m={4} shadow="Down Medium" rounded={'2xl'}>
      <Flex height={'60px'} justify="center" align={'center'} width="full">
        <LowText fontSize={'xl'}>Your Marketplace Listing</LowText>
      </Flex>
      <Flex height={'40px'} maxH="70px" align={'center'}>
        <VStack spacing={0} justify="center" flex={1}>
          <LowText>Price</LowText>
          <HighText>
            {marketInfo.data.isListed
              ? `${formatFixed(marketInfo.data.listPrice, { places: 4 })} CNV`
              : '---'}
          </HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Discount</LowText>
          <HighText>
            {marketInfo.data.isListed
              ? `${formatFixed(marketInfo.data.discount, { decimals: 2 })} %`
              : '---'}
          </HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Expiration Date</LowText>
          <HighText>---</HighText>
        </VStack>
      </Flex>
      <Flex flex={1} align="center" justify={'center'}>
        <Button variant={'primary'} minW={'160px'} size={'md'} width={'full'} {...buttonState} />
      </Flex>
      <ListForSaleModal marketInfoState={marketInfoState} />
    </Flex>
  )
}

const ListForSale: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      disabled
      variant={'primary'}
      width="302px"
      height={'48px'}
      rounded="2xl"
      boxShadow={'Up Big'}
    >
      <HighText fontSize={'24px'}>Coming soon!</HighText>
    </Button>
  )
}

const LowText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'} {...props}></Text>
}

const HighText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'} {...props}></Text>
}
