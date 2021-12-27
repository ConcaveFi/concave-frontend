import React from 'react'
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

import { walletconnect } from 'lib/connectors'

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

const ConnectButton = () => {
  const { activate, activateBrowserWallet, account } = useEthers()

  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button} variant="outline">
        Connect wallet
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<Image maxWidth="20px" src="/images/logo-metamask.png" alt="MetaMask" />}
          onClick={() => activateBrowserWallet()}
        >
          MetaMask
        </MenuItem>
        <MenuItem
          icon={<Image maxWidth="20px" src="/images/logo-walletconnect.svg" alt="WalletConnect" />}
          onClick={() => activate(walletconnect)}
        >
          WalletConnect
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export function ConnectWallet(): JSX.Element {
  const { account } = useEthers()
  return account ? <DisconnectButton /> : <ConnectButton />
}
