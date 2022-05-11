import { Flex, Container } from '@concave/ui'
import dynamic from 'next/dynamic'
import React from 'react'
import { SideBar } from './SideBar/SideBar'

const TestnetIndicator = dynamic(() => import('./Faucet').then((module) => module.TestnetIndicator))

export const DefaultLayout = ({ children }) => {
  return (
    <Flex as="main" direction={{ base: 'column', md: 'row' }}>
      <SideBar />
      <Container display="flex" maxWidth="container.xl">
        <TestnetIndicator />
        {children}
      </Container>
    </Flex>
  )
}
