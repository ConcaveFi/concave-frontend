import { HStack, Flex, Heading, Image, Center } from '@chakra-ui/react'
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
    <Heading fontSize="24px" mt="-2px">
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

export const TopBar = () => {
  const route = 'swap' as any
  return (
    <Center p={2}>
      <Card
        as="header"
        bgGradient="linear(to-t, secondary.150 35%, secondary.100 111%)"
        w="100%"
        p={3}
        maxW="container.xl"
      >
        <Flex justifyContent="space-between" maxHeight="72px">
          <HStack spacing="0" my={-3} overflow="hidden" pr={1}>
            {/* overflow hidden stop the navigation btns shadow blur from scaping top/bottom, 
              pr={1} makes last elem shadow visible (because of overflow hidden) */}
            <Logo />
            <TopBarNavItem href="/swap" isActive={route === 'swap'}>
              Get CNV
            </TopBarNavItem>
            <TopBarNavItem href="/swap" isActive={route === 'aaa'}>
              Dynamic Bond Market
            </TopBarNavItem>
            <TopBarNavItem href="/swap" isActive={route === 'adsa'}>
              Lending and Borrowing
            </TopBarNavItem>
          </HStack>

          <HStack gap="1">
            <ButtonLink
              href="/placeholder_dashboard"
              variant="primary.outline"
              bgGradient="linear(to-tr, secondary.150, secondary.100)"
              w="200px"
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
