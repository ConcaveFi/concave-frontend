import { Card, Flex, Text } from '@concave/ui'
interface DividendsCardProps {
  onChange: () => void
}

export default function DividendsCard({ width }: { width: string }) {
  return (
    <Card
      direction={{ base: 'column', lg: 'row' }}
      align="center"
      w={width}
      variant="secondary"
      height={{ base: '260px', lg: '179px' }}
      py={{ base: 2, lg: 0 }}
      px={6}
    >
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        align="center"
        mx={'auto'}
        gap={{ base: 0, xl: 0 }}
      >
        <Text fontSize={'4xl'} fontWeight="700">
          Dividends
        </Text>
        <Text
          textAlign={{ base: 'center', xl: 'justify' }}
          fontWeight={700}
          textColor={'text.low'}
          fontSize="14px"
          maxW={'350px'}
          px={{ base: 12, md: 0, xl: 6 }}
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
        shadow={'up'}
      >
        <Text fontSize={'2xl'}>Coming Soon</Text>
        <Text textColor={'text.low'} fontSize="14px">
          Distribution date TBD
        </Text>
      </Card>
    </Card>
  )
}
