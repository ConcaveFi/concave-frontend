import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Card,
  Button,
  Modal,
  Image,
} from '@concave/ui'
import { FiMenu } from 'react-icons/fi'
import SideBarTop from './SideBarTop'
import SideBarBottom from './SideBarBottom'
import PageNav from './PageNav'
import { chain, useNetwork } from 'wagmi'
import { useEffect } from 'react'

export function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const networkModal = useDisclosure()
  const { activeChain, chains, switchNetwork } = useNetwork({
    onSuccess: ({ id }) => {
      if (id !== chain.mainnet.id) networkModal.onOpen()
    },
  })
  // console.log(data.chain?.name ?? 'Not connected')
  // console.log(data.chain?.unsupported && '(unsupported)')

  return (
    <Box minH="100vh">
      <Modal
        bluryOverlay={true}
        title="Change Network"
        isOpen={networkModal.isOpen}
        onClose={networkModal.onClose}
        titleAlign="center"
      >
        {switchNetwork &&
          chains.map((x) =>
            x.id === activeChain?.id ? null : (
              <Button
                rightIcon={<Image maxWidth="20px" src={`/assets/tokens/eth.svg`} alt="" />}
                key={x.id}
                onClick={() => switchNetwork(x.id)}
              >
                Connect to {x.name}
              </Button>
            ),
          )}
      </Modal>

      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="lg"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      {/* <Box ml={{ base: 0, md: 60 }} p="4"> */}
      {/* {children} */}
      {/* </Box> */}
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Card
      variant="primary"
      apply="background.sidebar"
      borderWidth={0}
      borderRadius={0}
      borderRightRadius="2xl"
      shadow="Up Big"
      px={2}
      py={4}
      w={{ base: 'full', md: 60 }}
      h="full"
      {...rest}
    >
      <Flex position="absolute" right="10px">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} mb={5} />
      </Flex>
      <SideBarTop />

      <Box mt={10}>
        <PageNav />
      </Box>
      <Box mt={14}>
        <SideBarBottom />
      </Box>
    </Card>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
    </Flex>
  )
}
