import { Flex, Container, useMediaQuery } from '@concave/ui'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { SideBar, SIDE_BAR_WIDTH } from './SideBar/SideBar'
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
  useMediaQuery('minimum-width(768px')

  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <SideBar />
      <Container
        display="flex"
        maxWidth="container.xl"
        p={'0px'}
        ml={{ md: SIDE_BAR_WIDTH, sm: 'auto' }}
      >
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
