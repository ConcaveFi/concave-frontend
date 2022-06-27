import { Button, Image, gradientBorder, Modal, Flex, useDisclosure, Text } from '@concave/ui'
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { useIsMounted } from 'hooks/useIsMounted'
import { useModals } from 'contexts/ModalsContext'
import YourWalletModal from './YourWalletModal'
import { SpinnerIcon } from '@concave/icons'
import { spinAnimation } from './Treasury/Mobile/TreasuryManagementMobile'
import { useRouter } from 'next/router'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'

/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function ellipseAddress(hash: string, length = 38): string {
  if (!hash) return ''
  return hash.replace(hash.substring(6, length), '...')
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { connectors, connect, activeConnector } = useConnect({
    chainId: +router.query.chainId,
    onConnect: () => onClose(),
  })
  const isMounted = useIsMounted()
  /*
   injected & metamask connectors sometimes can be the same, showing two metamask buttons
    _connectors is an array with no repeated connectors
  */
  const _connectors = [...new Map(connectors.map((c) => [c.name, c])).values()]
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
        _connectors.map((connector) => {
          if (!connector.ready) return null
          return (
            <Button
              isDisabled={connector.id === activeConnector?.id}
              w="100%"
              shadow="Up Small"
              _hover={{ shadow: 'Up Big', _disabled: { shadow: 'down' } }}
              _active={{ shadow: 'down' }}
              _focus={{ shadow: 'Up Big' }}
              _disabled={{ shadow: 'down', cursor: 'default' }}
              size="large"
              leftIcon={
                <Image
                  w="20px"
                  src={`/assets/connectors/${connector.name.toLowerCase().replace(' ', '-')}.png`}
                  alt={connector.name}
                />
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
  const { connectModal } = useModals()

  return (
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
  )
}

export function ConnectWallet(): JSX.Element {
  const { isConnected } = useConnect()

  const { data: account } = useAccount()
  const { data: ens } = useEnsName({ address: account?.address })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hasPendingTransactions } = useTransactionRegistry()

  if (isConnected)
    return (
      <>
        <Button
          onClick={onOpen}
          size="medium"
          shadow="up"
          fontFamily="heading"
          color="text.low"
          _focus={{ color: 'text.high', shadow: 'up' }}
          w="100%"
          rounded="2xl"
          fontWeight="bold"
          justifyContent="center"
        >
          <Text noOfLines={1} wordBreak="break-all" whiteSpace="normal" maxW="60%">
            {ens || ellipseAddress(account?.address)}
          </Text>
          {hasPendingTransactions && (
            <Flex position="absolute" right={4}>
              <SpinnerIcon color="text.low" animation={spinAnimation(4)} boxSize="18px" />
            </Flex>
          )}
        </Button>
        <YourWalletModal onClose={onClose} isOpen={isOpen} />
      </>
    )

  return <ConnectButton />
}
