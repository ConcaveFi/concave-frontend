import { CloseIcon } from '@concave/icons'
import { Button, Flex, Modal, Text } from '@concave/ui'
import { formatAddress } from 'utils/formatAddress'
import { useAccount, useDisconnect } from 'wagmi'
import ConnectedAreasContainer from '../YourWallet/Containers/ConnectedsAreaContainer'
import RecentTransactionsContainer from './RecentTransactions'

export function YourWalletModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <Modal
      title="Your wallet"
      hideClose
      motionPreset="slideInBottom"
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      bluryOverlay
    >
      <Flex
        direction={'column'}
        justify="space-between"
        rounded={'2xl'}
        gap={6}
        m={-3}
        p={6}
        shadow={'up'}
      >
        <Flex justify="space-between">
          <Flex fontWeight="bold" direction="column" justify="center" p={4}>
            <Text textColor="text.low" fontSize="xl">
              Your Wallet
            </Text>
            <Text fontSize={'3xl'}>{formatAddress(address)}</Text>
          </Flex>
          <CloseIcon color={'text.low'} cursor="pointer" onClick={onClose} />
        </Flex>
        <ConnectedAreasContainer />
      </Flex>

      <RecentTransactionsContainer />

      <Button
        _focus={{}}
        mx={'auto'}
        width={'180px'}
        height="40px"
        rounded="16px 16px 0px 0px"
        variant={'primary'}
        onClick={() => disconnect()}
        mb={-6}
      >
        <Text fontSize={'xl'} fontWeight="bold">
          Disconnect
        </Text>
      </Button>
    </Modal>
  )
}
