import { CloseIcon } from '@concave/icons'
import { Button, Flex, Modal, Text } from '@concave/ui'

interface SecondConfirmModal {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
  title: string
  children: any
}

export default function SecondConfirmModal(props: SecondConfirmModal) {
  const { isOpen, children, onClose, onConfirm, title } = props
  return (
    <Modal
      title=""
      hideClose
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      preserveScrollBarGap
      bluryOverlay
    >
      <Flex
        width={'290px'}
        height="300px"
        direction={'column'}
        textShadow={'0px 0px 27px rgba(129, 179, 255, 0.31)'}
      >
        <Flex width={'full'} maxH={'20px'} justify="end" mt={-2} pr={-2}>
          <CloseIcon
            cursor={'pointer'}
            onClick={onClose}
            color={'text.low'}
            height="16px"
            width={'16px'}
          />
        </Flex>
        <Text mx={'auto'} fontSize={'2xl'} fontWeight="700">
          {props.title}
        </Text>
        <Flex
          mb={-7}
          justify={'center'}
          width={'full'}
          height="full"
          gap={3}
          direction="column"
          align={'center'}
        >
          <Flex maxWidth={'400px'} maxHeight="220px" height={'220px'}>
            {children}
          </Flex>
          <Button
            rounded={'16px 16px 0px 0px'}
            variant={'primary'}
            justifySelf="end"
            height={'45px'}
            width="160px"
            onClick={onConfirm}
          >
            <Text fontSize={'xl'}>Confirm</Text>
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}
