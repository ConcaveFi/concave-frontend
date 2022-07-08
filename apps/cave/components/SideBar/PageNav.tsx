import { Box, Collapse, Flex, Image, Spinner, Text } from '@concave/ui'
import { getBondSpotPrice } from 'components/Bond/BondState'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useDevice } from 'hooks/useDevice'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import getROI from 'utils/getROI'

const NavButton = (props: ButtonLinkProps) => {
  const router = useRouter()
  return (
    <ButtonLink
      iconSpacing={2}
      px={4}
      variant="secondary"
      color="text.low"
      w="175px"
      borderRightRadius={0}
      h="50px"
      rightIcon={<Box roundedLeft="lg" shadow="Up Big" mr={-5} w="16px" h="36px" />}
      isActive={router.route === props.href}
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
      py={'10px'}
      w="175px"
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

function PageNav() {
  const router = useRouter()
  const currentSupportedNetworkId = useCurrentSupportedNetworkId()
  const [liquidStakingHover, setLiquidStakingHover] = useState(false)
  const [swapHover, setSwapStakingHover] = useState(false)
  const device = useDevice()
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

  const liquidStakingPage =
    router.pathname === '/liquid-staking' || router.pathname === '/liquid-stake-positions'
  const swapPage =
    router.pathname === '/gemswap' ||
    router.pathname === '/pools' ||
    router.pathname === '/addliquidity'

  const isMobile = {
    tablet: true,
    mobile: true,
    desktop: false,
  }[device]

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
          <Text fontSize="xs" fontWeight="bold" py={2}>
            {`CNV-DAI ${roi.data || ''}`} {roi.isError ? 'error' : ''}
          </Text>
          {(roi.isFetching || roi.isIdle) && <Spinner size={'xs'} />}
        </Flex>
      </Box>
      <Box height={'110px'}>
        <Box
          shadow="Down Big"
          roundedLeft="2xl"
          mt="24px"
          transition={'all'}
          transitionDuration="0.5s"
          onMouseEnter={() => setLiquidStakingHover(true)}
          onMouseLeave={() => setLiquidStakingHover(false)}
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
          <Collapse in={liquidStakingHover || liquidStakingPage || isMobile}>
            <SubnavButton
              isActive={router.pathname === '/liquid-stake-positions'}
              href="/liquid-stake-positions"
              mt="1px"
            >
              Your Stake Positions
            </SubnavButton>
          </Collapse>
        </Box>
      </Box>

      <NavButton
        leftIcon={<NotInteractableImage src="/assets/sidebar/page-marketplace.svg" />}
        href="/marketplace"
        mt="26px"
      >
        Marketplace <br></br>
      </NavButton>

      <Box height={'120px'}>
        <Box
          shadow="Down Big"
          roundedLeft="2xl"
          mt="28px"
          onMouseEnter={() => setSwapStakingHover(true)}
          onMouseLeave={() => setSwapStakingHover(false)}
        >
          <NavButton
            leftIcon={<NotInteractableImage src="/assets/sidebar/page-swap.svg" />}
            href="/gemswap"
            mb="1px"
          >
            Swap
          </NavButton>

          <Collapse in={swapHover || swapPage || isMobile}>
            <SubnavButton href="/addliquidity">Add liquidity</SubnavButton>
            <SubnavButton href="/pools">Your Pools</SubnavButton>
          </Collapse>
        </Box>
      </Box>
    </Flex>
  )
}

export default PageNav
