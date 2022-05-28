import { SpinnerIcon } from '@concave/icons'
import { Flex, keyframes, Text } from '@concave/ui'
import { BigNumber } from 'ethers'
import { formatFixed } from 'utils/formatFixed'
import { useConnect } from 'wagmi'

interface DividendsShareMobileProps {
  totalLocked: BigNumber
  isLoading: boolean
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
const DividendsShareMobile = (props: DividendsShareMobileProps) => {
  const [{ data: wallet }] = useConnect()
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }
  const { isLoading } = props
  const totalLocked = !wallet.connected
    ? '--.--.--.--'
    : isLoading
    ? 'Loading'
    : formatFixed(props.totalLocked, { decimals: 3 })
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
        <Flex height={'60px'} justify={'space-around'} textAlign="center">
          <Flex flex={1} direction={'column'}>
            <LowText label="Total Locked:" />
            <Flex justify={'center'}>
              <HighText label={parseFloat(totalLocked).toFixed(2) + ' CNV'} />
              {isLoading && (
                <SpinnerIcon css={spinnerStyles} height={'15px'} width={'15px'} ml={1} my="auto" />
              )}
            </Flex>
          </Flex>
          <Flex flex={1} direction={'column'}>
            <LowText label="Your dividends share:" />
            <HighText label="--.--" />
          </Flex>
        </Flex>
        <Flex height={'60px'} justify={'space-around'} textAlign="center">
          <Flex flex={1} direction={'column'}>
            <LowText label="Next devidend date:" />
            <HighText label="07/04/2022" />
          </Flex>
          <Flex flex={1} direction={'column'}>
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
