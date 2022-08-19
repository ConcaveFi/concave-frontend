import {
  Box,
  Button,
  Card,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@concave/ui'
import { onCloseSidebar } from 'components/SideBar/SideBar'
import { useIsMounted } from 'hooks/useIsMounted'
import { fetchWalletConnectRegistry, uriToLink } from 'lib/walletConnect'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useConnect } from 'wagmi'
import { ConnectorIcon } from './ConnectorIcon'
import { useConnectorUri } from './useConnectorUri'
import { WhatConnectWalletMeans } from './WhatConnectWalletMeans'

const useWalletConnectRegistry = () =>
  useQuery('wallet connect registry', fetchWalletConnectRegistry, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

const ConnectWithWalletConnect = ({ walletConnectConnector }) => {
  const { data: wallets, isSuccess, isError, isLoading } = useWalletConnectRegistry()

  const { uri } = useConnectorUri(walletConnectConnector)

  return (
    <SimpleGrid columns={4} rowGap={6} columnGap={4} mx="auto" overflow="initial">
      {isLoading && <Spinner size="sm" color="text.low" />}
      {isError && <Text color="text.low">Error loading wallets</Text>}
      {isSuccess &&
        wallets.map((wallet) => (
          <ConnectorButton
            key={wallet.name}
            name={wallet.name}
            href={uriToLink(uri, wallet)}
            image={wallet.image_url.lg}
            shortName={wallet.metadata.shortName}
          />
        ))}
    </SimpleGrid>
  )
}

const ConnectorButton = ({ name, href, image, shortName = name }) => (
  <Button key={name} as="a" href={href}>
    <Stack align="center">
      <Image
        w="48px"
        minW="48px"
        shadow="up"
        rounded="xl"
        src={image}
        fallback={<Box w="48px" h="48px" bg="subtle" opacity={0.5} rounded="xl" />}
        alt={name}
      />
      <Text color="text.low" fontWeight="normal">
        {shortName}
      </Text>
    </Stack>
  </Button>
)

// `https://metamask.app.link/dapp/${window.location.href}`

export const MobileConnect = ({ isOpen, onClose }) => {
  const router = useRouter()
  const chainId = +router.query.chainId

  const { connectors, connect } = useConnect({
    chainId,
    onSuccess: () => onClose(),
  })
  const isMounted = useIsMounted()

  if (isOpen) onCloseSidebar()

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
          bg="whiteAlpha.200"
          shadow="Up for Blocks"
          borderGradient="secondary"
          borderWidth={3}
          p={4}
          align="center"
          m={1}
          gap={4}
          h="60vh"
        >
          <Text fontFamily="heading" fontWeight="bold" fontSize="xl">
            Connect a Wallet
          </Text>
          <Flex w="100%" gap={2} align="start">
            {isMounted &&
              connectors.map((c) => (
                <Button
                  p={2}
                  key={c.id}
                  onClick={() => connect({ connector: c })}
                  flexDirection="column"
                  alignItems="center"
                  maxW="80px"
                  textAlign="center"
                  gap={2}
                >
                  <ConnectorIcon name={c.name} size="48px" />
                  <Text whiteSpace="break-spaces" fontSize="xs" align="center" w="100%">
                    {c.name}
                  </Text>
                </Button>
              ))}
          </Flex>
          <WhatConnectWalletMeans />
          <CloseButton variant="subtle" onClick={onClose} pos="absolute" top={4} right={4} />
        </Card>
      </DrawerContent>
    </Drawer>
  )
}
