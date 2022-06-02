import { Card, CardProps, Flex, Text, TextProps, VStack } from '@concave/ui'

const StakingRewardMobile: React.FC<CardProps> = ({ ...props }) => {
  return (
    <>
      <Flex justify={'center'} align="center">
        <HighText fontSize={'20px'}>Your Staking Reward</HighText>
      </Flex>
      <Flex>
        <VStack flex={1} minHeight="70px" spacing={0} justify="center" align={'center'}>
          <LowText>Just Now</LowText>
          <AccentText>+0.0011 CNV</AccentText>
        </VStack>
        <VStack flex={1} minHeight="70px" spacing={0} justify="center" align={'center'}>
          <LowText>2 min agor</LowText>
          <AccentText opacity={'0.8'}>+0.0095 CNV</AccentText>
        </VStack>
        <VStack flex={1} minHeight="70px" spacing={0} justify="center" align={'center'}>
          <LowText>8 hours ago</LowText>
          <AccentText opacity={'0.6'}>+0.0045 CNV</AccentText>
        </VStack>
      </Flex>
    </>
  )
}

export default StakingRewardMobile
const LowText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'} {...props}></Text>
}
const AccentText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.accent'} fontSize="12px" fontWeight={'700'} {...props}></Text>
}

const HighText: React.FC<TextProps> = ({ ...props }) => {
  return <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'} {...props}></Text>
}
