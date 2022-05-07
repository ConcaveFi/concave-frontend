import { Box, Button, ButtonProps, Card, Flex, Image, Text, TextProps, VStack } from '@concave/ui'

export const NftPositionViewer = () => {
  return (
    <Flex height={'176px'} width="358px" direction="column" rounded={'2xl'} shadow={'Up Big'}>
      <Flex
        height={'92px'}
        width="334px"
        mx={'auto'}
        mt={3}
        boxShadow={'Down Big'}
        rounded="2xl"
        justify={'space-between'}
      >
        <Flex direction={'column'} justify="center" align={'center'} width="100px">
          <LowText>Stake period</LowText>
          <HighText>6 months</HighText>
        </Flex>

        <Image w={'92px'} h={'92px'} src={'/assets/marketplace/6mposition.png'} alt="position" />
      </Flex>
      <Flex align={'center'} h={'120px'} maxH="120px">
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Stake Data</LowText>
          <HighText>12/07/22</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Redeem in</LowText>
          <HighText>143 days</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Redeem date</LowText>
          <HighText>12/07/22</HighText>
        </VStack>
      </Flex>
    </Flex>
  )
}

const LowText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'} {...props}></Text>
}

const HighText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'} {...props}></Text>
}
