import { Button, Card, Flex, Text, Image } from '@concave/ui'
import { GlassPanel } from './TreasuryManagementCard'

interface DividendsCardProps {
  onChange: () => void
}

export default function DividendsCard() {
  return (
    <Card
      width={'900px'}
      height="179px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      direction="row"
    >
      <Flex flex={1} justify="center" align={'center'} height="full">
        <Text fontSize={'4xl'} fontWeight="700">
          Dividends
        </Text>
      </Flex>
      <Flex flex={1} justify="center" align={'center'} height="full">
        <Text fontWeight={700} textColor={'text.low'} fontSize="14px">
          This is how you will get money from holding your Stake positions. Amount of money will be
          distributed for you at especif date.
        </Text>
      </Flex>
      <Flex flex={1} justify="center" align={'center'} height="full">
        <GlassPanel
          width={'250px'}
          height="105px"
          rounded={'2xl'}
          direction="column"
          justify={'center'}
          align="center"
          fontWeight="700"
        >
          <Text fontSize={'2xl'}>4 July 2022</Text>
          <Text textColor={'text.low'} fontSize="14px">
            Next Distribution Date
          </Text>
        </GlassPanel>
      </Flex>
    </Card>
  )
}
