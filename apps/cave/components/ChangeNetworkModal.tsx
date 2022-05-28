import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { Button, Flex, keyframes, Modal, Spinner, Text } from '@concave/ui'
import { useState } from 'react'
import { useNetwork } from 'wagmi'
import { spinAnimation } from './Treasury/Mobile/TreasuryManagementMobile'

interface ChangeNetWorkdModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangeNetWorkdModal(props: ChangeNetWorkdModalProps) {
  const [{ data, loading, error }, switchNetwork] = useNetwork()

  const [switchingNetwork, setSwitchingNetwork] = useState(data?.chain.name)

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
        {data.chains.map((chain, index) => {
          return (
            <Button
              key={index}
              py={6}
              px={20}
              variant={data.chain.id === chain.id ? 'primary.outline' : ''}
              shadow={data.chain.id === chain.id ? 'down' : 'up'}
              height={8}
              rounded={'2xl'}
              cursor={data.chain.id === chain.id ? 'default' : 'pointer'}
              transition={'all 0.3s'}
              _active={data.chain.id === chain.id ? {} : { transform: 'scale(0.9)' }}
              // _hover={data.chain.id === chain.id ? {} : { transform: 'scale(1.1)' }}
              _hover={{}}
              _focus={{}}
              onClick={() => {
                if (data.chain.id !== chain.id) {
                  setSwitchingNetwork(chain.name)
                  switchNetwork(chain.id)
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
        switchingNetwork={switchingNetwork}
        currentNetwork={data.chain.name}
        isOpen={loading}
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

export const WaitingChangeNetworkDialog = (props: WaitingChangeNetworkDialogProps) => {
  return (
    <Modal
      isCentered
      preserveScrollBarGap
      title=""
      isOpen={props.isOpen}
      onClose={props.onClose}
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
            {props.currentNetwork}
          </Text>
        </Flex>

        <Flex width={'90%'} mt={3} justify="space-between">
          <Text fontWeight={'bold'} textColor={'text.low'}>
            Switching Network:
          </Text>
          <Text fontSize={'md'} fontWeight="bold">
            {props.switchingNetwork}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  )
}
