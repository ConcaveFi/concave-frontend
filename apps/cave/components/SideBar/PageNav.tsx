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
  return (
    <ButtonLink
      iconSpacing={2}
      px={4}
      variant="secondary"
      color="text.low"
      w="100%"
      h="50px"
      isActive={Router.route === props.href}
      overflow="hidden"
      role="group"
      leftIcon={
        <NotInteractableImage
          src={`/assets/sidebar${props.href}.svg`}
          _groupHover={{ filter: 'brightness(3)' }}
          _groupActive={{ filter: 'brightness(3)' }}
        />
      }
      {...props}
    >
      <Flex w="100%" align="center" justify="center">
        {props.children}
      </Flex>
    </ButtonLink>
  )
}

const SubnavButton = ({ children, ...props }: ButtonLinkProps) => {
  return (
    <ButtonLink
      px={4}
      m="-3px"
      mt="0"
      sx={{ maxH: 'unset', opacity: 1, p: '10px' }}
      isActive={Router.route === props.href}
      minW="100%"
      color="text.low"
      variant="secondary"
      bg="none"
      shadow="none"
      borderRadius="xl"
      fontSize="xs"
      {...props}
    >
      <Flex w="100%" align="center" justify="center">
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
  <Flex flexDir="column" shadow="Down Big" rounded="2xl" p="3px" overflow="hidden" {...props}>
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

      <ButtonContainer>
        <NavButton href="/delta-neutral">Delta neutral</NavButton>
      </ButtonContainer>
    </Flex>
  )
}

export default PageNav
