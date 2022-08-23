import { HamburgerIcon } from '@concave/icons'
import {
  Box,
  Card,
  CardProps,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  forwardRef,
  Image,
  useDisclosure,
} from '@concave/ui'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import PageNav from './PageNav'
import SideBarBottom from './SideBarBottom'
import SideBarTop from './SideBarTop'

export function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // close on route change
  const router = useRouter()
  useEffect(() => {
    onClose()
  }, [router.asPath, onClose])

  return (
    <>
      {/* show on bigger screens like not mobile lol */}
      <SidebarContent display={{ base: 'none', lg: 'flex' }} />

      {/* show on small devices (mobile) */}
      <Box h="60px">
        <Flex
          align="center"
          position="fixed"
          zIndex={5}
          p={4}
          display={{ base: 'flex', lg: 'none' }}
          onClick={onOpen}
          filter="drop-shadow(0px 0px 12px #81b3ff4f)"
          bg="blackAlpha.100"
          backdropFilter="blur(16px)"
          direction="row"
          w="100%"
          roundedBottom="xl"
        >
          <HamburgerIcon />
          <Image src="/assets/concave/logotype.svg" alt="concave" width="100px" ml={2} />
        </Flex>
      </Box>

      <Drawer
        autoFocus={false}
        closeOnOverlayClick={true}
        isOpen={isOpen}
        placement="left"
        blockScrollOnMount={false}
        onClose={onClose}
      >
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent
          bg="none"
          shadow="none"
          overflow="auto"
          sx={{ '::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
        >
          <SidebarContent
            closeSidebar={onClose}
            drag="x"
            onDragEnd={(a, i) => {
              if (i.offset.x < -150) onClose()
            }}
            dragElastic={{ left: 0.3, right: 0 }}
            dragSnapToOrigin
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0 }}
          />
        </DrawerContent>
      </Drawer>
    </>
  )
}

type SidebarProps = { closeSidebar?: () => void } & CardProps

const SidebarContent = forwardRef<SidebarProps, 'div'>(({ closeSidebar, ...props }, ref) => {
  return (
    <Card
      as={motion.aside}
      ref={ref}
      variant="primary"
      apply="background.sidebar"
      borderWidth={0}
      borderRadius={0}
      borderRightRadius="2xl"
      shadow="Up Big"
      p={3}
      minH="100vh"
      h="auto"
      w={{ base: 'auto', sm: '300px', lg: '250px' }}
      minW="250px"
      overflowY="auto"
      overflowX="hidden"
      sx={{ '::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
      align="center"
      gap="30px"
      {...props}
    >
      <SideBarTop closeSidebar={closeSidebar} />
      <PageNav />
      <SideBarBottom mt={6} />
    </Card>
  )
})
