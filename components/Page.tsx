import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Flex,
  Heading,
  HStack,
} from '@chakra-ui/react'
import { useEthers, useNotifications } from '@usedapp/core'
import { ToggleTheme } from 'components/ToggleTheme'
import React from 'react'
import { getErrorMessage } from '../lib/utils'
import { Balance } from './Balance'
import { ConnectWallet } from './ConnectWallet'
import { Head, MetaProps } from './MetaHead'

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

interface PageProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Page = ({ children, customMeta }: PageProps): JSX.Element => {
  const { error } = useEthers()

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
              <ToggleTheme />
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
