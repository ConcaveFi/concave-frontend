import React from 'react'
import {
  Portal,
  Button,
  Card,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  gradientBorder,
} from '@concave/ui'
import { useConnect } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'
import { useIsMounted } from 'hooks/useIsMounted'

const miniAddress = (address) =>
  `${address.substr(0, 6)}...${address.substr(address.length - 6, address.length)}`

const DisconnectButton = () => {
  const { signOut, user } = useAuth()

  if (!user) return null
  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button}>{miniAddress(user.address)}</MenuButton>
      <MenuList>
        <MenuItem onClick={signOut}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  )
}

const ConnectButton = () => {
  const [{ data }, connect] = useConnect()
  const { signIn } = useAuth()
  const isMounted = useIsMounted()
  return (
    <>
      <Menu placement="right-start" isLazy>
        <MenuButton
          as={Button}
          sx={{ ...gradientBorder({ borderWidth: 2, borderRadius: '2xl' }) }}
          fontFamily="heading"
          variant="primary"
          size="medium"
          w="100%"
        >
          Connect Wallet
        </MenuButton>
        <Portal>
          <MenuList
            minW="min"
            bg="none"
            border="none"
            shadow="none"
            p="0"
            backdropFilter="blur(8px)"
          >
            <Card
              variant="secondary"
              borderGradient="secondary"
              borderRadius="xl"
              px={1}
              py={2}
              gap="1"
            >
              {isMounted &&
                data.connectors.map((connector) => {
                  if (!connector.ready) return null
                  // change image from using connector id to something else, injected can be metamask, coinbase, brave etc
                  return (
                    <MenuItem
                      borderRadius="xl"
                      icon={
                        <Image
                          maxWidth="20px"
                          src={`/assets/connectors/${connector.id}.png`}
                          alt=""
                        />
                      }
                      key={connector.id}
                      onClick={() => connect(connector).then(signIn)}
                    >
                      {connector.name}
                    </MenuItem>
                  )
                })}
            </Card>
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
}

const SignInButton = () => {
  const { signIn, isWaitingForSignature } = useAuth()
  return (
    <>
      <Button
        variant="primary"
        size="medium"
        w="100%"
        sx={{ ...gradientBorder({ borderWidth: 2, borderRadius: '2xl' }) }}
        onClick={signIn}
        isLoading={isWaitingForSignature}
        loadingText="Awaiting signature"
      >
        Sign In
      </Button>
    </>
  )
}

export function ConnectWallet(): JSX.Element {
  const { user, isConnected } = useAuth()

  if (user) return <DisconnectButton />

  if (isConnected && !user) return <SignInButton />
  return <ConnectButton />
}
