import { Button, Card, Flex, Text } from '@concave/ui'

export function DividendsShareMobile() {
  return (
    <Flex
      rounded={'2xl'}
      width={'358px'}
      height="242px"
      bgSize={'150%'}
      bgPos="top"
      bgImage="assets/textures/glass.jpg"
      boxShadow={'Up Big'}
    >
      <Flex bg={'#31293066'} rounded={'2xl'} width="full" direction={'column'}>
        <Flex width={'full'} py="15px" justify={'center'}>
          <Text textColor={'text.low'} fontSize="18px" fontWeight={700}>
            Your Dividends Share
          </Text>
        </Flex>
        <Flex height={'60px'} justify="space-around" textAlign="center">
          <Flex direction={'column'}>
            <LowText label="Total Locked" />
            <HighText label="6132.42 CNV" />
          </Flex>
          <Flex direction={'column'}>
            <LowText label="Total Locked" />
            <HighText label="6132.42 CNV" />
          </Flex>
        </Flex>
        <Flex height={'60px'} justify="space-around" textAlign="center">
          <Flex direction={'column'}>
            <LowText label="Total Locked" />
            <HighText label="6132.42 CNV" />
          </Flex>
          <Flex direction={'column'}>
            <LowText label="Total Locked" />
            <HighText label="6132.42 CNV" />
          </Flex>
        </Flex>
        <Flex
          alignSelf={'center'}
          height={'48px'}
          width="205px"
          border={'1px solid'}
          borderColor="skyblue"
          rounded="2xl"
          _active={{ transform: 'scale(0.85)' }}
          cursor={'pointer'}
          transition="all"
          transitionDuration={'.3s'}
          boxShadow={'Up Big'}
        >
          <Text
            textColor={'text.low'}
            fontWeight="700"
            my={'auto'}
            width="full"
            textAlign={'center'}
            fontSize="20px"
          >
            Redeem
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const LowText = (props: { label: string }) => {
  return (
    <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'}>
      {props.label}
    </Text>
  )
}

const HighText = (props: { label: string }) => {
  return (
    <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'}>
      {props.label}
    </Text>
  )
}
