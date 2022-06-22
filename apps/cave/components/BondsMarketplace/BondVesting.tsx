import { Box, Button, Flex, FlexProps, Text } from '@chakra-ui/react'
import { CNV_ADDRESS, CurrencyAmount, Token } from '@concave/core'
import { ArrowRightIcon, ChevronRightIcon } from '@concave/icons'
import { CurrencyInputField } from 'components/CurrencyAmountField'
import { CurrencySelector } from 'components/CurrencySelector/CurrencySelector'
import { toAmount } from 'utils/toAmount'

export const BondVesting: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex
      width={'359px'}
      height="665px"
      apply="background.metal"
      shadow={'up'}
      rounded="2xl"
      p={3}
      direction="column"
      {...props}
    >
      <VestingViewer />
      <CurrencyInputField
        currencyAmountIn={toAmount(10, new Token(1, CNV_ADDRESS[1], 17))}
        onChangeAmount={() => {}}
      />
      <Flex direction={'column'} mt={6} px="6" rounded={'inherit'}>
        <Info title="Max you can buy: " info="2340 xRUNE" direction={'row'} gap={2} />
        <Info title="Redeem date: " info="23/09/2023" direction={'row'} gap={2} />
        <Info title="You bonded: " info="540 xRUNE" direction={'row'} gap={2} />
        <BondButton />
      </Flex>
    </Flex>
  )
}

const VestingViewer = () => (
  <Flex
    mt={'65px'}
    width={'full'}
    height="258px"
    rounded={'inherit'}
    shadow={'down'}
    direction="column"
    mb={14}
  >
    <Info mx={'auto'} my="8" title="Choose vesting period" info="180 days" infosize={'32px'} />
    <VestingSelectorBar />
    <Flex justify={'space-around'} align="center" flex={1} px={4}>
      <Info title="Market price" info="$0.052" />
      <ChevronRightIcon color={'low'} height={'35px'} width="35px" />
      <Info title="Bond roi" info="3.54%" />
      <ChevronRightIcon color={'low'} height={'35px'} width="35px" />
      <Info title="Bond price" info="$2.12" />
    </Flex>
  </Flex>
)

type Info = { title: string; info: string; infosize?: string | number }
const Info: React.FC<Info & FlexProps> = ({ info, title, infosize, ...props }) => (
  <Flex
    direction={'column'}
    align="center"
    textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    fontWeight="bold"
    {...props}
  >
    <Text textColor={'text.low'} fontSize={'14px'}>
      {title}
    </Text>
    <Text fontSize={infosize || '18px'}>{info}</Text>
  </Flex>
)

const VestingSelectorBar = () => (
  <Flex px={4} justify="space-between" position={'relative'} align="center">
    <Selector />
    <Selector />
    <Selector enabled />
    <Selector />
    <Flex
      zIndex={1}
      position={'absolute'}
      width={'90%'}
      bg="#4C577C"
      height={'6px'}
      rounded="full"
    ></Flex>
  </Flex>
)

type Selector = { enabled?: boolean }
const Selector = ({ enabled }: Selector) => (
  <Box
    zIndex={2}
    bg={enabled ? 'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)' : '#4C577C'}
    w={enabled ? '20px' : '16px'}
    h={enabled ? '20px' : '16px'}
    rounded={'full'}
  />
)

const BondButton = () => (
  <Button mt={3} height={'47px'} variant={'primary'} width="full" rounded={'inherit'}>
    <Text fontSize={'20px'}>Bond</Text>
  </Button>
)
