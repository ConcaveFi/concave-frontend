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
import { Signer } from 'ethers'
import { signIn, signOut, useSession, getCsrfToken } from 'next-auth/react'
import { useAccount, useConnect, useNetwork } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useIsMounted } from 'hooks/useIsMounted'
import { concaveProvider } from 'lib/providers'
import { useEffect } from 'react'
import { Session } from 'next-auth'

/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function ellipseAddress(hash: string, length = 38): string {
  if (!hash) {
    return ''
  }
  return hash.replace(hash.substring(6, length), '...')
}

/**
 *
 * Create the SIWE message with care
 */
export const createSiweMessage = async (address: string, chainId: number) => {
  return new SiweMessage({
    address,
    chainId,
    domain: window.location.host,
    nonce: await getCsrfToken(),
    statement: 'Sign in with Ethereum to the app.',
    uri: window.location.origin,
    version: '1',
  }).prepareMessage()
}

/**
 *
 * Sign message, when success will trigger call for ENS data and local API/Next-Auth SignIn()
 */
export const siweSignIn = async (signer: Signer) => {
  const address = await signer.getAddress()
  const chainId = await signer.getChainId()
  const message = await createSiweMessage(address, chainId)
  const signature = await signer.signMessage(message)
  return { signature, message, address }
}

const DisconnectButton = (props: { session: Session }) => {
  const { session } = props
  return (
    <Menu placement="right-start">
      <MenuButton as={Button} shadow="up" fontFamily="heading" size="medium" w="100%">
        {session.user.ens.address !== null
          ? session.user.ens.address
          : ellipseAddress(session.user.address)}
      </MenuButton>
      <Portal>
        <MenuList minW="min" bg="none" border="none" shadow="none" p="0" backdropFilter="blur(8px)">
          <Card variant="secondary" borderGradient="secondary" borderRadius="xl" px={1} py={2}>
            <MenuItem
              borderRadius="lg"
              onClick={async () => {
                await signOut()
              }}
            >
              Disconnect
            </MenuItem>
          </Card>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const isMounted = useIsMounted()
  const [, disconnect] = useAccount()
  const [{ data: connectData, error, loading }, connect] = useConnect()
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] = useNetwork()

  const handleLogin = async () => {
    try {
      const res = connectData && ((await connect(connectData.connectors[0] as any)) as any)

      // ! check if connectore is UP
      if (!res.data) {
        throw res.error ?? new Error('Something went wrong, disconnected')
      }

      // ! check if user is on Mainnet if not switch
      switchNetwork && networkData?.chain?.id !== 1 && (await switchNetwork(1))
      if (switchNetworkError && switchNetworkError.message)
        throw switchNetworkError.message ?? new Error(switchNetworkError.message)

      // ! prepare the message to sign with SIWE
      // ? deported on top export

      // ! Sign the message with SIWE
      const connector = connectData?.connectors[0]
      if (!connectData?.connectors) return
      const signer = connector && (await connector.getSigner())
      const { signature, message, address } = await siweSignIn(signer)

      // ! get ENS info if any if not return ens: {address: null, avatar: null}
      const ens = async (address: string) => {
        const ensProvider = concaveProvider(1)
        const ensAddress = await ensProvider.lookupAddress(address)
        const ensAvatar = await ensProvider.getAvatar(address)
        return { address: ensAddress, avatar: ensAvatar }
      }

      // ! skip the default Nextauth page to our custom provider methode
      // ? after user signed, this is what we are sending to api/auth/nextauth as authorize(credentials)
      // ? to create the user session for useSession from NextAuth
      signIn('credentials', {
        message: JSON.stringify(message),
        signature,
        ens: JSON.stringify(await ens(address)),
        redirect: false,
        callbackUrl: 'http://localhost:3000/protected',
      })
    } catch (error) {
      disconnect()
      console.log('connection Login error', error)
    }
  }

  return (
    <Modal
      bluryOverlay={true}
      title="Connect Wallet"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      bodyProps={{ alignItems: 'center', gap: 3, w: '100%', maxW: '350px' }}
    >
      {isMounted &&
        connectData.connectors.map((connector) => {
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
                <Image
                  w="20px"
                  src={`/assets/connectors/${connector.name.toLowerCase().replace(' ', '-')}.png`}
                  alt={connector.name}
                />
              }
              key={connector.id}
              onClick={async () => {
                await connect(connector), await handleLogin().then(onClose)
              }}
            >
              {connector.id === 'injected'
                ? isMounted
                  ? connector.name
                  : connector.id
                : connector.name}
              {loading && connector.name === connectData.connector?.name && ' ✅'}
              {error && connector.name === connectData.connector?.name && ' ❎'}
            </Button>
          )
        })}
    </Modal>
  )
}

const ConnectButton = () => {
  const isMounted = useIsMounted()
  const [, disconnect] = useAccount()
  const [{ data: connectData, error, loading }, connect] = useConnect()
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] = useNetwork()
  // const { data: session, status } = useSession()
  // console.log('session : ', session) // session.token can be verifiy with AUTH_PRIVATE_KEY

  // ! trigger a signout if the user changed account on Metamsk
  useEffect(() => {
    if (typeof window.ethereum?.on === 'undefined') return
    // TODO check if user account address is the same then return;
    window.ethereum.on('accountsChanged', async function () {
      await signOut() // comment this out if you want nothing to happend
    })
  }, [])

  const handleLogin = async () => {
    try {
      const res = connectData && ((await connect(connectData.connectors[0] as any)) as any)

      // ! check if connectore is UP
      if (!res.data) {
        throw res.error ?? new Error('Something went wrong, disconnected')
      }

      // ! check if user is on Mainnet if not switch
      switchNetwork && networkData?.chain?.id !== 1 && (await switchNetwork(1))
      if (switchNetworkError && switchNetworkError.message)
        throw switchNetworkError.message ?? new Error(switchNetworkError.message)

      // ! prepare the message to sign with SIWE
      // ? deported on top export

      // ! Sign the message with SIWE
      const connector = connectData?.connectors[0]
      if (!connectData?.connectors) return
      const signer = connector && (await connector.getSigner())
      const { signature, message, address } = await siweSignIn(signer)

      // ! get ENS info if any if not return ens: {address: null, avatar: null}
      const ens = async (address: string) => {
        const ensProvider = concaveProvider(1)
        const ensAddress = await ensProvider.lookupAddress(address)
        const ensAvatar = await ensProvider.getAvatar(address)
        return { address: ensAddress, avatar: ensAvatar }
      }

      // ! skip the default Nextauth page to our custom provider methode
      // ? after user signed, this is what we are sending to api/auth/nextauth as authorize(credentials)
      // ? to create the user session for useSession from NextAuth
      signIn('credentials', {
        message: JSON.stringify(message),
        signature,
        ens: JSON.stringify(await ens(address)),
        redirect: false,
        callbackUrl: 'http://localhost:3000/protected',
      })
    } catch (error) {
      disconnect()
      console.log('connection Login error', error)
    }
  }

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
          {loading && 'loading...'}
          {error && 'Error on SignIn'}
          {!error && !loading && 'Connect Wallet'}
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
                connectData.connectors.map((connector) => {
                  if (!connector.ready) return null
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
                      onClick={async () => {
                        await connect(connector), await handleLogin()
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
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    console.log('user', session)
    return <DisconnectButton session={session} />
  }
  return <ConnectButton />
}
