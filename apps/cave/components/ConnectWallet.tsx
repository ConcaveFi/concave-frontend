import { SpinnerIcon } from '@concave/icons'
import { Button, Flex, gradientBorder, Image, keyframes, Modal, useDisclosure } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useIsMounted } from 'hooks/useIsMounted'
import { useRouter } from 'next/router'
import { useAccount, useConnect } from 'wagmi'
import YourWalletModal from './YourWalletModal'

/** Transform a wallet address
 *  {6first keys}{...}{4 keys}
 */
export function ellipseAddress(hash: string, length = 38): string {
  if (!hash) return ''
  return hash.replace(hash.substring(6, length), '...')
}

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { connectors, connect, pendingConnector } = useConnect({
    chainId: +router.query.chainId,
    onSuccess: () => onClose(),
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
          const itsConnect = connector.id === pendingConnector?.id
          return (
            <Button
              cursor={'pointer'}
              w="100%"
              shadow={'Up Small'}
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
              onClick={() => {
                connect({ connector })
              }}
            >
              {connector.name}
            </Button>
          )
        })}
    </Modal>
  )
}

export const ConnectButton = () => {
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

const spinAnimation = (time = 3) =>
  `${keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  })} ${time}s linear infinite`

export const UserWallet = () => {
  const { address } = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { recentTransactions } = useTransactionRegistry()
  return (
    <>
      <Button
        onClick={onOpen}
        height="40px"
        shadow="up"
        fontFamily="heading"
        _focus={{ color: 'text.high', shadow: 'up' }}
        w="100%"
        rounded="2xl"
      >
        <Image src="/assets/tokens/eth.svg" alt="ethereum icon" w="22px" h="22px" mr={2} />
        <Flex fontWeight="bold">{ellipseAddress(address)}</Flex>
        {recentTransactions.some((tx) => tx.status === 'pending') && (
          <Flex position={'absolute'} width="80%" justify={'end'}>
            <SpinnerIcon color={'text.low'} animation={spinAnimation(4)} boxSize={'20px'} />
          </Flex>
        )}
      </Button>
      <YourWalletModal onClose={onClose} isOpen={isOpen} />
    </>
  )
}
