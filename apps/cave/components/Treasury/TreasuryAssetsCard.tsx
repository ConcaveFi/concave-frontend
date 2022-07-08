import { Avatar, AvatarGroup, Card, Flex, Text } from '@concave/ui'
import { utils } from 'ethers'
import { formatEther, parseEther, parseUnits } from 'ethers/lib/utils'
import { numberMask } from 'utils/numberMask'
import { TreasuryTokenInfo } from './Hooks/useTreasuryData'

type TreasuryAssetsCardProps = {
  assets: {
    tokens: TreasuryTokenInfo[]
    convex: FarmingContainerProps
  }
}
export const TreasuryAssetsCard: React.FC<TreasuryAssetsCardProps> = ({ assets }) => {
  const { convex, tokens } = assets || {}
  return (
    <Card
      width={{ base: '340px', md: '540px', lg: '790px', xl: '900px' }}
      height="fit"
      backdropFilter={'blur(6px)'}
      pb={6}
      px="6"
    >
      <AssetsTitle />
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        py={4}
        gap={4}
        justify="space-between"
        align={'center'}
      >
        <FarmingContainer
          images={convex?.images || []}
          tokenImage={convex?.tokenImage}
          total={convex?.total}
        />
        <TokenContainer tokens={tokens?.slice(0, 4)} />
      </Flex>
      <TokenContainer direction="row" tokens={tokens?.slice(5)} />
    </Card>
  )
}

const AssetsTitle = () => (
  <Card
    variant="secondary"
    w="395px"
    h={'60px'}
    textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
    mx="auto"
    rounded={'0px 0px 16px 16px'}
  >
    <Text fontSize={'xl'} m={'auto'} fontWeight={'black'}>
      Treasury assets and activity
    </Text>
  </Card>
)

type FarmingContainerProps = {
  total: number
  tokenImage: string
  images: string[]
}
const FarmingContainer: React.FC<FarmingContainerProps> = ({ images, tokenImage, total }) => (
  <Card w={'full'} h="160px" variant="secondary">
    <Card direction={'row'} w={'full'} h="48%" justify={'center'} align="center" gap={3}>
      <Avatar src={tokenImage} size="sm" />
      <Text fontWeight={'bold'} fontSize="3xl">
        Convex
      </Text>
    </Card>
    <Text mx={'auto'} color="text.low" fontSize={'2xl'} fontWeight="bold" mt={3}>
      {total ? `$${numberMask(total)}` : 'loading...'}
    </Text>
    <AvatarGroup size={'sm'} opacity={0.4} mx="auto" mt={'-12px'} zIndex="-1">
      {images?.map((image, index) => (
        <Avatar key={index} src={image} />
      ))}
    </AvatarGroup>
  </Card>
)

type TokensContainerProps = { tokens: TreasuryTokenInfo[]; direction?: 'row' | 'column' }
const TokenContainer: React.FC<TokensContainerProps> = ({ tokens, direction }) => (
  <Flex
    w={'full'}
    gap={3}
    wrap={'wrap'}
    justify={'space-between'}
    direction={direction || 'column'}
  >
    {tokens?.map((token, index) => (
      <TokenInfo key={index} token={token} />
    ))}
  </Flex>
)

const TokenInfo: React.FC<{ token: TreasuryTokenInfo }> = ({ token }) => (
  <Card
    mx={{ base: 'auto', lg: '0' }}
    w={'full'}
    h="52px"
    variant="secondary"
    direction={'row'}
    gap={4}
  >
    <Card w={'45%'} h="full" direction={'row'} align="center">
      <AvatarGroup width={'42%'} size={'sm'} justifyContent="center">
        <Avatar src={convertGithubUrl(token?.image)} />
        {token?.isLP && <Avatar src={convertGithubUrl(token?.imageP1)} />}
      </AvatarGroup>
      <Text fontSize={'lg'} fontWeight="bold">
        {token.name}
      </Text>
    </Card>
    <Text fontSize={'xl'} my="auto" fontWeight={'bold'} color="text.low">
      {` $${numberMask(token?.total)}`}
    </Text>
  </Card>
)
const convertGithubUrl = (url: string) =>
  url.replace('github', 'raw.githubusercontent').replace('blob/', '')
