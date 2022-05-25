import React, { useState, useEffect } from 'react'

import { Box, Flex, Text, Image, Collapse } from '@concave/ui'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { useRouter } from 'next/router'
import getROI from 'utils/getROI'
import getCNVMarketPrice from 'utils/getCNVMarketPrice'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { getBondSpotPrice, useBondState } from 'components/Bond/BondState'
import { useGet_Cnv_DataQuery } from 'graphql/generated/graphql'

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
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  // const [cnvMarketPrice, setCNVMarketPrice] = useState<number>(0)
  const [liquidStakingHover, setLiquidStakingHover] = useState(false)
  const [swapHover, setSwapStakingHover] = useState(false)
  const [intervalID, setIntervalID] = useState<any>()
  const { data: cnvData } = useGet_Cnv_DataQuery()
  const cnvMarketPrice = cnvData?.cnvData?.data?.last

  useEffect(() => {
    getBondSpotPrice(currentSupportedNetworkId, '')
      .then((bondSpotPrice) => {
        setBondSpotPrice(bondSpotPrice)
      })
      .catch((e) => console.log(e))
    // getCNVMarketPrice().then((price) => {
    //   setCNVMarketPrice(price)
    // })
  }, [currentSupportedNetworkId])

  useEffect(() => {
    const interval = setInterval(() => {
      getBondSpotPrice(currentSupportedNetworkId, '')
        .then((bondSpotPrice) => {
          setBondSpotPrice(bondSpotPrice)
        })
        .catch((e) => console.log(e))
      // getCNVMarketPrice().then((price) => {
      //   setCNVMarketPrice(price)
      // })
    }, 10000)
    if (intervalID !== interval) {
      clearTimeout(intervalID)
      setIntervalID(interval)
    }
  }, [cnvMarketPrice, currentSupportedNetworkId])

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
        alt=""
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
          CNV-DAI {getROI(cnvMarketPrice, bondSpotPrice)}
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
            <SubnavButton isActive={router.pathname === '/dashboard'} href="/dashboard" mt="1px">
              Your Positions
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
