import React, { useState, useEffect } from 'react'

import { Box, Flex, Text, Image, Collapse } from '@concave/ui'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { useRouter } from 'next/router'
import { getBondSpotPrice } from 'components/Bond/BondState'

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
  const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  const [cnvMarketPrice, setCnvMarketPrice] = useState<number>(0)
  useEffect(() => {
    getBondSpotPrice(3, '').then((bondSpotPrice) => {
      setBondSpotPrice(bondSpotPrice)
    })
    fetch('/api/cnv')
      .then((j) => j.json())
      .then((data) => JSON.parse(data))
      .then((data) => {
        if (data?.data) {
          setCnvMarketPrice(data.data.last)
        }
      })
      .catch((e) => {
        throw e
      })
  }, [cnvMarketPrice])
  const router = useRouter()

  const [liquidStakingHover, setLiquidStakingHover] = useState(false)
  const [swapHover, setSwapStakingHover] = useState(false)

  const liquidStakingPage = router.pathname === '/liquidstaking' || router.pathname === '/dashboard'
  const swapPage =
    router.pathname === '/swap' ||
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
          href="/bond"
        >
          Bond
        </NavButton>
        <Text fontSize="xs" fontWeight="bold" textColor="text.low" textAlign="center" py={2}>
          CNV-DAI{' '}
          {`${
            cnvMarketPrice > 0 ? (1 - (+cnvMarketPrice / +bondSpotPrice) * 100).toFixed(2) : '-'
          }%`}
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
            href="/liquidstaking"
            variant="secondary"
            border="primary"
            mt="2px"
          >
            Stake
          </NavButton>
          <Collapse in={liquidStakingHover || liquidStakingPage}>
            <SubnavButton href="/dashboard" mt="1px">
              Your Positions
            </SubnavButton>
          </Collapse>
        </Box>
      </Box>

      <NavButton
        leftIcon={<NotInteractableImage src="/assets/sidebar/page-marketplace.svg" />}
        href="/marketplace"
        mt="26px"
      >
        Marketplace
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
            href="/swap"
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
