import { SpinIcon } from '@concave/icons'
import { Button, Flex, Modal, Text } from '@concave/ui'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { spinAnimation } from './Treasury/Mobile/TreasuryManagementMobile'

interface ChangeNetworkModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChangeNetworkModal(props: ChangeNetworkModalProps) {
  const { chain: activeChain, chains } = useNetwork()
  const { switchNetwork, isLoading, pendingChainId } = useSwitchNetwork()

  return (
    <Modal
      isCentered
      preserveScrollBarGap
      title="Change Network"
      isOpen={props.isOpen}
      onClose={props.onClose}
      bluryOverlay
      motionPreset="slideInBottom"
    >
      <Flex direction={'column'} width="250px" align={'center'} gap={3}>
        {chains.map((chain, index) => {
          return (
            <Button
              key={index}
              py={6}
              px={20}
              variant={activeChain.id === chain.id ? 'primary.outline' : ''}
              shadow={activeChain.id === chain.id ? 'down' : 'up'}
              height={8}
              rounded={'2xl'}
              cursor={activeChain.id === chain.id ? 'default' : 'pointer'}
              transition={'all 0.3s'}
              _active={activeChain.id === chain.id ? {} : { transform: 'scale(0.9)' }}
              // _hover={data.chain.id === chain.id ? {} : { transform: 'scale(1.1)' }}
              _hover={{}}
              _focus={{}}
              onClick={() => {
                if (activeChain.id !== chain.id) {
                  switchNetwork?.(chain.id)
                }
              }}
            >
              <Text fontWeight={'bold'} fontSize={'2xl'}>
                {chain.name}
              </Text>
            </Button>
          )
        })}
      </Flex>
      <WaitingChangeNetworkDialog
        switchingNetwork={chains.find(({ id }) => id === pendingChainId)?.name}
        currentNetwork={activeChain.name}
        isOpen={isLoading}
        onClose={() => {}}
      />
    </Modal>
  )
}

interface WaitingChangeNetworkDialogProps {
  isOpen: boolean
  onClose: () => void
  currentNetwork: string
  switchingNetwork: string
}

export const WaitingChangeNetworkDialog = ({
  isOpen,
  onClose,
  currentNetwork,
  switchingNetwork,
}: WaitingChangeNetworkDialogProps) => {
  return (
    <Modal
      isCentered
      preserveScrollBarGap
      title=""
      isOpen={isOpen}
      onClose={onClose}
      bluryOverlay
      motionPreset="slideInBottom"
      hideClose
    >
      <Flex direction={'column'} align="center">
        <Flex
          width={'300px'}
          height="145px"
          align={'center'}
          direction="column"
          boxShadow={'Down Medium'}
          rounded="2xl"
        >
          <Text mt={3} fontSize={'xl'} fontWeight="bold">
            Waiting for confirmation.
          </Text>
          <Text mb={2} fontWeight={'bold'} textColor={'text.low'} fontSize={'sm'}>
            Confirm the switch on your wallet.
          </Text>
          <SpinIcon color={'text.low'} width={'60px'} height="60px" animation={spinAnimation(3)} />
        </Flex>

        <Flex width={'90%'} mt={3} justify="space-between">
          <Text fontWeight={'bold'} textColor={'text.low'}>
            Current Network:
          </Text>
          <Text fontSize={'md'} fontWeight="bold">
            {currentNetwork}
          </Text>
        </Flex>

        <Flex width={'90%'} mt={3} justify="space-between">
          <Text fontWeight={'bold'} textColor={'text.low'}>
            Switching Network:
          </Text>
          <Text fontSize={'md'} fontWeight="bold">
            {switchingNetwork}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  )
}
