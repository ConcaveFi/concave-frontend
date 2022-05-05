import { SubmittedIcon } from '@concave/icons'
import { Button, Flex, Modal, Text } from '@concave/ui'
import { useState, useEffect } from 'react'

const TransactionError = ({ error, onClose }: { error: string; onClose: () => void }) => (
  <>
    <SubmittedIcon w={10} my={6} />
    <Text
      align="center"
      whiteSpace="break-spaces"
      wordBreak="break-word"
      fontSize="md"
      fontWeight="bold"
      maxH="50vh"
    >
      {error}
    </Text>

    <Flex>
      <Button onClick={onClose} variant="secondary" size="large" mt={4} w="180px">
        Close
      </Button>
    </Flex>
  </>
)

export const TransactionErrorDialog = ({
  error,
  isOpen: isOpenProp,
}: {
  error: string
  isOpen: boolean
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)
  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])
  const onClose = () => setIsOpen(false)
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
