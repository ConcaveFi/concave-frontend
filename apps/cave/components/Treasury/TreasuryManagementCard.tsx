import { Card, Flex, FlexProps, Image, Text } from '@concave/ui'
import { commify } from 'ethers/lib/utils'
import { Key } from 'react'

export default function TreasuryManagementCard(props: { assets: any }) {
  const { assets } = props
  const convexToken = assets.treasury.filter((token) => token.name === 'cvxDOLA3POOL')[0]

  console.log(convexToken)

  return (
    <Card
      direction={'column'}
      width={'900px'}
      height="330px"
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      gap={5}
      my={6}
    >
      <Flex width={'full'} justify="center">
        <TreasyAssetsTitle />
      </Flex>
      <Flex gap={'inherit'} justify="center" align={'center'} height="full" mb={4}>
        <FarmingViewer
          rewards={commify(convexToken?.rewards.toFixed())}
          value={commify(convexToken?.total.toFixed())}
        />
        <Flex direction={'column'} gap={4}>
          {assets.treasury
            .filter((token) => token.name !== 'cvxDOLA3POOL')
            .map(
              (
                i: {
                  name: string
                  total: string
                  chainId: string
                  contract: string
                  image: string
                },
                k: Key,
              ) =>
                i.total > '1' && (
                  <TokenInfo
                    key={k}
                    tokenName={i.name}
                    token={i.name}
                    value={i.total}
                    image={i.image}
                  />
                ),
            )}
        </Flex>
      </Flex>
    </Card>
  )
}

interface TokenInfoProps {
  token: string
  tokenName: string
  value: string
  image: string
}
const TokenInfo = (props: TokenInfoProps) => {
  const image = props.image.replace('github', 'raw.githubusercontent').replace('blob/', '')

  return (
    <Card rounded={'2xl'} width={'340px'} height="52px" direction={'row'}>
      <GlassPanel width={'180px'} height="52px" rounded={'2xl'}>
        <Flex width={'40%'} justify="center" align={'center'}>
          <Image width={'40px'} height="40px" src={image}></Image>
        </Flex>
        <Flex width={'60%'} justify="start" align={'center'}>
          <Text fontWeight={'700'} fontSize="18px" noOfLines={1}>
            {props.tokenName}
          </Text>
        </Flex>
      </GlassPanel>
      <Flex flex={1} justify="start" align={'center'} ml={4}>
        <Text fontWeight={'700'} fontSize="18px">
          {'$' + commify(parseFloat(props.value).toFixed())}
        </Text>
      </Flex>
    </Card>
  )
}
const FarmingViewer = ({ value, rewards }) => {
  return (
    <GlassPanel width={'477px'} height="157px" rounded={'2xl'} justify="center" align={'center'}>
      <Flex>
        <GlassPanel
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
            rounded={'14px'}
            boxShadow="Up Big"
            justify={'center'}
            align="center"
            gap={4}
          >
            <Flex height={'30px'} width="30px">
              <Image
                alt="logo"
                src="https://static.debank.com/image/eth_token/logo_url/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b/be2a9b05a223d6dfca3dc88b1838fcd4.png"
              />
            </Flex>
            <Flex>
              <Text fontWeight={700} fontSize="24px">
                Convex
              </Text>
            </Flex>
          </GlassPanel>
          <Flex flex={1} align="center">
            <Text fontWeight={700} fontSize="26px" textColor={'text.low'}>
              {'$' + value}
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
            Rewards:
          </Text>
          <Text fontWeight={'700'} fontSize="20" textColor={'text.low'}>
            {'$' + rewards}
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
      textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    >
      <Text fontSize={'20px'} fontWeight="700">
        Treasury Assets and Activity
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
        bgSize={'100%'}
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
