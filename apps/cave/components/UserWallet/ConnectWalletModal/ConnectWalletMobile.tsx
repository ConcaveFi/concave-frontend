import { ChainId } from '@concave/core'
import { ArrowBackIcon, PlusIcon } from '@concave/icons'
import {
  Button,
  ButtonProps,
  Card,
  chakra,
  CloseButton,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@concave/ui'
import { supportedChainsId } from 'contexts/WagmiContext'
import { AnimatePresence, isValidMotionProp, motion, MotionProps } from 'framer-motion'
import { useIsMounted } from 'hooks/useIsMounted'
import { fetchWalletConnectRegistry, uriToLink } from 'lib/walletConnect'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { Connector, useConnect } from 'wagmi'
import { ConnectorIcon } from './ConnectorIcon'
import { useConnectorUri } from './useConnectorUri'
import { WhatConnectWalletMeans } from './WhatConnectWalletMeans'

const MotionButton = motion<ButtonProps>(Button)
const ConnectorButton = ({
  name,
  shortName = name,
  image = '',
  ...props
}: { name: string; shortName?: string; image?: string } & ButtonProps & MotionProps) => (
  <MotionButton
    flexDirection="column"
    alignItems="center"
    gap={2}
    _disabled={{ filter: 'grayscale(1)' }}
    {...props}
  >
    <ConnectorIcon src={image} name={name} size="48px" />
    <Text whiteSpace="break-spaces" fontSize="xs" align="center">
      {shortName || name}
    </Text>
  </MotionButton>
)

const SkeletonConnectorButton = ({ ...props }) => (
  <Flex direction="column" alignItems="center" gap={2} {...props}>
    <Skeleton w="48px" h="48px" opacity={0.1} rounded="xl" />
    <Text fontSize="xs" align="center">
      {' '}
    </Text>
  </Flex>
)

const useWalletConnectRegistry = () =>
  useQuery('wallet connect registry', fetchWalletConnectRegistry, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

const MoreWallets = (props: ButtonProps) => (
  <Button flexDirection="column" alignItems="center" gap={2} {...props}>
    <Flex
      align="center"
      justify="center"
      w="48px"
      h="48px"
      bg="subtle"
      shadow="up"
      opacity={0.6}
      rounded="xl"
    >
      <PlusIcon />
    </Flex>
    <Text color="text.low" fontSize="xs" align="center">
      More
    </Text>
  </Button>
)

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
})

const listVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  },
  item: {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
  },
}

const ConnectWithWalletConnect = ({ walletConnectConnector, onCancel }) => {
  const {
    data: wallets,
    isSuccess,
    isError,
    isLoading: isLoadingRegistry,
  } = useWalletConnectRegistry()

  const { uri, isLoading: isLoadingUri } = useConnectorUri(walletConnectConnector)

  const [showingMore, toggleShowMore] = useState(false)
  const [search, setSearch] = useState('')

  const walletsList = wallets
    ?.slice(0, showingMore ? undefined : 11)
    .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))

  return (
    <MotionDiv
      p={4}
      display="flex"
      alignItems="center"
      gap={4}
      flexDirection="column"
      w="100% "
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: 'easeIn' }}
    >
      <HStack alignSelf="start" onClick={onCancel}>
        <IconButton icon={<ArrowBackIcon fontSize="lg" />} aria-label="back" />
        <ConnectorIcon name="walletConnect" rounded="md" />
        <Text fontFamily="heading" fontWeight="bold" fontSize="xl">
          Wallet Connect
        </Text>
      </HStack>
      <Stack
        spacing={6}
        align="center"
        overflow={showingMore ? 'scroll' : 'initial'}
        h="400px"
        pb="100px"
        w="100%"
      >
        <Collapse in={showingMore} unmountOnExit style={{ width: '90%', overflow: 'visible' }}>
          <Input
            size="small"
            h="32px"
            placeholder="Search for a wallet"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Collapse>
        <SimpleGrid
          as={motion.div}
          variants={listVariants.container}
          initial="hidden"
          animate="show"
          w="100%"
          columns={4}
          rowGap={5}
          overflow="visible"
        >
          {isLoadingRegistry &&
            Array.from({ length: 12 }).map((_, i) => <SkeletonConnectorButton key={`scb-${i}`} />)}
          {isError && (
            <Text w="100%" textAlign="center" color="text.low">
              Error loading wallets
            </Text>
          )}
          {isSuccess && [
            ...walletsList.map((wallet) => (
              <ConnectorButton
                key={wallet.name}
                variants={listVariants.item}
                color="text.low"
                name={wallet.name}
                onClick={() => {
                  window.location.href = uriToLink(uri, wallet)
                }}
                isDisabled={isLoadingUri}
                image={wallet.image_url.lg}
                shortName={wallet.metadata.shortName}
              />
            )),
            !showingMore && <MoreWallets key="more" onClick={() => toggleShowMore(!showingMore)} />,
          ]}
        </SimpleGrid>
      </Stack>
    </MotionDiv>
  )
}

const ConnectWalletsDefaultView = ({
  connectors,
  onConnect,
}: {
  connectors: Connector[]
  onConnect: (c: Connector) => void
}) => {
  const isMounted = useIsMounted()
  return (
    <MotionDiv
      willChange="transform"
      p={4}
      display="flex"
      alignItems="center"
      gap={4}
      flexDirection="column"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      transition={{ type: 'easeIn' }}
    >
      <Text fontFamily="heading" fontWeight="bold" fontSize="xl" mb={1}>
        Connect a Wallet
      </Text>
      <MotionDiv
        variants={listVariants.container}
        initial="hidden"
        animate="show"
        display="flex"
        w="100%"
        gap={2}
        alignItems="start"
      >
        {isMounted &&
          connectors.map((c) => {
            if (c.id === 'injected' && !c.ready) return null
            return (
              <ConnectorButton
                key={c.id}
                variants={listVariants.item}
                name={c.name}
                onClick={() => onConnect(c)}
                maxW="80px"
                minW="80px"
              />
            )
          })}
      </MotionDiv>
      <WhatConnectWalletMeans />
    </MotionDiv>
  )
}

export const MobileConnect: FC<{ isOpen: boolean; onClose: VoidFunction }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const queryChainId = +router.query.chainId
  const chainId = supportedChainsId.includes(queryChainId) ? queryChainId : ChainId.ETHEREUM

  const { connectors, connect, pendingConnector, reset } = useConnect({
    chainId,
    onSuccess: onClose,
  })

  const onConnect = async (connector: Connector) => {
    if (connector.id === 'metaMask' && !connector.ready) {
      // open on metamask app
      window.location.href = 'https://metamask.app.link/dapp/' + window.location.href
      return
    }
    connect({ connector })
  }

  return (
    <Drawer
      autoFocus={false}
      closeOnOverlayClick={true}
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      trapFocus={false}
    >
      <DrawerOverlay backdropFilter="blur(2px)" />
      <DrawerContent bg="none" overflow="visible">
        <Card
          willChange="transform"
          rounded="3xl"
          variant="secondary"
          bg="whiteAlpha.200"
          shadow="Up for Blocks"
          borderGradient="secondary"
          borderWidth={3}
          align="center"
          m={1}
          h={'60vh'}
          bottom={0}
          drag="y"
          onDragEnd={(_, i) => {
            if (i.offset.y > 120) onClose()
          }}
          dragElastic={{ top: 0, bottom: 0.5 }}
          dragSnapToOrigin
          dragMomentum={false}
          dragConstraints={{ top: 0, bottom: 0 }}
        >
          <AnimatePresence initial={false} exitBeforeEnter>
            {pendingConnector?.id === 'walletConnect' ? (
              <ConnectWithWalletConnect
                onCancel={reset}
                walletConnectConnector={pendingConnector}
              />
            ) : (
              <ConnectWalletsDefaultView connectors={connectors} onConnect={onConnect} />
            )}
          </AnimatePresence>
          <CloseButton variant="subtle" onClick={onClose} pos="absolute" top={4} right={4} />
        </Card>
      </DrawerContent>
    </Drawer>
  )
}
