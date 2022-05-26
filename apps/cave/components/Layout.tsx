import { Flex, Container, useMediaQuery, Box } from '@concave/ui'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { SideBar } from './SideBar/SideBar'
import { AnimatePresence } from 'framer-motion'
import { useIsomorphicLayoutEffect, useMeasure, useWindowSize } from 'react-use'

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
  const [ref, containerSize] = useMeasure()
  const windowSize = useWindowSize()
  const getSideBarHeight = () =>
    containerSize.height > windowSize.height ? `${containerSize.height}px` : '100vh'
  const [sideBarHeight, setSideBarHeight] = useState('100vh')
  let updateBarHeight = false
  useEffect(() => {
    console.log('useMeasure', 'containerSize.height', containerSize.height)
    setSideBarHeight(getSideBarHeight)
  }, [updateBarHeight, containerSize.height, windowSize.height])

  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <SideBar sideBarHeight={sideBarHeight} />
      <Container maxWidth="container.xl" p={0}>
        <TestnetIndicator />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => {
            window.scrollTo(0, 0)
            updateBarHeight = true
          }}
        >
          <Box ref={ref} display="flex" p={0}>
            {children}
          </Box>
        </AnimatePresence>
      </Container>
    </Flex>
  )
}
