import React from 'react'
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from '@concave/ui'
import { useConnect } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'
import { useUser } from 'contexts/UserContext'

function miniAddy(address: string, length = 38): string {
  return address.replace(address.substring(6, length), '...')
}

const DisconnectButton = () => {
  const { signOut } = useAuth()
  const { user, isSuccess } = useUser()
  if (!isSuccess) return null
  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button}>{user.address}</MenuButton>
      <MenuList>
        <MenuItem onClick={signOut}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  )
}

const ConnectButton = () => {
  const [
    {
      data: { connectors },
    },
    connect,
  ] = useConnect()
  const { signIn } = useAuth()
  const injectedConnector = connectors.find((c) => c.id === 'injected')
  const walletConnectConnector = connectors.find((c) => c.id === 'walletConnect')
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          variant="secondary"
          bgGradient="linear(to-tr, secondary.150, secondary.100)"
          size="large"
          w={200}
        >
          Connect your wallet
        </MenuButton>
        <MenuList>
          {injectedConnector && (
            <MenuItem
              icon={<Image maxWidth="20px" src="/images/logo-metamask.png" alt="MetaMask" />}
              onClick={() => signIn(injectedConnector)}
            >
              MetaMask
            </MenuItem>
          )}
          <MenuItem
            icon={
              <Image maxWidth="20px" src="/images/logo-walletconnect.svg" alt="WalletConnect" />
            }
            onClick={() => connect(walletConnectConnector)}
          >
            WalletConnect
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

const SignInButton = () => {
  const { signIn } = useAuth()

  return (
    <Button
      variant="secondary"
      bgGradient="linear(to-tr, secondary.150, secondary.100)"
      size="large"
      w={200}
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  )
}

export function ConnectWallet(): JSX.Element {
  const { isSignedIn, isConnected } = useAuth()

  // if (isConnected && !isSignedIn) return <SignInButton />
  if (!isSignedIn) return <ConnectButton />
  return <DisconnectButton />
}
