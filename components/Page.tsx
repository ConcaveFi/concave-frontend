import { Alert, AlertDescription, AlertIcon, AlertTitle, Container } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React from 'react'
import { getErrorMessage } from '../lib/utils'
import { Head, MetaProps } from './MetaHead'
import { TopBar } from './TopBar'

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
      <TopBar />
      <main>
        <Container maxWidth="container.xl">
          {/* {error && ( */}
          <Alert status="error" mb="8">
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>
          {/* )} */}
          {children}
        </Container>
      </main>
    </>
  )
}
