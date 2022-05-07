import { Box, Button, ButtonProps, Card, Flex, Image, Text, TextProps, VStack } from '@concave/ui'

export const NftPositionViewer = () => {
  return (
    <Card variant="primary" height={'176px'} width="358px">
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
          <HighText>612.42CNV</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Gained</LowText>
          <HighText>12.032 CNV</HighText>
        </VStack>
        <VStack justify={'center'} spacing={0} flex={1}>
          <LowText>Initial</LowText>
          <HighText>600.10CNV</HighText>
        </VStack>
      </Flex>
    </Card>
  )
}

const RedeemButton: React.FC<ButtonProps> = ({ ...props }, onClick?: () => void) => {
  return (
    <Button _focus={{}} shadow="Down Big" {...props}>
      <Flex width={'326px'} height="48px" justify={'center'} align="center">
        <LowText fontSize={'20px'}>Not redeemable</LowText>
      </Flex>
    </Button>
  )
}

const LowText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'} {...props}></Text>
}

const HighText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'} {...props}></Text>
}
