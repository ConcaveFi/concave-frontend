import { Card, Flex, Text } from '@concave/ui'
interface DividendsCardProps {
  onChange: () => void
}
// go live
export default function DividendsCard() {
  return (
    <Card
      direction={{ base: 'column', lg: 'row' }}
      align="center"
      w={'full'}
      variant="secondary"
      height={{ base: '260px', lg: '179px' }}
      py={{ base: 2, lg: 0 }}
    >
      <Flex direction={{ base: 'column', xl: 'row' }} align="center" mx={'auto'}>
        <Text my={'auto'} mx="10" fontSize={'4xl'} fontWeight="700">
          Dividends
        </Text>
        <Text
          textAlign={{ base: 'center', xl: 'start' }}
          fontWeight={700}
          textColor={'text.low'}
          fontSize="14px"
          maxW={'350px'}
          px={{ base: 12, md: 0 }}
        >
          Dividends are distributed on a quarterly basis to the holders. You may redeem these
          dividends upon the distribution date on the Your Stake Position page.
        </Text>
      </Flex>
      <Card
        width={'250px'}
        height="105px"
        rounded={'2xl'}
        direction="column"
        justify={'center'}
        align="center"
        fontWeight="700"
        my={'auto'}
        mx="auto"
      >
        <Text fontSize={'2xl'}>Coming Soon</Text>
        <Text textColor={'text.low'} fontSize="14px">
          Distribution date TBD
        </Text>
      </Card>
    </Card>
  )
}
