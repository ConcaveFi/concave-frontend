import { Currency, Token } from '@concave/gemswap-sdk'
import { Box, Button, Card, Flex, FlexProps, Image, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { CNV, DAI } from 'constants/tokens'

export default function TreasuryManagementCard() {
  return (
    <Card
      direction={'column'}
      width={'900px'}
      height="330px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      gap={5}
    >
      <Flex width={'full'} justify="center">
        <TreasyAssetsTitle />
      </Flex>
      <Flex gap={'inherit'} justify="center" align={'center'} my="20px">
        <FarmingViewer />
        <Flex direction={'column'} gap={3}>
          <TokenInfo tokenName="DAI" token={DAI} value="$67,325" />
          <TokenInfo tokenName="CNV" token={CNV} value="$67,325" />
          <TokenInfo tokenName="DAI" token={DAI} value="$67,325" />
        </Flex>
      </Flex>
    </Card>
  )
}

interface TokenInfoProps {
  token: Currency
  tokenName: string
  value: string
}
const TokenInfo = (props: TokenInfoProps) => {
  return (
    <Card rounded={'2xl'} width={'271px'} height="52px" direction={'row'}>
      <GlassPanel width={'131px'} height="52px" rounded={'2xl'}>
        <Flex width={'50%'} justify="center" align={'center'}>
          <CurrencyIcon currency={props.token} />
        </Flex>
        <Flex width={'50%'} justify="start" align={'center'}>
          <Text fontWeight={'700'} fontSize="21px">
            {props.tokenName}
          </Text>
        </Flex>
      </GlassPanel>
      <Flex flex={1} justify="center" align={'center'}>
        <Text fontWeight={'700'} fontSize="18px">
          {props.value}
        </Text>
      </Flex>
    </Card>
  )
}

const FarmingViewer = () => {
  return (
    <GlassPanel width={'477px'} height="157px" rounded={'2xl'} justify="center" align={'center'}>
      <Flex>
        <GlassPanel
          my="auto"
          minWidth={'244px'}
          height="131px"
          rounded={'2xl'}
          align={'center'}
          bg={'#3333'}
          direction="column"
        >
          <GlassPanel
            height={'48%'}
            width="full"
            rounded={'2xl'}
            boxShadow="Up Big"
            justify={'center'}
            align="center"
            gap={4}
          >
            <Flex height={'30px'} width="30px">
              <Image src="https://static.debank.com/image/eth_token/logo_url/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b/be2a9b05a223d6dfca3dc88b1838fcd4.png" />
            </Flex>
            <Flex>
              <Text fontWeight={700} fontSize="24px">
                Convex
              </Text>
            </Flex>
          </GlassPanel>
          <Flex flex={1} align="center">
            <Text fontWeight={700} fontSize="26px">
              $12,234,512
            </Text>
          </Flex>
        </GlassPanel>
        <Flex
          direction={'column'}
          width={'160px'}
          height="131px"
          justify={'center'}
          align="start"
          ml={10}
        >
          <Text fontWeight={'700'} fontSize="18px">
            Farming:
          </Text>
          <Text fontWeight={'700'} fontSize="16px">
            UST: $6,527,873
          </Text>
          <Text fontWeight={'700'} fontSize="16px">
            3Crv: $5,237,468
          </Text>
        </Flex>
      </Flex>
    </GlassPanel>
  )
}

const TreasyAssetsTitle = () => {
  return (
    <GlassPanel
      width={'397px'}
      minH="62px"
      rounded={'0px 0px 16px 16px'}
      justify="center"
      align="center"
    >
      <Text fontSize={'20px'} fontWeight="700">
        Treasury Asstets and Activity
      </Text>
    </GlassPanel>
  )
}

export const GlassPanel: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex
      boxShadow={'up'}
      {...props}
      bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'}
      justify="center"
      align={''}
      direction="row"
    >
      <Flex
        width={'full'}
        boxShadow={'down'}
        m={'1px'}
        bg="url(assets/textures/glass.jpg)"
        bgSize={'130%'}
        bgPos="center"
        rounded="inherit"
      >
        <Flex
          rounded="inherit"
          bg={props.bg ? props.bg : '#21293055'}
          width="full"
          height={'full'}
          direction={props.direction}
          justify={props.justify}
          align={props.align}
          gap={props.gap}
        >
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  )
}
