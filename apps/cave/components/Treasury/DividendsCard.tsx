import { Button, Card, Flex, Text, Image } from '@concave/ui'
import { GlassPanel } from './TreasuryManagementCard'

interface DividendsCardProps {
  onChange: () => void
}
// go live
export default function DividendsCard() {
  return (
    <Card
      width={{ xl: '900px', base: '510px' }}
      height={{ base: '300px', xl: '179px' }}
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      direction={{ base: 'column', xl: 'row' }}
      px="10"
      mb={6}
    >
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        flex={{ base: 0, xl: 1 }}
        gap={{ base: 0, xl: 5 }}
        py={2}
      >
        <Flex justify="center" align={'center'} height="full">
          <Text my={2} fontSize={'4xl'} fontWeight="700">
            Dividends
          </Text>
        </Flex>
        <Flex flex={1} justify="center" align={'center'}>
          <Text
            textAlign={{ base: 'center', xl: 'start' }}
            fontWeight={700}
            textColor={'text.low'}
            fontSize="14px"
          >
            Dividends are distributed on a quarterly basis to the holders. You may redeem these
            dividends upon the distribution date on the My Positions page.
          </Text>
        </Flex>
      </Flex>
      {/* <Flex flex={0.5} justify="center" align={'center'} height="full"> */}
      <GlassPanel
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
          Next Distribution Date
        </Text>
      </GlassPanel>
      {/* </Flex> */}
    </Card>
  )
}
