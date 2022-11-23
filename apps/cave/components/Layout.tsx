import { Container, Flex } from '@concave/ui'
import { AirdropProvider } from 'contexts/AirdropContext'
import { AnimatePresence } from 'framer-motion'
import { useIsMounted } from 'hooks/useIsMounted'
import { AirdropClaimBanner } from './Airdrop/AirdropClaimBanner'
import { AirdropClaimModal } from './Airdrop/ClaimModal/AirdropClaimModal'
import SecurityBanner from './SecurityBanner'
import { SideBar } from './SideBar/SideBar'

export const DefaultLayout = ({ children }) => {
  const isMounted = useIsMounted()
  if (isMounted) return <Layout>{children}</Layout>
  return <></>
}

export const Layout = ({ children }) => {
  return (
    <AirdropProvider>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <SideBar />
        <AirdropClaimBanner />
        <Container
          display="flex"
          maxWidth="container.xl"
          position="relative"
          p={2}
          pb="300px" // add a lil padding to the bottom of the page for better scroll experience
        >
          <SecurityBanner />
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            {children}
          </AnimatePresence>
        </Container>
        <AirdropClaimModal />
      </Flex>
    </AirdropProvider>
  )
}
