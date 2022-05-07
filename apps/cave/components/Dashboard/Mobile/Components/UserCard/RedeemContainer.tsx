import { Button, ButtonProps, Flex, Text, TextProps, VStack } from '@concave/ui'

const RedeemContainer = () => {
  return (
    <Flex height={'127px'} width="358px" direction="column">
      <Flex height={'70px'} maxH="70px" align={'center'}>
        <VStack spacing={0} justify="center" flex={1}>
          <LowText>Current value</LowText>
          <HighText>612.234 CNV</HighText>
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
      <RedeemButton />
    </Flex>
  )
}

export default RedeemContainer

const RedeemButton: React.FC<ButtonProps> = ({ ...props }, onClick?: () => void) => {
  return (
    <Button
      variant={'primary.outline'}
      rounded={'2xl'}
      height="48px"
      mx={10}
      _hover={{}}
      _focus={{}}
      shadow="Down Big"
      {...props}
    >
      <LowText fontSize={'20px'}>Not Redeemable</LowText>
    </Button>
  )
}

const LowText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'} {...props}></Text>
}

const HighText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'} {...props}></Text>
}
