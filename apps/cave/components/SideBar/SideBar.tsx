import {
  Drawer,
  useDisclosure,
  Card,
  Stack,
  CardProps,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  forwardRef,
} from '@concave/ui'
import { HamburgerIcon } from '@concave/icons'
import SideBarTop from './SideBarTop'
import SideBarBottom from './SideBarBottom'
import PageNav from './PageNav'
import { useSwipeable } from 'react-swipeable'

export function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const swipeableHandlers = useSwipeable({ onSwipedLeft: onClose })

  return (
    <>
      {/* show on bigger screens like not mobile lol */}
      <SidebarContent display={{ base: 'none', md: 'flex' }} />

      {/* show on small devices (mobile) */}
      <Flex
        align="center"
        position="fixed"
        zIndex={5}
        p={4}
        display={{ base: 'flex', md: 'none' }}
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
      <Drawer
        autoFocus={false}
        closeOnOverlayClick={true}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent
          w="min"
          py={4}
          my={-4}
          bg="none"
          shadow="none"
          overflow="auto"
          sx={{ '::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
        >
          <SidebarContent {...swipeableHandlers} />
        </DrawerContent>
      </Drawer>
    </>
  )
}

const SidebarContent = forwardRef<CardProps, 'div'>((props, ref) => {
  return (
    <Card
      ref={ref}
      variant="primary"
      apply="background.sidebar"
      borderWidth={0}
      borderRadius={0}
      borderRightRadius="2xl"
      shadow="Up Big"
      p={3}
      h="100vh"
      w={{ base: '250px', md: '250px' }}
      minW="250px"
      overflowY="auto"
      overflowX="hidden"
      {...props}
    >
      <SideBarTop />
      <Stack spacing="50px" mt="50px" mr={-3} ml="auto" pb={8} w="max">
        <PageNav />
      </Stack>
      <Flex ml="4" mt="20px">
        <SideBarBottom />
      </Flex>
      {/* <Flex         
      align="center">
        <SideBarBottom />
      </Flex> */}
    </Card>
  )
})
