import { Box, Flex, Image, Spinner, Text } from '@concave/ui'
import { getBondSpotPrice } from 'components/Bond/BondState'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import Router from 'next/router'
import { useQuery } from 'react-query'
import getROI from 'utils/getROI'

const NavButton = (props: ButtonLinkProps) => {
  return (
    <ButtonLink
      iconSpacing={2}
      px={4}
      variant="secondary"
      color="text.low"
      w="100%"
      borderRightRadius={0}
      h="50px"
      rightIcon={<Box roundedLeft="lg" shadow="Up Big" mr={-5} w="16px" h="36px" />}
      isActive={Router.route === props.href}
      {...props}
    >
      <Flex w="100%" align="center" justify="center">
        {props.children}
      </Flex>
    </ButtonLink>
  )
}

const subNavVisibleStyles = { maxH: 'unset', opacity: 1, p: '10px' }
const SubnavButton = ({ children, ...props }: ButtonLinkProps) => {
  return (
    <ButtonLink
      px={4}
      sx={subNavVisibleStyles}
      isActive={Router.route === props.href}
      w="100%"
      color="text.low"
      variant="secondary"
      bg="none"
      shadow="none"
      borderRightRadius={0}
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
  const roi = useQuery(
    ['bondROI', currentSupportedNetworkId, cnvPrice.price],
    async () => {
      const cnvMarketPrice = cnvPrice?.price?.toSignificant(8)
      const bondSpotPrice = await getBondSpotPrice(currentSupportedNetworkId)
      return getROI(cnvMarketPrice, bondSpotPrice)
    },
    { enabled: cnvPrice.isSuccess && !!currentSupportedNetworkId, refetchInterval: 17000 },
  )

  return (
    <>
      <Text fontSize="xs" fontWeight="bold" py={2}>
        {`CNV-DAI ${roi.data || ''}`} {roi.isError ? 'error' : ''}
      </Text>
      {(roi.isFetching || roi.isIdle) && <Spinner size={'xs'} />}
    </>
  )
}

function PageNav() {
  return (
    <Flex direction="column" position="relative" mr="-2px">
      <NotInteractableImage
        src="/assets/sidebar/linkage.svg"
        position="absolute"
        left={-6}
        top={6}
      />
      <Box shadow="Down Big" roundedLeft="2xl">
        <NavButton
          leftIcon={<NotInteractableImage src="/assets/sidebar/page-bond.svg" />}
          href="/smart-bonding"
        >
          Bond
        </NavButton>
        <Flex gap={1} justify="center" align="center" textColor="text.low">
          <BondROI />
        </Flex>
      </Box>
      <Box height={'110px'}>
        <Box
          shadow="Down Big"
          roundedLeft="2xl"
          mt="24px"
          transition={'all'}
          transitionDuration="0.5s"
          role="group"
        >
          <NavButton
            leftIcon={<NotInteractableImage src="/assets/sidebar/page-lstaking.svg" />}
            href="/liquid-staking"
            variant="secondary"
            border="primary"
            mt="2px"
          >
            Stake
          </NavButton>
          <SubnavButton href="/liquid-stake-positions" mt="1px">
            Your Stake Positions
          </SubnavButton>
        </Box>
      </Box>

      <NavButton
        leftIcon={<NotInteractableImage src="/assets/sidebar/page-marketplace.svg" />}
        href=""
        mt="26px"
      >
        Marketplace <br></br>(Coming Soon)
      </NavButton>

      <Box height={'120px'}>
        <Box shadow="Down Big" roundedLeft="2xl" mt="28px" role="group">
          <NavButton
            leftIcon={<NotInteractableImage src="/assets/sidebar/page-swap.svg" />}
            href="/gemswap"
            mb="1px"
          >
            Swap
          </NavButton>
          <SubnavButton href="/addliquidity">Add liquidity</SubnavButton>
          <SubnavButton href="/pools">Your Pools</SubnavButton>
        </Box>
      </Box>
    </Flex>
  )
}

export default PageNav
