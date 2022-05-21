import { Avatar, AvatarGroup, Card, Flex, FlexProps, Image, Text } from '@concave/ui'
import { commify } from 'ethers/lib/utils'
import { Key } from 'react'

export default function TreasuryManagementCard(props: { assets: any }) {
  const { assets } = props
  const convexToken = assets?.treasury.filter((token) => token.name === 'cvxDOLA3POOL')[0]

  return (
    <Card
      direction={'column'}
      width={{ xl: '900px', lg: '800px' }}
      height={{ base: '380px', xl: '330px' }}
      bg={'#111e'}
      shadow={'0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 20px rgba(87, 124, 255, 0.3)'}
      gap={5}
      my={6}
    >
      <Flex width={'full'} justify="center">
        <TreasyAssetsTitle />
      </Flex>
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        gap={'inherit'}
        justify="center"
        align={'center'}
        height="full"
        mb={4}
      >
        <FarmingViewer convexToken={convexToken} />
        <Flex direction={{ base: 'row', xl: 'column' }} gap={4}>
          {assets.treasury
            .filter((token) => token.name !== 'cvxDOLA3POOL')
            .map(
              (i: TreasuryQueryTokenInfo, k: Key) =>
                i.total > '1' && (
                  <TokenInfo
                    key={k}
                    tokenName={i.name}
                    token={i.name}
                    value={i.total}
                    image={i.image}
                    imageP1={i.imageP1 ? i.imageP1 : ''}
                    imageP2={i.imageP2 ? i.imageP2 : ''}
                    imageP3={i.imageP3 ? i.imageP3 : ''}
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
  imageP1: string
  imageP2: string
  imageP3: string
}
export const TokenInfo = (props: TokenInfoProps) => {
  const image = props.image.replace('github', 'raw.githubusercontent').replace('blob/', '')
  const imageP1 = props.imageP1.replace('github', 'raw.githubusercontent').replace('blob/', '')

  return (
    <Card
      variant="secondary"
      shadow={'Glow Inner'}
      rounded={'2xl'}
      width={{ base: '300px', md: '180px', xl: '340px' }}
      height={{ md: '98px', xl: '52px' }}
      direction={{ md: 'column', xl: 'row' }}
      mx={{ base: 'auto', md: '' }}
    >
      <GlassPanel width={'180px'} height="52px" rounded={'2xl'}>
        <Flex width={'40%'} justify="end" mr={2} align={'center'}>
          <AvatarGroup size={'sm'}>
            <Avatar src={image} />
            {imageP1 ? <Avatar src={imageP1} zIndex={1} /> : ''}
          </AvatarGroup>
        </Flex>

        <Flex width={'60%'} justify="start" align={'center'}>
          <Text fontWeight={'700'} fontSize="18px" noOfLines={1}>
            {props.tokenName}
          </Text>
        </Flex>
      </GlassPanel>
      <Flex flex={1} justify={{ md: 'center', xl: 'start' }} align={'center'} ml={4}>
        <Text fontWeight={'700'} fontSize={{ base: '14px', md: '18px' }}>
          {'$' + commify(parseFloat(props.value).toFixed())}
        </Text>
      </Flex>
    </Card>
  )
}
const FarmingViewer = ({ convexToken, ...props }) => {
  const image = convexToken.image.replace('github', 'raw.githubusercontent').replace('blob/', '')
  const imgP1 = convexToken.imageP1.replace('github', 'raw.githubusercontent').replace('blob/', '')
  const imgP2 = convexToken.imageP2.replace('github', 'raw.githubusercontent').replace('blob/', '')
  const imgP3 = convexToken.imageP3.replace('github', 'raw.githubusercontent').replace('blob/', '')

  return (
    <GlassPanel width={'477px'} height="187px" rounded={'2xl'} justify="center" align={'center'}>
      <Flex textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}>
        <GlassPanel
          minWidth={'244px'}
          height="161px"
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
          <Flex direction={'column'}>
            <Text mt={2} mb={-2} fontWeight={700} fontSize="26px" textColor={'text.low'} zIndex={3}>
              {'$' + commify(convexToken?.total.toFixed())}
            </Text>
            <Flex justify="center" zIndex={1}>
              <AvatarGroup size={'sm'} spacing={-3} opacity="0.6">
                <Avatar src={image} />
                <Avatar src={imgP1} />
                <Avatar src={imgP2} />
                <Avatar src={imgP3} />
              </AvatarGroup>
            </Flex>
          </Flex>
        </GlassPanel>
        <Flex direction={'column'} width={'160px'} justify={'center'} align="start" ml={10}>
          <Text fontWeight={'700'} fontSize="24px">
            Rewards:
          </Text>
          <Text fontWeight={'700'} fontSize="22" textColor={'text.low'}>
            {'$' + commify(convexToken?.rewards.toFixed())}
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
      rounded="2xl"
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
        bgSize={'cover'}
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

export interface TreasuryQueryTokenInfo {
  name: string
  total: string
  chainId: string
  contract: string
  image: string
  imageP1: string
  imageP2: string
  imageP3: string
  isLP: boolean
}
