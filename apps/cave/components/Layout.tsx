import { Flex, Container } from '@concave/ui'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { SideBar } from './SideBar/SideBar'
import { AnimatePresence } from 'framer-motion'
import { useIsomorphicLayoutEffect } from 'react-use'

const TestnetIndicator = dynamic(() => import('./Faucet').then((module) => module.TestnetIndicator))

export const DefaultLayout = ({ children }) => {
  const [shouldRender, setShouldRender] = useState(false)
  useIsomorphicLayoutEffect(() => {
    setShouldRender(true)
  })

  if (shouldRender) {
    return <Layout>{children}</Layout>
  } else {
    return <></>
  }
}

export const Layout = ({ children }) => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <SideBar />
      <Container display="flex" maxWidth="container.xl" p={'0px'}>
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
