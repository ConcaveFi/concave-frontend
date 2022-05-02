import React, { useEffect, useState } from 'react'

import { Box, Flex, Text, Image } from '@concave/ui'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { getBondSpotPrice } from '../Bond/BondState'
import { useFetchApi } from 'hooks/cnvData'
import { useRouter } from 'next/router'

const NavButton = (props: ButtonLinkProps) => {
  const router = useRouter()
  return (
    <ButtonLink
      iconSpacing={2}
      px={4}
      variant="secondary"
      color="text.low"
      w="full"
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
      py={3}
      _odd={{ mt: -3 }}
      w="full"
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
  // const [bondSpotPrice, setBondSpotPrice] = useState<string>('0')
  // const [cnvMarketPrice, setCnvMarketPrice] = useState<number>(0)
  // const { data } = useFetchApi('/api/cnv')

  // if (cnvMarketPrice === 0 && !!data) {
  //   setCnvMarketPrice(data.cnv)
  // }
  // useEffect(() => {
  //   getBondSpotPrice(3, '').then((bondSpotPrice) => {
  //     setBondSpotPrice(bondSpotPrice)
  //   })
  // }, [cnvMarketPrice])
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
          Bonds
        </NavButton>
        <Text fontSize="xs" fontWeight="bold" textColor="text.low" textAlign="center" py={2}>
          Coming Soon
          {/* CNV-DAI ROI{' '}
          {`${
            cnvMarketPrice > 0 ? ((cnvMarketPrice / +bondSpotPrice - 1) * 100).toFixed(2) : '---'
          }%`} */}
        </Text>
      </Box>

      <NavButton
        leftIcon={<NotInteractableImage src="/assets/sidebar/page-lstaking.svg" />}
        href="/liquidstaking"
        variant="secondary.outline"
        mt="26px"
      >
        Liquid Staking
      </NavButton>

      <NavButton
        leftIcon={<NotInteractableImage src="/assets/sidebar/page-marketplace.svg" />}
        href="/placeholder"
        mt="60px"
      >
        Marketplace
      </NavButton>

      <Box shadow="Down Big" roundedLeft="2xl" mt="28px">
        <NavButton
          leftIcon={<NotInteractableImage src="/assets/sidebar/page-swap.svg" />}
          href="/swap"
          mb="1px"
        >
          Swap
        </NavButton>
        <SubnavButton href="/placeholder">Add liquidity</SubnavButton>
        <SubnavButton href="/placeholder">Your Pools</SubnavButton>
      </Box>
    </Flex>
  )
}

export default PageNav
