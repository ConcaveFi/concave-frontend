import { CNV, DAI } from '@concave/core'
import { Avatar, Box, Card, Flex, Image, Text } from '@concave/ui'

type Variants = { variant: 'primary' | 'secondary' }
export const BondMarketplacePosition: React.FC<Variants> = ({ variant }) => {
  const primary = variant === 'primary'
  const address = primary ? CNV[1].address : DAI[1].address
  const name = primary ? CNV[1].name : DAI[1].name
  const symbol = primary ? CNV[1].symbol : DAI[1].symbol
  return (
    <Flex direction={'column'} textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}>
      <Card
        bg={
          variant === 'primary'
            ? 'linear-gradient(180deg, rgba(40, 219, 209, 0.1) 0%, rgba(0, 83, 78, 0) 55.79%)'
            : 'linear-gradient(180deg, rgba(117, 147, 227, 0.1) 0%, rgba(117, 147, 227, 0) 55.79%)'
        }
        width={'359px'}
        height="242px"
        shadow={'down'}
        variant="secondary"
        rounded={'50px'}
      >
        <Flex height={'100px'} justify="center" gap={4} align={'center'}>
          <Info variant={variant} title={symbol} info={name} />
          <Avatar
            src={`https://raw.githubusercontent.com/ConcaveFi/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
          />
          <Info variant={variant} title="Market price:" info="$98.23" />
        </Flex>
        <LoadBar percent={variant === 'primary' ? 23 : 82} variant={variant} />
        <Flex my={2} justify={'center'} fontWeight="bold" gap={2}>
          <Text textColor={'text.low'}>Total bonded:</Text>
          <Text>{variant === 'primary' ? '$435.23' : '$92.02'}</Text>
        </Flex>
      </Card>
      <RoiContainer />
    </Flex>
  )
}

const RoiContainer = () => (
  <Flex
    width={'359px'}
    height="100px"
    mt={'-90px'}
    zIndex={2}
    rounded={'full'}
    p={3}
    shadow="up"
    apply={'background.metal'}
  >
    <Flex rounded={'inherit'} shadow="down" width={'full'} p={1}>
      <RoiInfo withBackground title="Direct bond" info="ROI: 4.52%"></RoiInfo>
      <RoiInfo title="Bond market" info="ROI: 0.52%"></RoiInfo>
    </Flex>
  </Flex>
)

type Info = { title: string; info: string }
const Info: React.FC<Info & Variants> = ({ info, title, variant }) => (
  <Flex maxW={''} fontWeight={'bold'} direction={'column'} align="center">
    <Text textColor={'text.low'} fontSize={'14px'}>
      {title}
    </Text>
    <Text fontSize={'16px'}>{info}</Text>
  </Flex>
)

type RoiInfo = { withBackground?: boolean }
const RoiInfo: React.FC<Info & RoiInfo> = ({ info, title, withBackground }) => (
  <Flex
    rounded={'inherit'}
    justify={'center'}
    align="center"
    fontWeight={'bold'}
    flex={1}
    direction="column"
    bg={
      withBackground && 'radial-gradient(80% 232.61% at 52.27% 160%, #578CF2C4 0%, #895FFF1C 100%)'
    }
    shadow={withBackground && 'up'}
  >
    <Text fontSize={'14px'}>{title}</Text>
    <Text fontSize={'18px'}>{info}</Text>
  </Flex>
)

type LoadBard = { percent: number }
const LoadBar: React.FC<LoadBard & Variants> = ({ percent, variant }) => (
  <Flex
    width={'256px'}
    height="8px"
    rounded="full"
    mx={'auto'}
    bg={'linear-gradient(265.73deg, #3D5571 0%, #0C1F2D 100%)'}
  >
    <Box
      bg={variant === 'primary' ? '#28DBD1' : '#6C90E4'}
      rounded={'inherit'}
      width={`${percent}%`}
      height="full"
    />
  </Flex>
)
