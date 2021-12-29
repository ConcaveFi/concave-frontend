import { HStack, Container, Flex, Heading } from '@chakra-ui/react'
import { Balance } from './Balance'
import { ConnectWallet } from './ConnectWallet'
import { ToggleTheme } from './ToggleTheme'

export const TopBar = () => {
  return (
    <header>
      <Container maxWidth="container.xl">
        <Flex my="8" alignItems={'center'} justifyContent="space-between">
          <Heading as="h1">Concave</Heading>
          <HStack gap="1">
            <Balance />
            <ConnectWallet />
            <ToggleTheme />
          </HStack>
        </Flex>
      </Container>
    </header>
  )
}
