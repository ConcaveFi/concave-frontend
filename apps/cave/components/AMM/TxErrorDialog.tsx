import { SubmittedIcon } from '@concave/icons'
import { Button, Flex, Link, Modal, Text } from '@concave/ui'
import { Transaction } from 'ethers'
import { ChainId } from 'gemswap-sdk'
import { useState, useEffect } from 'react'

const TxError = ({ error, onClose }: { error: string; onClose: () => void }) => (
  <>
    <SubmittedIcon w={10} my={6} />
    <Text
      align="center"
      whiteSpace="break-spaces"
      wordBreak="break-all"
      fontSize="md"
      fontWeight="bold"
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

export const TxErrorDialog = ({
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
      <TxError error={error} onClose={onClose} />
    </Modal>
  )
}
