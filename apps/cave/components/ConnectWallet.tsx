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
  Flex,
  useDisclosure,
} from '@concave/ui'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useIsMounted } from 'hooks/useIsMounted'
import YourWalletModal from './YourWalletModal'

// const miniAddress = (address) =>
//   `${address.substr(0, 6)}...${address.substr(address.length - 6, address.length)}`

/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function ellipseAddress(hash: string, length = 38): string {
  if (!hash) return ''
  return hash.replace(hash.substring(6, length), '...')
}

const DisconnectButton = () => {
  const { data: account } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <Menu placement="right-start">
      <MenuButton as={Button} shadow="up" fontFamily="heading" size="medium" w="100%">
        {ellipseAddress(account.address)}
      </MenuButton>
      <Portal>
        <MenuList minW="min" bg="none" border="none" shadow="none" p="0" backdropFilter="blur(8px)">
          <Card variant="secondary" borderGradient="secondary" borderRadius="xl" px={1} py={2}>
            <MenuItem borderRadius="lg" onClick={() => disconnect()}>
              Disconnect
            </MenuItem>
          </Card>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const { activeConnector, connectors, connectAsync } = useConnect()
  const isMounted = useIsMounted()

  return (
    <Modal
      bluryOverlay={true}
      title="Connect Wallet"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      preserveScrollBarGap
      motionPreset="slideInBottom"
      bodyProps={{ alignItems: 'center', gap: 3, w: '100%', maxW: '350px' }}
    >
      {isMounted &&
        connectors.map((connector) => {
          if (!connector.ready) return null
          return (
            <Button
              cursor={connector.id === activeConnector.id ? 'default' : 'pointer'}
              w="100%"
              shadow={connector.id === activeConnector.id ? 'down' : 'Up Small'}
              variant={connector.id === activeConnector.id ? 'primary.outline' : 'secondary'}
              _hover={connector.id === activeConnector.id ? {} : { shadow: 'Up Big' }}
              _active={connector.id === activeConnector.id ? {} : { shadow: 'down' }}
              _focus={connector.id === activeConnector.id ? {} : { shadow: 'Up Big' }}
              size="large"
              leftIcon={
                <Image
                  w="20px"
                  src={`/assets/connectors/${connector.name.toLowerCase().replace(' ', '-')}.png`}
                  alt={connector.name}
                />
              }
              key={connector.id}
              onClick={() => {
                if (connector.id !== activeConnector.id) {
                  connectAsync(connector)
                    .then(onClose)
                    .catch((e) => {})
                }
              }}
            >
              {connector.name}
            </Button>
          )
        })}
    </Modal>
  )
}

const ConnectButton = () => {
  const { activeConnector, connectors, connect } = useConnect()
  const isMounted = useIsMounted()

  return (
    <>
      <Menu placement="auto-end" isLazy>
        <MenuButton
          as={Button}
          sx={{ ...gradientBorder({ borderWidth: 2, borderRadius: '2xl' }) }}
          fontFamily="heading"
          variant="primary"
          size="medium"
          w="100%"
        >
          Connect wallet
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
                connectors.map((connector) => {
                  if (!connector.ready) return null
                  // change image from using connector id to something else, injected can be metamask, coinbase, brave etc
                  return (
                    <MenuItem
                      borderRadius="xl"
                      icon={
                        <Image
                          w="20px"
                          src={`/assets/connectors/${connector.name
                            .toLowerCase()
                            .replace(' ', '-')}.png`}
                          alt={connector.name}
                        />
                      }
                      key={connector.id}
                      onClick={() => {
                        connect(connector)
                      }}
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

export function ConnectWallet(): JSX.Element {
  const { isConnected } = useConnect()
  const { data: account } = useAccount()

  const { isOpen, onOpen, onClose } = useDisclosure()
  // if (data.connected) return <DisconnectButton />
  if (isConnected)
    return (
      <>
        <Button
          onClick={onOpen}
          height="40px"
          shadow="up"
          fontFamily="heading"
          w="100%"
          rounded={'2xl'}
          _focus={{}}
        >
          <Flex textColor={'text.low'} fontWeight="bold" mx={'auto'}>
            {ellipseAddress(account?.address)}
          </Flex>
        </Button>
        <YourWalletModal onClose={onClose} isOpen={isOpen} />
      </>
    )

  // if (isConnected && !isSignedIn) return
  return <ConnectButton />
}
