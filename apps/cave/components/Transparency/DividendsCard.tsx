import { Card, Flex, Text } from '@concave/ui'

export default function DividendsCard() {
  return (
    <Card
      direction={{ base: 'column', lg: 'row' }}
      align="center"
      w={'100%'}
      variant="secondary"
      height={'auto'}
      p={6}
      justifyContent={'center'}
      gap={{ base: 4, xl: 0 }}
    >
      <Text textAlign={'center'} w={{ base: '100%', lg: '33%' }} fontSize={'3xl'} fontWeight={700}>
        Dividends
      </Text>
      <Flex justifyContent={'center'} w={{ base: '100%', lg: '33%' }}>
        <Text
          textAlign={'center'}
          fontWeight={700}
          textColor={'text.low'}
          fontSize="14px"
          w={{ base: '70%', lg: '90%' }}
        >
          Dividends are distributed on a quarterly basis to the holders. You may redeem these
          dividends upon the distribution date on the Your Stake Position page.
        </Text>
      </Flex>
      <Flex justifyContent={'center'} w={{ base: '100%', lg: '33%' }}>
        <Card
          width={'250px'}
          height="105px"
          rounded={'2xl'}
          direction="column"
          justify={'center'}
          align="center"
          fontWeight={700}
          my={'auto'}
          shadow={'up'}
        >
          <Text fontSize={'2xl'}>Coming Soon</Text>
          <Text textColor={'text.low'} fontSize="14px">
            Distribution date TBD
          </Text>
        </Card>
      </Flex>
    </Card>
  )
}
