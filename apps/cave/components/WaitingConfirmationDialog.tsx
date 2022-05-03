import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Modal, Text, Button, Flex, Heading } from '@concave/ui'
import { useState, useEffect, ReactNode } from 'react'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const spinnerStyles = { animation: `${spin} 2s linear infinite` }

export const WaitingConfirmationDialog = ({
  children,
  isOpen: isOpenProp,
}: {
  children?: ReactNode
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
      title="Confirm Swap"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ align: 'center', gap: 1, w: '400px' }}
    >
      <SpinIcon __css={spinnerStyles} w={10} my={6} />
      <Heading fontSize="xl" fontWeight="bold">
        Waiting For Confirmation
      </Heading>
      {children}
      <Text my={5} fontWeight="medium" color="text.low" fontSize="md">
        Confirm this transaction in your wallet
      </Text>
      <Flex>
        <Button onClick={onClose} variant="secondary" size="large" w="180px">
          Close
        </Button>
      </Flex>
    </Modal>
  )
}
