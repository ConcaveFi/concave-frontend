import { Box, Collapse, Flex, Image, Spinner, Text } from '@concave/ui'
import { getBondSpotPrice } from 'components/Bond/BondState'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { useGet_Cnv_DataQuery } from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import getCNVMarketPrice from 'utils/getCNVMarketPrice'
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
      _focus={{}}
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
  const { data: cnvData } = useGet_Cnv_DataQuery()

  const roi = useQuery(
    ['getCNVMarketPrice', currentSupportedNetworkId, cnvData],
    async () => {
      const cnvMarketPrice = cnvData?.cnvData?.data?.last ?? (await getCNVMarketPrice())
      const bondSpotPrice = await getBondSpotPrice(currentSupportedNetworkId)
      return getROI(cnvMarketPrice, bondSpotPrice)
    },
    { enabled: !!currentSupportedNetworkId, refetchInterval: 17000 },
  )

  const liquidStakingPage =
    router.pathname === '/liquid-staking' || router.pathname === '/dashboard'
  const swapPage =
    router.pathname === '/gemswap' ||
    router.pathname === '/pools' ||
    router.pathname === '/addliquidity'

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
        <Text fontSize="xs" fontWeight="bold" textColor="text.low" textAlign="center" py={2}>
          {`CNV-DAI ${roi.data || ''}`} {roi.isError ? 'error' : ''}{' '}
          {roi.isFetching ? <Spinner size={'xs'} /> : ''}
        </Text>
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
          <Collapse in={liquidStakingHover || liquidStakingPage}>
            <SubnavButton href="" mt="1px">
              Your Positions <br></br> (Coming Soon)
            </SubnavButton>
          </Collapse>
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

          <Collapse in={swapHover || swapPage}>
            <SubnavButton href="/addliquidity">Add liquidity</SubnavButton>
            <SubnavButton href="/pools">Your Pools</SubnavButton>
          </Collapse>
        </Box>
      </Box>
    </Flex>
  )
}

export default PageNav
