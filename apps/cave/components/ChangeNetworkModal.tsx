import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { Button, Flex, keyframes, Modal, Spinner, Text } from '@concave/ui'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

interface ChangeNetWorkdModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangeNetWorkdModal(props: ChangeNetWorkdModalProps) {
  const { data, isLoading: loading, error, activeChain, switchNetwork, chains } = useNetwork()

  const [switchingNetwork, setSwitchingNetwork] = useState(activeChain?.name)

  console.log(loading)

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
        {chains?.map((chain, index) => {
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
              // _hover={activeChain.id === chain.id ? {} : { transform: 'scale(1.1)' }}
              _hover={{}}
              _focus={{}}
              onClick={() => {
                setSwitchingNetwork(chain.name)
                switchNetwork(chain.id)
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
        currentNetwork={activeChain.name}
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
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

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
          <Text fontWeight={'bold'} textColor={'text.low'} fontSize={'sm'}>
            Confirm the switch on your wallet.
          </Text>
          <SpinnerIcon
            color={'text.low'}
            mt={4}
            width={'40px'}
            height="40px"
            animation={`${spin} 3s linear infinite`}
          />
        </Flex>

        <Flex width={'90%'} mt={3} justify="space-between">
          <Text fontWeight={'bold'} textColor={'text.low'}>
            Current netWork:
          </Text>
          <Text fontSize={'md'} fontWeight="bold">
            {props.currentNetwork}
          </Text>
        </Flex>

        <Flex width={'90%'} mt={3} justify="space-between">
          <Text fontWeight={'bold'} textColor={'text.low'}>
            Switching netWork:
          </Text>
          <Text fontSize={'md'} fontWeight="bold">
            {props.switchingNetwork}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  )
}
