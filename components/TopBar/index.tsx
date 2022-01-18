import {
  HStack,
  Container,
  Flex,
  Heading,
  Button,
  Box,
  Image,
  Text,
  Center,
} from '@chakra-ui/react'
import colors from 'theme/colors'
import { ButtonLink, ButtonLinkProps } from 'components/ButtonLink'
import { ConnectWallet } from './ConnectWallet'
import { Card } from 'components/Card'

const Logo = () => (
  <HStack pr={9} pl={6}>
    <Image
      src={'/assets/concave-logo.png'}
      alt="concave logo"
      maxWidth="52px"
      position="relative"
    />
    <Heading fontSize="24px">Concave</Heading>
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

export const TopBar = () => {
  return (
    <Center p={2}>
      <Card as="header" bgGradient={colors.gradients.green} w="100%" p={3} maxW="container.xl">
        <Flex justifyContent="space-between" maxHeight="72px">
          <HStack spacing="0" my={-3}>
            <Logo />
            <TopBarNavItem href="/swap">Get CNV</TopBarNavItem>
            <TopBarNavItem href="/swap">Dynamic Bond Market</TopBarNavItem>
            <TopBarNavItem href="/swap">Lending and Borrowing</TopBarNavItem>
          </HStack>

          <HStack gap="1">
            <ButtonLink
              href="/placeholder_dashboard"
              variant="secondary"
              bgGradient={colors.gradients.green}
              size="large"
              borderRadius="2xl"
            >
              Dashboard
            </ButtonLink>
            <ConnectWallet />
          </HStack>
        </Flex>
      </Card>
    </Center>
  )
}
