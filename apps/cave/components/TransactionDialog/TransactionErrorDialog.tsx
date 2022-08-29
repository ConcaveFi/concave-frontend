import { SubmittedIcon } from '@concave/icons'
import { Button, Flex, Modal, Text } from '@concave/ui'
import { useEffect, useState } from 'react'

const TransactionError = ({ error, onClose }: { error: string; onClose: () => void }) => (
  <>
    <SubmittedIcon w={10} my={6} />
    <Text
      align="center"
      whiteSpace="break-spaces"
      wordBreak="break-word"
      fontSize="md"
      fontWeight="bold"
      maxH="40vh"
      overflow="auto"
    >
      {error || 'An unexpected error occured'}
    </Text>

    <Flex>
      <Button onClick={onClose} variant="secondary" size="large" mt={4} w="180px">
        Close
      </Button>
    </Flex>
  </>
)

export const TransactionErrorDialog: React.FC<{
  error: string
  isOpen: boolean
  closeParentComponent?: VoidFunction
}> = ({ error, isOpen: isOpenProp, closeParentComponent }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)
  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])
  const onClose = () => {
    setIsOpen(false)
    closeParentComponent?.()
  }
  return (
    <Modal
      bluryOverlay={true}
      title="Error"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ align: 'center', w: '300px' }}
    >
      <TransactionError error={error} onClose={onClose} />
    </Modal>
  )
}

export default TransactionErrorDialog
