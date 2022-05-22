import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  useDisclosure,
  Flex,
  Button,
  Text,
  Card,
} from '@concave/ui'
import { useAccount } from 'wagmi'
import { useRecentTransactions } from 'hooks/useRecentTransactions'
import YourWalletContainer from './YourWallet/Containers/YourWalletContainer'
import ConnectedAreasContainer from './YourWallet/Containers/ConnectedsAreaContainer'
import RecentTransactionsContainer from './YourWallet/Containers/RecentTransactionsContainer'
import { ellipseAddress } from './ConnectWallet'

interface YourWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function YourWalletModal(props: YourWalletModalProps) {
  const [{ data: account }, disconnect] = useAccount()

  return (
    <Modal
      title=""
      hideClose
      motionPreset="slideInBottom"
      preserveScrollBarGap
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      bluryOverlay
    >
      <Flex
        direction={'column'}
        rounded={'2xl'}
        w={'380px'}
        maxW="380px"
        h="320px"
        mx={'auto'}
        m={-3}
        shadow={'up'}
      >
        <YourWalletContainer onClose={props.onClose} value={ellipseAddress(account?.address)} />
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
        onClick={disconnect}
        mb={-6}
      >
        <Text fontSize={'xl'} fontWeight="bold">
          Disconnect
        </Text>
      </Button>
    </Modal>
  )
}
