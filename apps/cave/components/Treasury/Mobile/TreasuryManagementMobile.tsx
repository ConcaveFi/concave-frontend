import { SpinIcon } from '@concave/icons'
import { Avatar, AvatarGroup, Card, Flex, Image, keyframes, Text } from '@concave/ui'
import { commify } from 'ethers/lib/utils'
import { Get_TreasuryQuery } from 'graphql/generated/graphql'
import { GlassPanel, TokenInfo, TreasuryQueryTokenInfo } from '../TreasuryManagementCard'

interface TreasuryManagementMobileProps {
  treaData: any
  loading: boolean
}

export default function TreasuryManagementMobile(props: TreasuryManagementMobileProps) {
  const { treaData } = props
  const convexToken = treaData?.treasury.filter((token) => token.name === 'cvxDOLA3POOL')[0]

  return (
    <Card
      width={'340px'}
      height="540px"
      bg={'#111c'}
      textShadow="0px 0px 27px rgba(129, 179, 255, 0.31)"
      shadow={'up'}
      gap={3}
    >
      <GlassPanel width={'300px'} height="84px" rounded={'0px 0px 16px 16px'} mx="auto">
        <Text fontSize={'xl'} textAlign="center" mx={'auto'} fontWeight="bold" my={'auto'}>
          Treasury Assets <br /> and Activity
        </Text>
      </GlassPanel>
      {!props.loading ? (
        <>
          <FarmingViewer convexToken={convexToken} />
          {renderTokenInfos(treaData)}
        </>
      ) : (
        <LoadingState />
      )}
    </Card>
  )
}

const LoadingState = () => {
  return (
    <GlassPanel
      width={'310px'}
      height="430px"
      mx={'auto'}
      direction="column"
      justify={'center'}
      align="center"
      gap={4}
    >
      <Text fontSize={'3xl'}>Loading assets</Text>
      <SpinIcon animation={spinAnimation(3)} />
    </GlassPanel>
  )
}

const FarmingViewer = ({ convexToken }) => {
  const image = convexToken.image.replace('github', 'raw.githubusercontent').replace('blob/', '')
  const imgP1 = convexToken.imageP1.replace('github', 'raw.githubusercontent').replace('blob/', '')
  const imgP2 = convexToken.imageP2.replace('github', 'raw.githubusercontent').replace('blob/', '')
  const imgP3 = convexToken.imageP3.replace('github', 'raw.githubusercontent').replace('blob/', '')
  return (
    <GlassPanel width={'310px'} height="240px" mx={'auto'} direction="column">
      <GlassPanel width={'280px'} mx="auto" mt={4} direction="column" height={'140px'}>
        <GlassPanel width={'full'} height="65px" justify={'center'} align="center" gap={3}>
          <Flex height={'30px'} width="30px">
            <Image
              alt="logo"
              src="https://static.debank.com/image/eth_token/logo_url/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b/be2a9b05a223d6dfca3dc88b1838fcd4.png"
            />
          </Flex>
          <Text fontWeight={'bold'} fontSize="2xl">
            Convex
          </Text>
        </GlassPanel>
        <Flex direction={'column'} align="center" justify={'center'}>
          <Text fontWeight={'bold'} fontSize="xl" mt={'5px'} mb={-2} zIndex="10">
            {'$' + commify(convexToken?.total.toFixed())}
          </Text>
          <AvatarGroup size={'sm'} spacing={-3} opacity="0.4">
            <Avatar src={image} />
            <Avatar src={imgP1} />
            <Avatar src={imgP2} />
            <Avatar src={imgP3} />
          </AvatarGroup>
        </Flex>
      </GlassPanel>
      <Flex direction={'column'} align={'center'} justify="center" flex={1} mx={6}>
        <Text fontSize={'xl'} fontWeight="bold">
          Rewards:
        </Text>
        <Text fontSize={'xl'} textColor="text.low">
          {'$' + commify(convexToken?.rewards.toFixed(2))}
        </Text>
      </Flex>
    </GlassPanel>
  )
}

const renderTokenInfos = (treaData) => {
  return (
    <Flex direction={'column'} gap={2}>
      {treaData.treasury
        .filter((token) => token.name !== 'cvxDOLA3POOL')
        .map(
          (i: TreasuryQueryTokenInfo, k: any) =>
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
  )
}

export const spinAnimation = (time = 3) =>
  ` ${keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  })} ${time}s linear infinite`
