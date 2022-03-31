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
  Modal,
} from '@concave/ui'
import { useConnect } from 'wagmi'
import { useAuth } from 'contexts/AuthContext'
import { useIsMounted } from 'hooks/useIsMounted'

const miniAddress = (address) =>
  `${address.substr(0, 6)}...${address.substr(address.length - 6, address.length)}`

const DisconnectButton = () => {
  const { signOut, user } = useAuth()

  return (
    <Menu placement="right-start">
      <MenuButton as={Button} shadow="up" fontFamily="heading" size="medium" w="100%">
        {miniAddress(user.address)}
      </MenuButton>
      <Portal>
        <MenuList minW="min" bg="none" border="none" shadow="none" p="0" backdropFilter="blur(8px)">
          <Card
            variant="secondary"
            borderGradient="secondary"
            borderRadius="xl"
            px={1}
            py={2}
            gap="1"
          >
            <MenuItem onClick={signOut}>Disconnect</MenuItem>
          </Card>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const [{ data }, connect] = useConnect()
  const isMounted = useIsMounted()
  return (
    <Modal
      bluryOverlay={true}
      title="Connect Wallet"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      bodyProps={{ alignItems: 'center', gap: 3, maxW: '350px' }}
    >
      {isMounted &&
        data.connectors.map((connector) => {
          if (!connector.ready) return null
          return (
            <Button
              w="100%"
              shadow="Up Small"
              _hover={{ shadow: 'Up Big' }}
              _active={{ shadow: 'down' }}
              _focus={{ shadow: 'Up Big' }}
              size="large"
              leftIcon={
                <Image maxWidth="20px" src={`/assets/connectors/${connector.id}.png`} alt="" />
              }
              key={connector.id}
              onClick={() => connect(connector)}
            >
              {connector.name}
            </Button>
          )
        })}
    </Modal>
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
  const { isSignedIn, isConnected } = useAuth()

  if (isSignedIn) return <DisconnectButton />

  if (isConnected && !isSignedIn) return <SignInButton />
  return <ConnectButton />
}
