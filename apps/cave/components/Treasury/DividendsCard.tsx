import { Button, Card, Flex, Text, Image } from '@concave/ui'

export default function DividendsCard() {
  return (
    <Flex height={'full'} width="full" justify={'center'} align="center">
      <Card
        width={'900px'}
        height="400px"
        bg={'rgba(113, 113, 113, 0.01)'}
        backdropFilter="blur(15px)"
        shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
        direction="row"
      >
        <Flex direction={'column'} maxWidth="360px" height={'full'}>
          <DividendsInfo />
          <Flex flex={1} justify="center" align={'end'}>
            <PerformanceButton />
          </Flex>
        </Flex>
        <Flex
          direction={'column'}
          flex={1}
          justify="center"
          align={'center'}
          gap="20px"
          height={'full'}
        >
          <Flex gap={'20px'}>
            <MonthCard />
            <DividendsViewerCard />
          </Flex>
          <PeriodsCards />
        </Flex>
      </Card>
    </Flex>
  )
}
const DividendsViewerCard = () => {
  return (
    <Card width={'250px'} height="140px" variant="secondary" justify={'center'} align="center">
      <Text fontWeight={'700'} fontSize={'32px'}>
        $1,233,832.3
      </Text>
      <Text textColor={'text.low'} fontWeight="700">
        Dividends to Distribute
      </Text>
    </Card>
  )
}

const MonthCard = () => {
  return (
    <Card width={'250px'} height="140px" variant="secondary" justify={'center'} align="center">
      <Text fontWeight={'700'} fontSize={'32px'}>
        4 July 2022
      </Text>
      <Text textColor={'text.low'} fontWeight="700">
        Next Distribution Date
      </Text>
    </Card>
  )
}

const PeriodsCards = () => {
  return (
    <Card
      width={'520px'}
      height="200px"
      variant="secondary"
      backgroundBlendMode="screen"
      direction={'row'}
      justify="space-around"
      align={'start'}
      pt="3"
    >
      <StakePeriodCard multiply={4} month={12} src={'/assets/marketplace/12mposition.png'} />
      <StakePeriodCard multiply={2} month={3} src={'/assets/marketplace/6mposition.png'} />
      <StakePeriodCard multiply={3} month={6} src={'/assets/marketplace/3mposition.png'} />
      <StakePeriodCard multiply={1} month={1} src={'/assets/marketplace/1mposition.png'} />
    </Card>
  )
}
interface StakePeriodCardProps {
  multiply: number
  month: number
  src: string
}
const StakePeriodCard = ({ month, multiply, src }: StakePeriodCardProps) => {
  return (
    <Flex position={'relative'} direction={'column'} width={'118px'} justify="center">
      <Flex height={'20px'} justify="center">
        <Text
          fontSize={'34px'}
          fontWeight="700"
          textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
          textAlign="center"
          position={'absolute'}
        >
          x{multiply}
        </Text>
      </Flex>

      <Image width={'120px'} height="120px" sizes="90%" src={src} alt="position" />
      <Flex direction={'column'} position={'absolute'} width="full" mt="130px" align={'center'}>
        <Text textColor={'text.low'}>Stake period</Text>
        <Text fontSize={'18px'} fontWeight="700">
          {month} Month
        </Text>
      </Flex>
    </Flex>
  )
}

const PerformanceButton = () => {
  return (
    <Button>
      <Flex
        justify={'center'}
        bg="linear-gradient(90deg, #72639B 0%, #44B9DE 100%)"
        align="center"
        height={'49px'}
        width="272px"
        shadow={'up'}
        rounded="16px 16px 0px 0px"
        fontSize={'18px'}
        fontWeight="700"
      >
        <Text>Dividends Performance</Text>
      </Flex>
    </Button>
  )
}

const DividendsInfo = () => {
  return (
    <>
      <Text
        textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
        fontSize={'48px'}
        fontWeight="700"
        ml={10}
        mt="4"
      >
        Dividends
      </Text>
      <Text ml={10} textColor="text.low">
        This is how you will get money from holding your Stake positions. Amount of money will be
        distributed for you at especific date.
      </Text>
      <Text fontSize={'24px'} mt={2} ml={10}>
        Dividends Boost:
      </Text>
      <Text ml={10} textColor="text.low">
        Concave Dividends will be distributed base on
      </Text>
      <Flex ml={10} textColor="text.low">
        <Text>a Stake duration.</Text>
        <Text textColor={'white'} fontWeight="700" pl={1}>
          12 month
        </Text>
        <Text pl={1}>staking have</Text>
      </Flex>
      <Text ml={10} textColor="text.low">
        highest rewards but have a stake cap.
      </Text>
    </>
  )
}
