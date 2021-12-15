import React from 'react'
import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

import { walletconnect } from 'lib/connectors'

const WalletOption = ({ name, icon, onClick }) => {
  return (
    <Button
      justifyContent="space-between"
      width="100%"
      mb="4"
      size="lg"
      variant="outline"
      rightIcon={icon}
      onClick={onClick}
    >
      {name}
    </Button>
  )
}

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...')
}

const DisconnectButton = () => {
  const { deactivate, account } = useEthers()
  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button}>{truncateHash(account)}</MenuButton>
      <MenuList>
        <MenuItem onClick={deactivate}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  )
}

export function ConnectWallet(): JSX.Element {
  const { activate, activateBrowserWallet, account } = useEthers()

  const { onOpen, isOpen, onClose } = useDisclosure()

  return (
    <>
      <Box>
        {account ? (
          <DisconnectButton />
        ) : (
          <Button variant="outline" onClick={onOpen}>
            Connect wallet
          </Button>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WalletOption
              icon={<Image maxWidth="20px" src="/images/logo-metamask.png" alt="MetaMask" />}
              name="MetaMask"
              onClick={activateBrowserWallet}
            />
            <WalletOption
              icon={
                <Image maxWidth="20px" src="/images/logo-walletconnect.svg" alt="WalletConnect" />
              }
              name="WalletConnect"
              onClick={() => activate(walletconnect)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
