import { Button, useDisclosure } from '@chakra-ui/react'
import { Modal } from '@concave/ui'

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
      <Modal
        title=""
        closeButton={false}
        cardProps={{
          variant: 'secondary',
          w: 280,
          h: 390,
        }}
        onClose={onClose}
        isOpen={isOpen}
      >
        {content}
      </Modal>
    </>
  )
}
