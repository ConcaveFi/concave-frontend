import { Modal, useDisclosure, Flex, Button, Text } from '@concave/ui'
import { useAccount, useDisconnect } from 'wagmi'
import YourWalletContainer from './YourWallet/Containers/YourWalletContainer'
import ConnectedAreasContainer from './YourWallet/Containers/ConnectedsAreaContainer'
import RecentTransactionsContainer from './YourWallet/Containers/RecentTransactionsContainer'
import { ellipseAddress } from './ConnectWallet'
import SecondConfirmModal from './SecondConfirmModal'

interface YourWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function YourWalletModal(props: YourWalletModalProps) {
  const { data: account } = useAccount()
  const { disconnect } = useDisconnect()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal
      title="Your wallet"
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
        justify="space-between"
        rounded={'2xl'}
        // h="300px"
        gap={6}
        m={-3}
        p={6}
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
        onClick={onOpen}
        mb={-6}
      >
        <Text fontSize={'xl'} fontWeight="bold">
          Disconnect
        </Text>
      </Button>
      <SecondConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={disconnect}
        title="You want disconnet?"
      >
        <Flex shadow="Down Medium" height={'90%'} w={'250px'} rounded="2xl" align={'center'}>
          <Flex mx={8} textAlign="center">
            <Text fontWeight={'bold'} fontSize="md" textColor={'text.low'}>
              If you click on confirm you will disconnet this current wallet
            </Text>
          </Flex>
        </Flex>
      </SecondConfirmModal>
    </Modal>
  )
}
