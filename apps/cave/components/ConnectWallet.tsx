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
  Spinner,
} from '@concave/ui'
import { useAccount, useConnect } from 'wagmi'
import { useIsMounted } from 'hooks/useIsMounted'
import { useModals } from 'contexts/ModalsContext'
import YourWalletModal from './YourWalletModal'
import { useRecentTransactions } from 'hooks/useRecentTransactions'
import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { spinAnimation } from './Treasury/Mobile/TreasuryManagementMobile'

// const miniAddress = (address) =>
//   `${address.substr(0, 6)}...${address.substr(address.length - 6, address.length)}`

/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function ellipseAddress(hash: string, length = 38): string {
  if (!hash) {
    return ''
  }
  return hash.replace(hash.substring(6, length), '...')
}

const DisconnectButton = () => {
  const [{ data: account }, disconnect] = useAccount()

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
  const [{ data, loading }, connect] = useConnect()
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
        data.connectors.map((connector) => {
          if (!connector.ready) return null
          const itsConnect = connector.id === data?.connector?.id
          return (
            <Button
              cursor={itsConnect ? 'default' : 'pointer'}
              w="100%"
              shadow={itsConnect ? 'down' : 'Up Small'}
              _hover={!itsConnect && { shadow: 'Up Big' }}
              _active={!itsConnect && { shadow: 'down' }}
              _focus={!itsConnect && { shadow: 'Up Big' }}
              size="large"
              variant={itsConnect && 'primary.outline'}
              leftIcon={
                <Image
                  w="20px"
                  src={`/assets/connectors/${connector.name.toLowerCase().replace(' ', '-')}.png`}
                  alt={connector.name}
                />
              }
              key={connector.id}
              onClick={() => {
                if (!itsConnect) connect(connector).then(onClose)
              }}
            >
              {connector.name}
            </Button>
          )
        })}
    </Modal>
  )
}
// commit
const ConnectButton = () => {
  const { connectModal } = useModals()

  return (
    <>
      <Button
        sx={{ ...gradientBorder({ borderWidth: 2, borderRadius: '2xl' }) }}
        fontFamily="heading"
        variant="primary"
        size="medium"
        w="100%"
        onClick={connectModal.onOpen}
      >
        Connect wallet
      </Button>
    </>
  )
}

export function ConnectWallet(): JSX.Element {
  const [{ data }] = useConnect()

  const [{ data: account }] = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: recentTx, status, isLoading } = useRecentTransactions()

  if (data.connected)
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
          {isLoading && (
            <Flex position={'absolute'} width="80%" justify={'end'}>
              <SpinnerIcon color={'text.low'} animation={spinAnimation(4)} boxSize={'20px'} />
            </Flex>
          )}
        </Button>
        <YourWalletModal onClose={onClose} isOpen={isOpen} />
      </>
    )

  // if (isConnected && !isSignedIn) return
  return <ConnectButton />
}
