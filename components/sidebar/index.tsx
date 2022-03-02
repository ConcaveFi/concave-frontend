import React, { useState } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Image,
  HStack,
  VStack,
  Box,
} from '@chakra-ui/react'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { ConnectWallet } from './ConnectWallet'
import { Card } from 'components/Card'

import { IoPawOutline } from 'react-icons/io5'

const Logo = () => (
  <HStack pr={9} pl={6} pt={5}>
    <Image
      src={'/assets/concave-logo.png'}
      alt="concave logo"
      maxWidth="52px"
      position="relative"
    />
    <Heading fontSize="24px" mt="100px">
      {/* margin top -2px correcting font not in the middle of line (thats a font prop) */}
      Concave
    </Heading>
  </HStack>
)

const TopBarNavItem = (props: ButtonLinkProps) => {
  return (
    <ButtonLink
      variant="navigation"
      w="100%"
      maxW={48}
      whiteSpace="break-spaces"
      fontSize="sm"
      {...props}
    />
  )
}

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('large')
  const route = 'swap' as any
  return (
    <Flex
      pos="sticky"
      left="0"
      minH="120vh"
      maxW="300px"
      px={2}
      bgGradient="linear(to-tr, secondary.150, secondary.100)"
      borderRadius="large"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex p="5%" flexDir="column" w="100%" alignItems="center" as="nav">
        <VStack
          gap="15"
          shadow="down"
          maxw="92%"
          height="200px"
          borderRadius="2xl"
          justify="space-between"
          pb={2}
        >
          <Logo />

          <ButtonLink
            href="/placeholder_dashboard"
            variant="primary.outline"
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
            w="200px"
            size="large"
            borderRadius="2xl"
            maxH="40px"
          >
            Your Dashboard
          </ButtonLink>
        </VStack>

        <Box height="100px"></Box>
        <VStack spacing="15">
          {/* overflow hidden stop the navigation btns shadow blur from scaping top/bottom, 
              pr={1} makes last elem shadow visible (because of overflow hidden) */}

          <TopBarNavItem href="/swap" isActive={route === 'amm'}>
            wip
          </TopBarNavItem>
          <TopBarNavItem href="/bond" isActive={route === 'bond'}>
            wip
          </TopBarNavItem>
          <TopBarNavItem href="/lending" isActive={route === 'lending'}>
            wip
          </TopBarNavItem>
        </VStack>
        <Card shadow="down" borderRadius="2x2" h="50px" align="center" justify="center">
          <TopBarNavItem href="/lending" isActive={route === 'lending'}>
            wip
          </TopBarNavItem>
        </Card>
      </Flex>
    </Flex>
  )
}
