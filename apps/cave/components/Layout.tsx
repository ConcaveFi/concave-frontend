import { Container, Flex } from '@concave/ui'
import { AnimatePresence } from 'framer-motion'
import { useIsMounted } from 'hooks/useIsMounted'
import dynamic from 'next/dynamic'
import SecurityBanner from './SecurityBanner'
import { SideBar } from './SideBar/SideBar'

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
        position="relative"
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
