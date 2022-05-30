import { Button, ButtonProps, Flex, Text, TextProps, VStack } from '@concave/ui'

const MarketPlaceListingMobile = () => {
  return (
    <Flex direction={'column'} height={'178px'} m={4} shadow="Down Medium" rounded={'2xl'}>
      <Flex height={'60px'} justify="center" align={'center'} width="full">
        <LowText fontSize={'xl'}>Your Marketplace Listing</LowText>
      </Flex>
      <Flex height={'40px'} maxH="70px" align={'center'}>
        <VStack spacing={0} justify="center" flex={1}>
          <LowText>Price</LowText>
          <HighText>---</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Discount</LowText>
          <HighText>---</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Expiration Date</LowText>
          <HighText>---</HighText>
        </VStack>
      </Flex>
      <Flex flex={1} align="center" justify={'center'}>
        <ListForSale />
      </Flex>
    </Flex>
  )
}

export default MarketPlaceListingMobile

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
