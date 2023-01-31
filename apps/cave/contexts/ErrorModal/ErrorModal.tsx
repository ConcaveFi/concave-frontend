import { Button, HStack, Modal, Text, VStack } from '@concave/ui'
import { DiscordInput } from 'components/DiscordInput'
import { useErrorModal } from './useErrorModal'

export const ReportErrorModal = () => {
  const { infos, isOpen, onClose, onConfirm, setUsername, username } = useErrorModal()
  return (
    <Modal
      bluryOverlay={true}
      title="Report Error"
      titleAlign="center"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ w: { base: 'full', md: '370px' }, gap: 3, textAlign: 'center' }}
    >
      <VStack gap={4}>
        <Text fontWeight={'bold'} size={'md'}>
          Do you want to submit this?
        </Text>
        <Text w="full" as="i" fontSize={'sm'}>
          We will send your address and wallet name (MetaMask, Brave Wallet), browser, System
          Operation and the error
        </Text>
        <HStack w="full">
          <DiscordInput username={username} onChangeUsername={setUsername} />
        </HStack>
        <HStack w={'full'}>
          <Button
            w={'full'}
            onClick={() =>
              onConfirm({
                userDescription: '',
                extra: infos,
              })
            }
            p={2}
            variant={'primary'}
          >
            Submit the error
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}
