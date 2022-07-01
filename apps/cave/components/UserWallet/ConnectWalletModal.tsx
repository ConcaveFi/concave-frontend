import {
  Button,
  Image,
  Modal,
  Text,
  Card,
  HStack,
  Stack,
  Box,
  CloseButton,
  Spinner,
  ScaleFade,
  Flex,
  useToken,
  calc,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  SimpleGrid,
} from '@concave/ui'
import { Connector, useConnect } from 'wagmi'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { QRCode } from 'react-qrcode-logo'
import { isMobile } from 'utils/isMobile'
import { fetchWalletConnectRegistry, uriToLink } from 'lib/walletConnect'

const getConnectorLogo = (connectorName: Connector['name']) =>
  `/assets/connectors/${connectorName.toLowerCase().replace(' ', '-')}.png`

/*
    yes that's right bitches I'm declaring a singleton like context for this file, shoot me
*/
let _connectCtx: ReturnType<typeof useConnect>

const usePendingConnectorQrCode = () => {
  const pendingConnector = _connectCtx.pendingConnector

  const { data: qrCode, isLoading } = useQuery(
    `${pendingConnector?.name} uri`,
    async () => {
      const connectorProvider = await pendingConnector?.getProvider()
      const uri = connectorProvider.connector?.uri || connectorProvider.qrUrl
      if (uri.endsWith('key=')) throw 'no key'
      return uri
    },
    { enabled: !!pendingConnector?.id, retry: (_, error) => error === 'no key' },
  )

  return { qrCode, isLoading }
}

const QrCodeSize = 250
const ScanQrCode = ({ qrCode }) => {
  const pendingConnector = _connectCtx.pendingConnector

  return (
    <>
      <Text fontFamily="heading" fontWeight="bold" fontSize="xl" textAlign="center">
        Scan with {pendingConnector.name === 'WalletConnect' ? 'your phone' : pendingConnector.name}
      </Text>
      <Card variant="secondary" borderGradient="secondary" p={4} w="min" shadow="up">
        <QRCode
          value={qrCode}
          logoImage={getConnectorLogo(pendingConnector.name)}
          qrStyle="dots"
          quietZone={0}
          bgColor="transparent"
          fgColor="white"
          eyeRadius={{ outer: 5, inner: 0 }}
          size={QrCodeSize}
        />
      </Card>
    </>
  )
}

const ConnectorLogo = ({
  connector,
  size = '24px',
}: {
  connector: Connector
  size?: '24px' | '48px'
}) => <Image w={size} src={getConnectorLogo(connector?.name)} alt={connector.name} />

const LoadingLabel = ({ children }) => (
  <HStack align="center">
    <Spinner size="xs" color="text.low" />
    <Text color="text.low">{children}</Text>
  </HStack>
)

const PendingInjected = () => {
  const { pendingConnector, isError, isLoading, connect, variables } = _connectCtx

  return (
    <Stack align="center" justify="center" textAlign="center" fontWeight="medium">
      <ConnectorLogo connector={pendingConnector} size="48px" />
      {isError && (
        <>
          <Text>Something went wrong connecting to {pendingConnector.name}</Text>
          <Button variant="secondary" px={4} py={2} onClick={() => connect(variables)}>
            Retry
          </Button>
        </>
      )}
      {isLoading && (
        <>
          <Text fontWeight="bold">Opening {pendingConnector.name}</Text>
          <LoadingLabel>Confirm in your wallet</LoadingLabel>
        </>
      )}
    </Stack>
  )
}

const PendingQRCode = () => {
  const { qrCode, isLoading: isLoadingQr } = usePendingConnectorQrCode()

  if (isLoadingQr)
    return (
      <ScaleFade delay={0.1} in={true}>
        <Stack align="center" justify="center" textAlign="center" fontWeight="medium">
          <ConnectorLogo connector={_connectCtx.pendingConnector} size="48px" />
          <LoadingLabel>Loading wallet connector</LoadingLabel>
        </Stack>
      </ScaleFade>
    )

  return <ScanQrCode qrCode={qrCode} />
}

const SelectAWallet = () => (
  <Stack textAlign="center" alignSelf="center" fontSize="sm">
    <Text fontFamily="heading" fontWeight="bold" fontSize="xl">
      Select a wallet to enter the cave
    </Text>
    <Text color="text.low" fontWeight="medium" w="320px">
      Connecting your wallet means the app can see your address and ask for signatures
    </Text>
    <Text color="text.low" opacity={0.6} fontWeight="medium" w="320px">
      Note: No funds can be transfered without your explicit concent
    </Text>
  </Stack>
)

const DesktopConnect = ({ isOpen, onClose }) => {
  const { connectors, connect, pendingConnector, isLoading } = _connectCtx

  /*
    injected & metamask connectors sometimes can be the same, showing two metamask buttons
    _connectors is an array with no repeated connectors
  */
  const _connectors = [...new Map(connectors.map((c) => [c.name, c])).values()]
  const isQRConnector = ['walletConnect', 'coinbaseWallet'].includes(pendingConnector?.id)

  const modalPadding = useToken('space', 6)

  return (
    <Modal
      bluryOverlay={true}
      title=""
      hideClose
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      isCentered
      motionPreset="slideInBottom"
      bodyProps={{ w: '100%', h: 'auto', p: modalPadding }}
    >
      <Flex align="start">
        <Stack>
          <Text fontFamily="heading" fontWeight="bold" fontSize="xl">
            Connect a Wallet
          </Text>
          {_connectors.map(
            (connector) =>
              connector.ready && (
                <Button
                  isDisabled={connector.id === pendingConnector?.id}
                  w="200px"
                  shadow="Up Small"
                  _hover={{ shadow: 'Up Big', _disabled: { shadow: 'down' } }}
                  _active={{ shadow: 'down' }}
                  _focus={{ shadow: 'Up Big' }}
                  _disabled={{ shadow: 'down', cursor: 'default' }}
                  size="medium"
                  justifyContent="start"
                  px={4}
                  leftIcon={<ConnectorLogo connector={connector} />}
                  key={connector.id}
                  onClick={() => connect({ connector, chainId: 4 })}
                >
                  {connector.name}
                </Button>
              ),
          )}
        </Stack>

        <Box w="1px" h="320px" bg="stroke.secondary" rounded="1px" mx={modalPadding} />

        <Stack
          w={calc(modalPadding)
            .multiply(2) // kinda arbitrary but looks better a little bit bigger
            .add(QrCodeSize + 'px')
            .toString()}
          align="center"
          justify="center"
          alignSelf="center"
        >
          {!isLoading && !pendingConnector ? (
            <SelectAWallet />
          ) : isQRConnector ? (
            <PendingQRCode />
          ) : (
            <PendingInjected />
          )}
        </Stack>
        <CloseButton variant="subtle" onClick={onClose} pos="absolute" top={2} right={2} />
      </Flex>
    </Modal>
  )
}

const useWalletConnectRegistry = () =>
  useQuery('wallet connect registry', fetchWalletConnectRegistry, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

const MobileConnect = ({ isOpen, onClose }) => {
  const { data: wallets, isSuccess, isError, isLoading } = useWalletConnectRegistry()
  const { connectors, connect, pendingConnector } = _connectCtx

  const walletConnectConnector = connectors.find((connector) => connector.id === 'walletConnect')

  // useEffectOnce(() => {
  //   connect({ connector: walletConnectConnector, chainId: 4 })

  //   walletConnectConnector.on('message', ({ type }) => {
  //     if (type === 'connecting') return ''
  //   })

  //   return () => {
  //     walletConnectConnector.off('message')
  //   }
  // })

  const { data: uri } = useQuery(
    `wallet connect uri`,
    async () => {
      connect({ connector: walletConnectConnector, chainId: 1 })
      const provider = await walletConnectConnector.getProvider()

      // await connectorProvider.connector.createSession({ chainId: 1 })
      return provider.connector.uri
    },
    { enabled: !!walletConnectConnector },
  )

  return (
    <Drawer
      autoFocus={false}
      closeOnOverlayClick={true}
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
    >
      <DrawerOverlay backdropFilter="blur(8px)" />
      <DrawerContent bg="none" overflow="visible">
        <Card
          rounded="3xl"
          variant="secondary"
          shadow="Up for Blocks"
          borderGradient="secondary"
          p={4}
          align="center"
          pb="100px"
          m={1}
          // mx={-1}
          // mb={-1}
          // roundedBottom={0}
          gap={8}
          h="50vh"
        >
          <Text fontFamily="heading" fontWeight="bold" fontSize="xl">
            Connect a Wallet
          </Text>
          {/* <Box w="300px" h="1px" bg="stroke.secondary" rounded="1px" /> */}
          <Flex w="100%">
            <SimpleGrid columns={4} rowGap={6} columnGap={4} mx="auto" overflow="initial">
              {isLoading && <Spinner size="sm" color="text.low" />}
              {isError && <Text color="text.low">Error loading wallets</Text>}
              {isSuccess &&
                wallets.map((wallet) => (
                  <Button key={wallet.name} as="a" href={uriToLink(uri, wallet)}>
                    <Stack align="center">
                      <Image
                        w="48px"
                        minW="48px"
                        shadow="up"
                        rounded="xl"
                        src={wallet.image_url.lg}
                        fallback={<Box w="48px" h="48px" bg="subtle" opacity={0.5} rounded="xl" />}
                        alt={wallet.name}
                      />
                      <Text>{wallet.metadata.shortName}</Text>
                    </Stack>
                  </Button>
                ))}
            </SimpleGrid>
          </Flex>
        </Card>
      </DrawerContent>
    </Drawer>
  )
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const chainId = +router.query.chainId

  const connectCtx = useConnect({
    chainId,
    onSuccess: () => onClose(),
  })
  _connectCtx = connectCtx

  // return <DesktopConnect isOpen={isOpen} onClose={onClose} />
  // return <MobileConnect isOpen={isOpen} onClose={onClose} />
  return isMobile() ? (
    <MobileConnect isOpen={isOpen} onClose={onClose} />
  ) : (
    <DesktopConnect isOpen={isOpen} onClose={onClose} />
  )
}
