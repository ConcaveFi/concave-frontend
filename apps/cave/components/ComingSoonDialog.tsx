import { Flex, Modal, Text } from '@concave/ui'

export const ComingSoonDialog = ({
  isOpen,
  desc,
  title,
  onClose,
}: {
  isOpen: boolean
  title: string
  desc: string
  onClose: () => void
}) => {
  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      preserveScrollBarGap
      title={''}
      hideClose
      onClose={onClose}
      isOpen={isOpen}
    >
      <Flex width={'220px'} height="140px" direction={'column'} px="3">
        <Text fontSize={'2xl'} fontWeight="bold" mx={'auto'} mt="2">
          {title}
        </Text>
        <Flex width={'full'} height="full" textAlign="center" wordBreak={'break-word'}>
          <Text textColor={'text.low'} fontWeight="bold" fontSize={'lg'}>
            {desc}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  )
}
