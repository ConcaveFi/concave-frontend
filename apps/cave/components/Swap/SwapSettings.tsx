import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'

export const SwapSettingsModal: React.FC = ({ children }: { children: React.FC[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [icon, content] = children
  return (
    <>
      <Button
        borderRadius={'3xl'}
        margin={0}
        padding={0}
        backgroundColor={'transparent'}
        onClick={onOpen}
      >
        {icon}
      </Button>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent width={'255px'} borderRadius={'3xl'}>
          {content}
        </ModalContent>
      </Modal>
    </>
  )
}
