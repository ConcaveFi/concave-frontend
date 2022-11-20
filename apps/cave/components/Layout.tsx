import { Container, Flex } from '@concave/ui'
import { AnimatePresence } from 'framer-motion'
import { useIsMounted } from 'hooks/useIsMounted'
import { AirdropClaimBanner } from './Airdrop/AirdropClaimBanner'
import SecurityBanner from './SecurityBanner'
import { SideBar } from './SideBar/SideBar'

export const DefaultLayout = ({ children }) => {
  const isMounted = useIsMounted()
  if (isMounted) return <Layout>{children}</Layout>
  return <></>
}

export const Layout = ({ children }) => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Flex
        position={'absolute'}
        w="full"
        h="full"
        bg="url(/background.webp)"
        bgSize={'100%'}
        filter={'blur(10px)'}
      ></Flex>
      <Flex
        position={'absolute'}
        w="full"
        h="full"
        bg="radial-gradient(100% 211.23% at 100% 0%, rgba(0, 148, 255, 0.3) 0%, rgba(27, 61, 148, 0.1) 50%, rgba(2, 42, 65, 0.01) 100%)"
      ></Flex>
      <SideBar />
      <Container
        display="flex"
        maxWidth="container.xl"
        position="relative"
        p={2}
        pb="300px" // add a lil padding to the bottom of the page for better scroll experience
      >
        <SecurityBanner />
        <AirdropClaimBanner />
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
