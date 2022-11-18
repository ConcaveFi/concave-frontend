import { Flex, Image, Spinner, Text } from '@concave/ui'
import { getBondSpotPrice } from 'components/Bond/BondState'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import Router from 'next/router'
import { useQuery } from 'react-query'
import getROI from 'utils/getROI'
import { getRoiWarnColor } from 'utils/getRoiWarnColor'
import { useAccount } from 'wagmi'

const NavButton = (props: ButtonLinkProps) => {
  const active = Router.route === props.href

  return (
    <ButtonLink
      overflow="hidden"
      color="text.low"
      iconSpacing={2}
      role="group"
      w="100%"
      h="50px"
      px={4}
      bg={active && 'linear-gradient(270deg, #08448C -0.12%, #070C1E 99.82%)'}
      border={active && '1px solid rgba(81, 192, 255, 1)'}
      shadow={active ? 'Glass Inner' : 'up'}
      rounded={'20px'}
      _hover={{ textDecoration: 'underline', textColor: 'text.bright' }}
      leftIcon={
        <NotInteractableImage
          src={`/assets/sidebar${props.href}.svg`}
          _groupHover={{ filter: 'brightness(2)' }}
          _groupActive={{ filter: 'brightness(3)' }}
        />
      }
      {...props}
    >
      <Flex w="100%" textColor={active && 'text.bright'} align="center" justify="center">
        {props.children}
      </Flex>
    </ButtonLink>
  )
}

const SubnavButton = ({ children, ...props }: ButtonLinkProps) => {
  const active = Router.route === props.href

  return (
    <ButtonLink
      _hover={{ textDecoration: 'underline', textColor: 'text.bright' }}
      sx={{ maxH: 'unset', opacity: 1, p: '10px' }}
      variant="secondary"
      borderRadius="xl"
      color="text.low"
      fontSize="xs"
      shadow="none"
      _active={{}}
      _focus={{}}
      minW="100%"
      bg="none"
      m="-3px"
      px={4}
      mt="0"
      {...props}
    >
      <Flex w="100%" textColor={active && 'text.bright'} align="center" justify="center">
        {children}
      </Flex>
    </ButtonLink>
  )
}

const NotInteractableImage = ({ src, ...props }) => (
  <Image alt="" src={src} userSelect="none" draggable="false" pointerEvents="none" {...props} />
)

const BondROI = () => {
  const currentSupportedNetworkId = useCurrentSupportedNetworkId()
  const cnvPrice = useCNVPrice()
  const { isError, isFetching, isIdle, data } = useQuery(
    ['bondROI', currentSupportedNetworkId, cnvPrice.price],
    async () => {
      const cnvMarketPrice = cnvPrice?.price?.toSignificant(8)
      const bondSpotPrice = await getBondSpotPrice(currentSupportedNetworkId)
      return {
        amount: (1 - +bondSpotPrice / +cnvMarketPrice) * 100,
        formatted: getROI(cnvMarketPrice, bondSpotPrice),
      }
    },
    { enabled: cnvPrice.isSuccess && !!currentSupportedNetworkId, refetchInterval: 17000 },
  )
  const { amount, formatted } = data || {}
  return (
    <Flex justify="center" align="center" textColor="text.low" p="9px" m="-3px" mt="0">
      <Text fontSize="xs" fontWeight="bold" mr={1}>
        {`CNV-DAI `}
        <Text as={'span'} color={getRoiWarnColor(amount)} fontSize="xs" fontWeight="bold">
          {formatted}
        </Text>
        {isError ? 'error' : ''}
      </Text>
      {(isFetching || isIdle) && <Spinner size={'xs'} />}
    </Flex>
  )
}

const ButtonContainer = ({ children, ...props }) => (
  <Flex flexDir="column" shadow="Down Big" rounded="24px" p="3px" overflow="hidden" {...props}>
    {children}
  </Flex>
)

function PageNav() {
  const { address } = useAccount()

  return (
    <Flex direction="column" position="relative" gap="10px" w="100%" pl="32px">
      <NotInteractableImage
        src="/assets/sidebar/linkage.svg"
        position="absolute"
        left={0}
        top={6}
      />
      <ButtonContainer mb="11px">
        <NavButton href="/liquid-staking" border="primary">
          Stake
        </NavButton>
      </ButtonContainer>

      <ButtonContainer>
        <NavButton href="/smart-bonding">Bond</NavButton>
        <SubnavButton href="/smart-bonding">DAI/CNV</SubnavButton>
      </ButtonContainer>

      <ButtonContainer>
        <NavButton href="/marketplace">Marketplace</NavButton>
        <SubnavButton href="/liquid-stake-positions">Your staked positions</SubnavButton>
      </ButtonContainer>

      <ButtonContainer>
        <NavButton href="/gemswap">Swap</NavButton>
        <SubnavButton href="/addliquidity">Add liquidity</SubnavButton>
        <SubnavButton href="/pools">{address ? `Your pools` : `Pools`}</SubnavButton>
      </ButtonContainer>
    </Flex>
  )
}

export default PageNav
