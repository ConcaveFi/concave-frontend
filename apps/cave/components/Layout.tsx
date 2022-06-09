import { Flex, Container } from '@concave/ui'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { SideBar } from './SideBar/SideBar'
import { AnimatePresence } from 'framer-motion'
import { useIsomorphicLayoutEffect } from 'react-use'
import { useIsMounted } from 'hooks/useIsMounted'
import SecurityBanner from './SecurityBanner'

const TestnetIndicator = dynamic(() => import('./Faucet').then((module) => module.TestnetIndicator))

export const DefaultLayout = ({ children }) => {
  const isMounted = useIsMounted()
  if (isMounted) return <Layout>{children}</Layout>
  return <></>
}

export const Layout = ({ children }) => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <SideBar />
      <Container
        display="flex"
        maxWidth="container.xl"
        p={'0px'}
        pb={{ base: '300px', md: '0' }} // add a lil padding to the bottom on small screens (mobile)
      >
        <TestnetIndicator />
        <SecurityBanner />
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
