import { Button, Card, Flex, Text } from '@concave/ui'

interface TreasuryCardProps {
  onChange: () => void
}
export default function TreasuryManagementCard(props: TreasuryCardProps) {
  return (
    <Card
      direction={'column'}
      width={'900px'}
      height="400px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
    >
      <Flex direction={'row'} flex={1} m={'20px'} alignItems="start" gap={5}>
        <TreasuryViewer />
        <Flex direction={'column'} gap={5}>
          <FeesViewer title="Concave AMM Fees" />
          <FeesViewer title="MarketPlace Fees" />
          <FeesViewer title="POL Fees" />
        </Flex>
      </Flex>
      <BackButton onClick={() => props.onChange()} />
    </Card>
  )
}
interface BackButtonProps {
  onClick: () => void
}

const BackButton = (props: BackButtonProps) => {
  return (
    <Button
      rounded={'16px 16px 0px 0px'}
      ml={10}
      variant={'primary.outline'}
      width={'279px'}
      height="49px"
      _focus={{}}
      onClick={() => props.onClick()}
    >
      <Flex grow={1} justify="center" align={'center'}>
        <Text fontSize={'18px'} fontWeight="700">
          Back to Dividends
        </Text>
      </Flex>
    </Button>
  )
}

interface FeesViewerProps {
  title: string
}

const FeesViewer = ({ title }: FeesViewerProps) => {
  return (
    <Card
      direction={'row'}
      width="520px"
      height={'80px'}
      shadow="up"
      variant="secondary"
      filter={'auto'}
    >
      <Flex justify={'center'} align="center" flex={1}>
        <Text fontWeight={700} fontSize="24px">
          {title}
        </Text>
      </Flex>
      <Card direction={'row'} maxWidth="250px" flex={1} m={2} justify="center" gap={8}>
        <Flex direction={'column'} justify="center" align={'center'}>
          <Text fontWeight={700} fontSize={'16px'}>
            45,832.3$
          </Text>
          <Text fontWeight={700} fontSize={'12px'}>
            fees Collected
          </Text>
        </Flex>
        <Flex direction={'column'} justify="center" align={'center'}>
          <Text fontWeight={700} textColor="text.low" fontSize={'16px'}>
            +832,3$
          </Text>
          <Text textColor={'text.low'} fontWeight={700} fontSize={'12px'}>
            Last 24h
          </Text>
        </Flex>
      </Card>
    </Card>
  )
}

const TreasuryViewer = () => {
  return (
    <Card width={'320px'} height={'280px'} variant="secondary" backdropBlur={'2px'} filter={'auto'}>
      <Flex direction={'column'} width="250px" mx={'auto'} mt={6} textAlign="start">
        <Text fontWeight={500} mb={4} fontSize="24px">
          Treasury Management
        </Text>
        <Text fontWeight={700} textColor={'text.low'} fontSize="14px">
          Concave have actively manages money reserves in order to multiply them in various ways
          like stable farms, delta neutral strategies and unique automated trading software.
        </Text>
      </Flex>
      <Card width={'290px'} height="60px" justify={'center'} align="center" mx={'auto'} my={'auto'}>
        <Text textColor={'text.low'} fontSize="18px" fontWeight={'700'}>
          In Progress...
        </Text>
      </Card>
    </Card>
  )
}
