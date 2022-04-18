import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Card,
  Button,
  Modal,
  Image,
  Stack,
} from '@concave/ui'
import { FiMenu } from 'react-icons/fi'
import SideBarTop from './SideBarTop'
import SideBarBottom from './SideBarBottom'
import PageNav from './PageNav'
import { chain, useNetwork } from 'wagmi'

export function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data }, switchNetwork] = useNetwork()

  return (
    <Box minH="100vh">
      <Modal
        bluryOverlay={true}
        title="Unsupported Network"
        titleAlign="center"
        isOpen={data.chain?.id && ![chain.mainnet.id, chain.ropsten.id].includes(data.chain?.id)}
        onClose={() => {}}
        bodyProps={{ w: '350px', gap: 2 }}
        hideClose
      >
        <Text fontWeight="bold">Please switch to Ethereum</Text>
        <Button
          leftIcon={<Image w="20px" src={`/assets/tokens/eth.svg`} alt="" />}
          onClick={() => switchNetwork?.(chain.mainnet.id)}
          isDisabled={!switchNetwork}
          variant="secondary"
          p={3}
        >
          Connect to Ethereum
        </Button>
        {!switchNetwork && (
          <Text color="text.low" textAlign="center" fontWeight="medium" fontSize="sm">
            Looks like your wallet is locked, or it {`doesn't`} support programatically switching
            networks
            <br />
            Try switching directly in your wallet.
          </Text>
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
      p={3}
      w={{ base: 'full', md: 60 }}
      h="full"
      {...rest}
    >
      <Flex position="absolute" right="10px">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} mb={5} />
      </Flex>
      <SideBarTop />
      <Stack spacing="50px" mt="50px" align="end" mr={-3} pb={8}>
        <PageNav />
        <SideBarBottom />
      </Stack>
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
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
    </Flex>
  )
}
