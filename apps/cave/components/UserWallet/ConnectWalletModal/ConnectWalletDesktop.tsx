import { ChainId } from '@concave/core'
import {
  Box,
  Button,
  calc,
  Card,
  CloseButton,
  Flex,
  HStack,
  Input,
  Modal,
  ScaleFade,
  Spinner,
  Stack,
  Text,
  useToken,
} from '@concave/ui'
import { ImpersonateConnector } from 'contexts/Wagmi/Connectors/ImpersonateConnector'
import copy from 'copy-to-clipboard'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useCallback, useRef, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { MutationStatus } from 'react-query'
import { Connector, useConnect } from 'wagmi'
import { ConnectorIcon, getConnectorLogo } from './ConnectorIcon'
import { filterConnectors } from './filterConnectors'
import { useConnectorUri } from './useConnectorUri'
import { WhatConnectWalletMeans } from './WhatConnectWalletMeans'

const useCopyToClipboard = (contentToCopy, resetAfterMs = 1000): [boolean, VoidFunction] => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      setIsCopied(false)
    }

    copy(contentToCopy, { format: 'text/plain' })

    setIsCopied(true)
    timeoutRef.current = setTimeout(() => setIsCopied(false), resetAfterMs)
  }, [contentToCopy, resetAfterMs])

  return [isCopied, onCopy]
}

const QrCodeSize = 250
const ScanQrCode: FC<{ qrCode: string; connector: Connector }> = ({ qrCode, connector }) => {
  const [isCopied, onCopy] = useCopyToClipboard(qrCode)
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
      {connector.id === 'walletConnect' && (
        <Button
          onClick={onCopy}
          color={isCopied ? 'text.high' : 'text.low'}
          position="absolute"
          apply="background.metalBrighter"
          shadow="up"
          bottom={3.5}
          px={4}
          py={1}
          fontSize="xs"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ color: 'text.high' }}
          _focus={{ color: 'text.high', shadow: 'up' }}
        >
          {isCopied ? 'Copied to clipboard!' : 'Copy to clipboard'}
        </Button>
      )}
    </>
  )
}

const LoadingLabel: FC<PropsWithChildren> = ({ children }) => (
  <HStack align="center">
    <Spinner size="xs" color="text.low" />
    <Text color="text.low">{children}</Text>
  </HStack>
)


const PendingImpersonate = ({
  pendingConnector,
}: {
  pendingConnector: Connector
}) => {
  if (!(pendingConnector instanceof ImpersonateConnector)) return <></>
  return (
    <Stack align="center" justify="center" w={'full'} textAlign="center" fontWeight="medium">
      <ConnectorIcon name={pendingConnector.name} size="48px" />
      <Text fontWeight="bold">Opening {pendingConnector.name}</Text>
      <LoadingLabel>Waiting for an address</LoadingLabel>
      <Input placeholder={"Paste the address"} w={'full'} type={"text"} onChange={(ev) => pendingConnector.setAddresss(ev.target.value)}></Input>
    </Stack>
  )
}


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
    <Stack align="center" justify="center" w={'full'} textAlign="center" fontWeight="medium">
      <ConnectorIcon name={pendingConnector.name} size="48px" />
      {status === 'error' && (
        <>
          <Text>Something went wrong connecting to {pendingConnector.name}</Text>
          <Button variant="secondary" px={4} py={2} onClick={onRetry}>
            Retry
          </Button>
        </>
      )}
      {status === 'loading' && pendingConnector.id !== ImpersonateConnector.ID && (
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

const ConnectorButton = ({
  name,
  onConnect,
  isPending,
}: {
  name: string
  onConnect: () => void
  isPending: boolean
}) => (
  <Button
    isDisabled={isPending}
    w="200px"
    shadow="Up Small"
    _hover={{ shadow: 'Up Big', _disabled: { shadow: 'down' } }}
    _active={{ shadow: 'down' }}
    _focus={{ shadow: 'Up Big' }}
    _disabled={{ shadow: 'down', cursor: 'default' }}
    size="medium"
    justifyContent="start"
    px={4}
    leftIcon={<ConnectorIcon name={name} rounded="md" />}
    onClick={onConnect}
  >
    {name}
  </Button>
)

export const DesktopConnect: FC<{ isOpen: boolean; onClose: VoidFunction }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const chainId = +router.query.chainId || ChainId.ETHEREUM

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
  const modalPadding = useToken('space', 6)
  const isQRConnector = ['walletConnect', 'coinbaseWallet', 'unstoppable'].includes(
    pendingConnector?.id,
  )
  const pendingImpersonate = connectionStatus === 'loading' && pendingConnector instanceof ImpersonateConnector 
  const status = (() => {
    if (pendingImpersonate) return 'pending impersonate'
    if (isQRConnector) return 'pending qr'
    if (isLoading) return 'pending injected'
    return 'idle'
  })();

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
            Connect a Wallet { status }
          </Text>
          {filterConnectors(connectors).map((c) => (
            <ConnectorButton
              key={c.id}
              name={c.name}
              onConnect={() => connect({ connector: c, chainId: ChainId.ETHEREUM })}
              isPending={c.id === pendingConnector?.id && connectionStatus !== 'success'}
            />
          ))}
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
          {status === 'pending impersonate' && <PendingImpersonate
              pendingConnector={pendingConnector}
          />}
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
