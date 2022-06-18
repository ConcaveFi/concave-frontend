import { Box, Button, Flex, FlexboxProps, FlexProps, Text } from '@chakra-ui/react'

type Variants = { variant: 'listed' | 'pending' }
export const BondDataCard: React.FC<FlexProps & Variants> = ({ variant, ...props }) => (
  <Flex
    width={'708px'}
    height="245px"
    shadow={'up'}
    rounded="50px"
    apply={'background.metal'}
    px={6}
    pt={6}
    direction="column"
    {...props}
  >
    <DataViewer />
    <Flex mt={6} gap={6} px={4}>
      <ListForSale variant={variant} />
      <ViewData variant={variant} />
      <Info title="Your Offer Roi:" info="8.3%" flexDirection={'column'} gap={0} />
      <Info title="Current Floor Roi:" info="7.4%" flexDirection={'column'} gap={0} />
    </Flex>
  </Flex>
)

const DataViewer = () => (
  <Flex
    direction={'column'}
    width={'full'}
    rounded="inherit"
    shadow={'Down Medium'}
    h="128px"
    justify="center"
    px={'10'}
    gap={'6px'}
  >
    <Flex gap={'80px'}>
      <Info title="Your Supply" info="1935.13 xRUNE" />
      <Info title="Bonded Out" info="935.13 xRUNE" />
    </Flex>
    <LoadBar percent={50} />
    <Info title="Total Revenue" info="2535.25 DAI" />
  </Flex>
)

type Info = { title: string; info: string }
const Info: React.FC<Info & FlexboxProps> = ({ title, info, ...props }) => (
  <Flex
    fontSize={'16px'}
    fontWeight="bold"
    textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    gap={1}
    {...props}
  >
    <Text textColor={'text.low'}>{title}</Text>
    <Text>{info}</Text>
  </Flex>
)

type LoadBar = { percent: number }
const LoadBar: React.FC<LoadBar> = ({ percent }) => (
  <Flex width={'full'} height="25px" rounded={'full'} shadow="down">
    <Box height={'full'} bg="#2F4A6B" width={`${percent}%`} rounded="inherit" shadow={'up'}></Box>
  </Flex>
)

const ListForSale: React.FC<Variants> = ({ variant }) => {
  const listed = variant === 'listed'
  return (
    <Button
      variant={listed ? 'secondary' : 'primary.outline'}
      cursor={listed && 'default'}
      _active={!listed && { transform: 'scale(0.9)' }}
      width={'145px'}
      height="51px"
      shadow={listed ? 'down' : 'up'}
    >
      <Text textColor={listed && 'text.low'} fontSize={'17px'}>
        {listed ? 'Listed' : 'List For Sale'}
      </Text>
    </Button>
  )
}

const ViewData: React.FC<Variants> = ({ variant }) => (
  <Button
    variant={variant === 'listed' ? 'primary.outline' : 'primary'}
    width={'145px'}
    height="51px"
    shadow={'up'}
  >
    <Text textColor={variant === 'listed' && 'text.low'} fontSize={'17px'}>
      {variant === 'listed' ? 'View Data' : 'Redeem'}
    </Text>
  </Button>
)
