import { ChainId } from '@concave/core'
import {
  Box,
  Button,
  calc,
  Card,
  CloseButton,
  Flex,
  HStack,
  Modal,
  ScaleFade,
  Spinner,
  Stack,
  Text,
  useToken,
} from '@concave/ui'
import { useRouter } from 'next/router'
import { QRCode } from 'react-qrcode-logo'
import { MutationStatus } from 'react-query'
import { Connector, useConnect } from 'wagmi'
import { ConnectorIcon, getConnectorLogo } from './ConnectorIcon'
import { useConnectorUri } from './useConnectorUri'
import { WhatConnectWalletMeans } from './WhatConnectWalletMeans'

const QrCodeSize = 250
const ScanQrCode = ({ qrCode, connector }) => {
  return (
    <>
      <Text fontFamily="heading" fontWeight="bold" fontSize="xl" textAlign="center">
        Scan with {connector.name === 'WalletConnect' ? 'your phone' : connector.name}
      </Text>
      <Card variant="secondary" borderGradient="secondary" p={4} w="min" shadow="up">
        <QRCode
          value={qrCode}
          logoImage={getConnectorLogo(connector.name)}
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

const LoadingLabel = ({ children }) => (
  <HStack align="center">
    <Spinner size="xs" color="text.low" />
    <Text color="text.low">{children}</Text>
  </HStack>
)

const PendingInjected = ({
  pendingConnector,
  onRetry,
  status,
}: {
  pendingConnector: Connector
  onRetry: () => void
  status: MutationStatus
}) => {
  return (
    <Stack align="center" justify="center" textAlign="center" fontWeight="medium">
      <ConnectorIcon name={pendingConnector.name} size="48px" />
      {status === 'error' && (
        <>
          <Text>Something went wrong connecting to {pendingConnector.name}</Text>
          <Button variant="secondary" px={4} py={2} onClick={onRetry}>
            Retry
          </Button>
        </>
      )}
      {status === 'loading' && (
        <>
          <Text fontWeight="bold">Opening {pendingConnector.name}</Text>
          <LoadingLabel>Confirm in your wallet</LoadingLabel>
        </>
      )}
    </Stack>
  )
}

const PendingQRCode = ({ connector }: { connector: Connector }) => {
  const { uri, isLoading: isLoadingQr } = useConnectorUri(connector)

  if (isLoadingQr)
    return (
      <ScaleFade delay={0.1} in={true}>
        <Stack align="center" justify="center" textAlign="center" fontWeight="medium">
          <ConnectorIcon name={connector.name} size="48px" />
          <LoadingLabel>Loading wallet connector</LoadingLabel>
        </Stack>
      </ScaleFade>
    )

  return <ScanQrCode qrCode={uri} connector={connector} />
}

const SelectAWallet = () => (
  <Stack textAlign="center" alignSelf="center" fontSize="sm">
    <Text fontFamily="heading" fontWeight="bold" fontSize="xl">
      Select a wallet to enter the cave
    </Text>
    <WhatConnectWalletMeans />
  </Stack>
)

export const DesktopConnect = ({ isOpen, onClose }) => {
  const router = useRouter()
  const chainId = +router.query.chainId

  const {
    connectors,
    connect,
    pendingConnector,
    isLoading,
    status: connectionStatus,
    variables,
  } = useConnect({
    chainId,
    onSuccess: () => onClose(),
  })

  const isQRConnector = ['walletConnect', 'coinbaseWallet'].includes(pendingConnector?.id)

  const status =
    !isLoading && !pendingConnector ? 'idle' : isQRConnector ? 'pending qr' : 'pending injected'

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
          {connectors.map(
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
                  leftIcon={<ConnectorIcon name={connector.name} />}
                  key={connector.id}
                  onClick={() => connect({ connector, chainId: ChainId.ETHEREUM })}
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
          {status === 'idle' && <SelectAWallet />}
          {status === 'pending qr' && <PendingQRCode connector={pendingConnector} />}
          {status === 'pending injected' && (
            <PendingInjected
              pendingConnector={pendingConnector}
              status={connectionStatus}
              onRetry={() => connect(variables)}
            />
          )}
        </Stack>
        <CloseButton variant="subtle" onClick={onClose} pos="absolute" top={2} right={2} />
      </Flex>
    </Modal>
  )
}
