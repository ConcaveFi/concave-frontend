import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  useColorMode,
} from '@chakra-ui/react'
import { useEthers, useNotifications } from '@usedapp/core'
import React from 'react'
import { getErrorMessage } from '../../lib/utils'
import { Balance } from '../Balance'
import { ConnectWallet } from '../ConnectWallet'
import { Head, MetaProps } from './Head'

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const { error } = useEthers()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <Container maxWidth="container.xl">
          <Flex my="8" alignItems={'center'} justifyContent="space-between">
            <Heading as="h1">Concave</Heading>
            <HStack gap="1">
              <Balance />
              <ConnectWallet />
              <Button variant="outlined" onClick={toggleColorMode}>
                Toggle {colorMode}
              </Button>
            </HStack>
          </Flex>
        </Container>
      </header>
      <main>
        <Container maxWidth="container.xl">
          {error && (
            <Alert status="error" mb="8">
              <AlertIcon />
              <AlertTitle mr={2}>Error:</AlertTitle>
              <AlertDescription>{getErrorMessage(error)}</AlertDescription>
            </Alert>
          )}
          {children}
        </Container>
      </main>
    </>
  )
}
