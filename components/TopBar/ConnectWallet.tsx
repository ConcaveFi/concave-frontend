import React, { useState } from 'react'
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { UnsupportedChainIdError } from '@web3-react/core'

import { walletconnect } from 'lib/connectors'
import { supportedNetworks } from 'config'
import { NETWORKS } from 'config/networks'
import { toOxfordComma } from 'lib/toOxfordComma'

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

const switchNetwork = (chainId = '0x1') =>
  window.ethereum?.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] })

const addNetwork = (params) =>
  window.ethereum?.request({ method: 'wallet_addEthereumChain', params })

const UnsuportedNetworkModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalContent>
        <Text>
          We currently only support{' '}
          {toOxfordComma(supportedNetworks.map((n) => NETWORKS[n.chainId].name))}
        </Text>
        <Button onClick={() => switchNetwork()}>Swith to Ethereum</Button>
      </ModalContent>
    </ModalContent>
  </Modal>
)

const ConnectButton = ({ onError }: { onError: (e: Error) => void }) => {
  const { activate, activateBrowserWallet } = useEthers()
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton as={Button} variant="outline">
          Connect wallet
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<Image maxWidth="20px" src="/images/logo-metamask.png" alt="MetaMask" />}
            onClick={() => activateBrowserWallet(onError)}
          >
            MetaMask
          </MenuItem>
          <MenuItem
            icon={
              <Image maxWidth="20px" src="/images/logo-walletconnect.svg" alt="WalletConnect" />
            }
            onClick={() => activate(walletconnect, onError)}
          >
            WalletConnect
          </MenuItem>
        </MenuList>
        {/* <UnsuportedNetworkModal
          isOpen={state === 'unsupportedNetwork'}
          onClose={() => setState('idle')}
        /> */}
      </Menu>
    </>
  )
}

export function ConnectWallet(): JSX.Element {
  const { account, error } = useEthers()
  console.log(error)
  // const [state, setState] = useState<'idle' | 'unsupportedNetwork' | 'waitingUserAccept'>('idle')

  // const connectInjected = () => {
  //   setState('waitingUserAccept')
  //   activateBrowserWallet((e) => {
  //     if (e instanceof UnsupportedChainIdError) setState('unsupportedNetwork')
  //     else setState('idle')
  //   })
  // }
  return account ? <DisconnectButton /> : <ConnectButton onError={(e) => console.log(e)} />
}
