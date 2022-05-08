import { Button, Card, Flex, FlexProps, Spinner, Text } from '@concave/ui'

interface DividendsShareMobileProps extends FlexProps {
  totalLocked: number
  statusData: { isLoading; success; notConnected }
}
const DividendsShareMobile: React.FC<DividendsShareMobileProps> = ({ ...props }) => {
  const { statusData } = props
  const { isLoading, success, notConnected } = statusData
  const totalLocked = notConnected
    ? '--.--.--.--'
    : isLoading
    ? 'loading'
    : +parseFloat(props.totalLocked.toFixed(3))
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
            <LowText label="Total Locked:" />
            <Flex justify={'center'}>
              <HighText label={totalLocked} />
              {isLoading && <Spinner height={'20px'} width={'20px'} ml={1} />}
            </Flex>
          </Flex>
          <Flex direction={'column'}>
            <LowText label="Your dividends share:" />
            <HighText label="--.--" />
          </Flex>
        </Flex>
        <Flex height={'60px'} justify="space-around" textAlign="center">
          <Flex direction={'column'}>
            <LowText label="Next devidend date:" />
            <HighText label="07/04/2022" />
          </Flex>
          <Flex direction={'column'}>
            <LowText label="Available dividends:" />
            <HighText label="0.0" />
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

const LowText = (props: { label: string | number }) => {
  return (
    <Text textColor={'text.low'} fontSize="12px" fontWeight={'700'}>
      {props.label}
    </Text>
  )
}

const HighText = (props: { label: string | number }) => {
  return (
    <Text textColor={'text.high'} fontSize="15px" fontWeight={'700'}>
      {props.label}
    </Text>
  )
}
export default DividendsShareMobile
