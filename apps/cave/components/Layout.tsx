import { Container, Flex } from '@concave/ui'
import { AnimatePresence } from 'framer-motion'
import { useIsMounted } from 'hooks/useIsMounted'
import dynamic from 'next/dynamic'
import { useNetwork } from 'wagmi'
import SecurityBanner from './SecurityBanner'
import { SideBar } from './SideBar/SideBar'

const TestnetIndicator = dynamic(
  () => import('./Faucet').then((module) => module.TestnetIndicator),
  { ssr: false },
)

export const DefaultLayout = ({ children }) => {
  const isMounted = useIsMounted()
  if (isMounted) return <Layout>{children}</Layout>
  return <></>
}

export const Layout = ({ children }) => {
  const { chain } = useNetwork()
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <SideBar />
      <Container
        display="flex"
        maxWidth="container.xl"
        position="relative"
        p={2}
        pb="300px" // add a lil padding to the bottom of the page for better scroll experience
      >
        {chain?.testnet && <TestnetIndicator />}
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
