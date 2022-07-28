import { Button, Flex, Modal, Text } from '@concave/ui'
import { useNetwork, useSwitchNetwork } from 'wagmi'

export function ChangeNetworkModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { chain, chains } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  return (
    <Modal
      isCentered
      title="Change Network"
      isOpen={isOpen}
      onClose={onClose}
      bluryOverlay
      motionPreset="slideInBottom"
    >
      <Flex direction={'column'} width="250px" align={'center'} gap={3}>
        {chains.map((c) => {
          return (
            <Button
              isDisabled={c.id === chain?.id}
              shadow="Up Small"
              _hover={{ shadow: 'Up Big', _disabled: { shadow: 'down' } }}
              _active={{ shadow: 'down' }}
              _focus={{ shadow: 'Up Big' }}
              _disabled={{ shadow: 'down', cursor: 'default' }}
              size="medium"
              w="100%"
              px={4}
              key={c.id}
              onClick={() => switchNetwork?.(c.id)}
            >
              <Text fontWeight={'bold'} fontSize={'2xl'}>
                {c.name}
              </Text>
            </Button>
          )
        })}
      </Flex>
    </Modal>
  )
}
