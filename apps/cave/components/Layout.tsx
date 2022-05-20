import { Flex, Container } from '@concave/ui'
import dynamic from 'next/dynamic'
import React from 'react'
import { SideBar } from './SideBar/SideBar'
import { AnimatePresence } from 'framer-motion'

const TestnetIndicator = dynamic(() => import('./Faucet').then((module) => module.TestnetIndicator))

export const DefaultLayout = ({ children }) => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <SideBar />
      <Container display="flex" maxWidth="container.xl">
        <TestnetIndicator />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          {children}
        </AnimatePresence>
      </Container>
    </Flex>
  )
}
